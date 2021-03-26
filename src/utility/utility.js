const path = require('path');

const isEmptyObj = (obj) => Object.keys(obj).length === 0;

const setEnv = (env) => env === 'dev' ? {path: path.resolve(__dirname, '../../env/dev.env')} : {path: path.resolve(__dirname, '../../env/test.env')};


module.exports = {
    isEmptyObj,
    setEnv
};