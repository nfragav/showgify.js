const { colors } = require('../config.js');


const endpointMiddleware = (endpoint) => (statusCode, contentType) => async (req, res) => {
  try{
    const output = await endpoint(req, res);
    res.writeHead(statusCode, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });
    res.end(output);
  }
  catch (e) {
    console.error(colors.yelllow, e);
    if (res) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end("500 Internal Server Error");
    }
  }
}


module.exports = { endpointMiddleware };