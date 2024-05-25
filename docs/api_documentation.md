# Showgify.js API Documentation

Welcome to the Showgify.js API documentation. This API allows you to interact with a GIF slider, providing endpoints to fetch the current GIF name being displayed and to get the next GIF that will be displayed. Feel free to add any new interaction you'd like to the API!

# Endpoints

## `GET /current`

### Description

Fetch the name of the current GIF being displayed by the HTML file. Used mainly at `display/app.js` to know the name of the file at `display/assets/displayed/`

### Response
- **Content-Type:** `text/html`
- **Body:** The name of the currently displayed GIF file.

## `GET /previous`

### Description

Make the `display/index.html` file display previous GIF in the folder `display/assets/gifs/`. It returns the binary of the GIF file. The slider will show the GIF in 10 seconds or less.

### Response:

- **Content-Type:** `image/gif`
- **Body:** The binary data of the previous GIF image from the folder `display/assets/gifs/`.

## `GET /next`

### Description

Make the `display/index.html` file display next GIF in the folder `display/assets/gifs/`. It returns the binary of the GIF file. The slider will show the GIF in 10 seconds or less.

### Response:

- **Content-Type:** `image/gif`
- **Body:** The binary data of the next GIF image from the folder `display/assets/gifs/`.
