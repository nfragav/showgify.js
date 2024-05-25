const { endpointMiddleware } = require('./helpers');
const { fmCurrentGifInfo, fmSlidePreviousGif, fmSlideNextGif } = require('../services/fileManager.js')
const { colors } = require('../config.js');


const postGif = () => {
    return "Coming soon!"
}

const getCurrentGifInfo = async () => {
    const {gif, width, height} = await fmCurrentGifInfo();
    return JSON.stringify({
        gif,
        width,
        height
    });
}

const getPreviousGifBin = async () => {
    const { gifBin } = await fmSlidePreviousGif();
    return gifBin;
}

const getNextGifBin = async () => {
    const { gifBin } = await fmSlideNextGif();
    return gifBin;
}

const getCurrentGifHandler = endpointMiddleware(getCurrentGifInfo)(200, 'text/html');
const getPreviousGifBinHandler = endpointMiddleware(getPreviousGifBin)(200, 'image/gif');
const getNextGifBinHandler = endpointMiddleware(getNextGifBin)(200, 'image/gif');

const router = {
    get: {
        "/current": getCurrentGifHandler,
        "/previous": getPreviousGifBinHandler,
        "/next": getNextGifBinHandler,
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