const { endpointMiddleware } = require('./helpers');
const { fmCurrentGifInfo, fmSlideNextGif } = require('../services/fileManager.js')
const { colors } = require('../config.js');


const postGif = () => {
    return "Coming soon!"
}

const getCurrentGifInfo = async () => {
    const {gif, width, height} = await fmCurrentGifInfo();
    console.log(colors.green, "Current GIF info: ", {gif, width, height});
    return JSON.stringify({
        gif,
        width,
        height
    });
}

const getNextGifBin = async () => {
    const { gifBin } = await fmSlideNextGif();
    return gifBin;
}

const postGifHandler = endpointMiddleware(postGif)(201, 'text/html');
const getNextGifBinHandler = endpointMiddleware(getNextGifBin)(200, 'image/gif');
const getCurrentGifHandler = endpointMiddleware(getCurrentGifInfo)(200, 'text/html');

const router = {
    post: {
        "/gif": postGifHandler,
    },
    get: {
        "/next": getNextGifBinHandler,
        "/current": getCurrentGifHandler,
    }
}

const routerMiddleware = (method, url) => async (req, res) => {
    try {
        console.log(colors.magenta, "\nreceived request: ", method, url);
        const endpoint = router[method.toLowerCase()][url];
        const output = await endpoint(req, res);
        return output;
    }
    catch (e) {
        console.error(e);
        if (res) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404 Not Found");
        }
    }
}

const handleRequest = async (req, res) => {
    const { method, url } = req;
    const reqResult = await routerMiddleware(method, url)(req, res);
    return reqResult;
}


module.exports = { handleRequest };