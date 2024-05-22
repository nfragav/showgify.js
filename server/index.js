const querystring = require('querystring');
const http = require('http');
const { handleRequest } = require('./endpoints');
const { colors } = require('../config.js');


http.createServer((req, res) => {
    const out = handleRequest(req, res);
}).listen(3000, () =>
    console.log(colors.cyan, 'Server is running on port 3000')
);