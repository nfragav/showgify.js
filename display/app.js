const setImageSource = (src) => {
  const imgElement = document.getElementById('gif');
  imgElement.src = src;
}

const setMainGif = (screenDims, gifDims) => {
  [screenWidth, screenHeight] = screenDims;
  [gifWidth, gifHeight] = gifDims

  screenRatio = screenWidth / screenHeight;
  gifRatio = gifWidth / gifHeight;

  const gifContainerElement = document.getElementById('gif-container');
  gifContainerElement.classList.remove(gifContainerElement.className);

  const gifElement = document.getElementById('gif');
  gifElement.classList.remove(gifElement.className);

  if (screenRatio <= gifRatio) {
    gifContainerElement.classList.add('wide-img-container');
    gifElement.classList.add('wide-img');
    return;
  }
  gifContainerElement.classList.add('high-img-container');
  gifElement.classList.add('high-img');
  return;
}

const alterDOM = async () => {
  fetch('http://localhost:3000/current').then(
    async res => {
      const { gif, width, height } = await res.json();
      console.log(width, height);

      const screenDimensions = [window.innerWidth, window.innerHeight];
      const gifDimensions = [width, height];
      setMainGif(screenDimensions, gifDimensions)

      const src = `assets/displayed/${gif}`;
      setImageSource(src)
    }).catch(e => console.error(e));
}

alterDOM();

setInterval(alterDOM, 1000 * 10);