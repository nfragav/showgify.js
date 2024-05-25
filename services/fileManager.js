
const fs = require('fs');
const fsPromises = require('fs').promises;

const dirs = {
  displayed: '../display/assets/displayed/',
  gifs: '../display/assets/gifs/'
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
    await fsPromises.unlink(filePath);
    console.log(colors.cyan, `File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(colors.yellow, err);
  }
}

const fmCurrentGifInfo = async () => {
  const [currentlyDisplayed] = fs.readdirSync(dirs.displayed).filter(() => /\.gif$/);
    if (!currentlyDisplayed) {
        const [nextGif] = fs.readdirSync(dirs.gifs, 'utf8').filter(() => /\.gif$/);
        fs.copyFileSync(`${dirs.gifs}${nextGif}`, `${dirs.displayed}${nextGif}`);
        [currentlyDisplayed] = fs.readdirSync(dirs.displayed).filter(() => /\.gif$/);
    }
    const gif = currentlyDisplayed;
    const gifBin = fs.readFileSync(`${dirs.displayed}${gif}`);
    const {width, height} = getGIFDimensions(gifBin);
    return {gif, width, height}
}

const fmSlidePreviousGif = async () => {
  const [currentlyDisplayed] = fs.readdirSync(dirs.displayed).filter(() => /\.gif$/);
  const gifs = fs.readdirSync(dirs.gifs, 'utf8').filter(() => /\.gif$/);
  let [nextGif] = gifs;
  if (currentlyDisplayed) {
      const currentIndex = gifs.indexOf(currentlyDisplayed);
      nextGif = gifs[(currentIndex - 1 + gifs.length) % gifs.length];
      await deleteFile(`${dirs.displayed}${currentlyDisplayed}`);
  }
  fs.copyFileSync(`${dirs.gifs}${nextGif}`, `${dirs.displayed}${nextGif}`);
  const gifBin = fs.readFileSync(`${dirs.displayed}${nextGif}`);

  return { gifBin };
}

const fmSlideNextGif = async () => {
  const [currentlyDisplayed] = fs.readdirSync(dirs.displayed).filter(() => /\.gif$/);
  const gifs = fs.readdirSync(dirs.gifs, 'utf8').filter(() => /\.gif$/);
  let [nextGif] = gifs;
  if (currentlyDisplayed) {
      const currentIndex = gifs.indexOf(currentlyDisplayed);
      nextGif = gifs[(currentIndex + 1) % gifs.length];
      await deleteFile(`${dirs.displayed}${currentlyDisplayed}`);
  }
  fs.copyFileSync(`${dirs.gifs}${nextGif}`, `${dirs.displayed}${nextGif}`);
  const gifBin = fs.readFileSync(`${dirs.displayed}${nextGif}`);

  return { gifBin };
}


module.exports = { fmCurrentGifInfo, fmSlidePreviousGif, fmSlideNextGif }