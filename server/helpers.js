const fs = require('fs').promises;
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

const getGIFDimensions = (buffer) => {
  if (buffer.toString('ascii', 0, 3) !== 'GIF') {
    throw new Error('Not a GIF file');
  }
  const width = buffer.readUInt16LE(6);
  const height = buffer.readUInt16LE(8);

  return { width, height };
}

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(colors.cyan, `File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(colors.yellow, err);
  }
}


module.exports = { endpointMiddleware, getGIFDimensions, deleteFile };