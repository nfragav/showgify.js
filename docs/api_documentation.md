# Showgify.js API Documentation

Welcome to the Showgify.js API documentation. This API allows you to interact with a GIF slider, providing endpoints to fetch the current GIF name being displayed and to get the next GIF that will be displayed. Feel free to add any new interaction you'd like to the API!

# Endpoints

## `GET /next`

### Description

Fetch the name of the currently displayed GIF. Used mainly by `/display/app.js` script.

### Response:

- **Content-Type:** `text/html`
- **Body:** The name of the current GIF as a plain text string.

### Example Request

GET /current HTTP/1.1
Host: api.showgify.example

### Example Reponse

## `GET /current`

### Description

Retrieve the next GIF that will be displayed by the slider. The slider will show the gif in 10 seconds or less.

### Response
- **Content-Type:** `image/gif`
- **Body:** The binary data of the next GIF image.
