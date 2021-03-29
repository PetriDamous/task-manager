const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/users');
const {userOne, nonExistingUser, dataBaseSetup} = require('./fixtures/db');


beforeEach(dataBaseSetup);

test('Sign up new user', async () => {
    const res = await request(app).post('/users').send({
        name: 'PetriD',
        email: 'PetriD@yahoo.com',
        password: '!QAZ2wsx#EDC4rfv'
    }).expect(201);

    const {body, body: {user}} = res;

    // Checks to see if database was updated correctly
    const isUser = await User.findById(user._id);
    expect(isUser).not.toBeNull();

    // Assertions about the response    
    expect(body).toMatchObject({
        user: {
            name: 'PetriD',
            email: 'petrid@yahoo.com'
        },
        token: isUser.tokens[0].token
    });

    
});

test('Login existing user', async () => {
    const {email, password} = userOne;
    const res = await request(app).post('/users/login').send({
        email,
        password
    }).expect(200);

    // Validate new token is saved
    const {body} = res;

    const user = await User.findById(body.user._id);
    expect(body.token).toBe(user.tokens[1].token);
});

test('Test login user that doesn\'t exist', async () => {
    const {email, password} = nonExistingUser;
    await request(app).post('/users/login').send({
        email,
        password
    }).expect(400);
});

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Unauthorized user cannot access profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete user account', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    
    // Validate user has been removed from the database
    expect(await User.findById(userOne.id)).toBeNull();
});

test('Shouldn\'t delete user account', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Check image upload', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    
    const user = await User.findById(userOne._id);

    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: 'Mike'})
        .expect(200);

    const user = await User.findById(userOne._id);

    expect(user.name).toBe('Mike');

});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({location: 'China'})
        .expect(400);
});