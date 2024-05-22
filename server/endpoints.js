const { endpointMiddleware, getGIFDimensions, deleteFile } = require('./helpers');
const { colors } = require('../config.js');
const fs = require('fs');


const postGif = () => {
    return "Coming soon!"
}

const getCurrentGif = async () => {
    const [currentlyDisplayed] = fs.readdirSync('../display/assets/displayed').filter(() => /\.gif$/);
    if (!currentlyDisplayed) {
        const [nextGif] = fs.readdirSync('../display/assets/gifs', 'utf8').filter(() => /\.gif$/);
        const newDisplayPath = `../display/assets/displayed/${nextGif}`
        fs.copyFileSync(`../display/assets/gifs/${nextGif}`, newDisplayPath);
        [currentlyDisplayed] = fs.readdirSync('../display/assets/displayed/').filter(() => /\.gif$/);
    }
    const gif = fs.readFileSync(`../display/assets/displayed/${currentlyDisplayed}`);
    const {width, height} = getGIFDimensions(gif);

    return JSON.stringify({
        gif: currentlyDisplayed,
        width,
        height
    });
}

const getNextGif = async () => {
    const [currentlyDisplayed] = fs.readdirSync('../display/assets/displayed').filter(() => /\.gif$/);
    const gifs = fs.readdirSync('../display/assets/gifs', 'utf8').filter(() => /\.gif$/);
    let [nextGif] = gifs;
    if (currentlyDisplayed) {
        const index = gifs.indexOf(currentlyDisplayed);
        nextGif = gifs[(index + 1) % gifs.length];
        await deleteFile(`../display/assets/displayed/${currentlyDisplayed}`);
    }
    const newDisplayPath = `../display/assets/displayed/${nextGif}`
    fs.copyFileSync(`../display/assets/gifs/${nextGif}`, newDisplayPath);
    const gif = fs.readFileSync(newDisplayPath);

    return gif;
}

const postGifHandler = endpointMiddleware(postGif)(201, 'text/html');
const getNextGifHandler = endpointMiddleware(getNextGif)(200, 'image/gif');
const getCurrentGifHandler = endpointMiddleware(getCurrentGif)(200, 'text/html');

const router = {
    post: {
        "/gif": postGifHandler,
    },
    get: {
        "/next": getNextGifHandler,
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