# Editor Frontend

[![Build Status](https://app.travis-ci.com/pereriksson/editor-frontend.svg?branch=master)](https://app.travis-ci.com/pereriksson/editor-frontend)

This project provides an easy-to-use document editor designed to collaborate with others.

Features:

* Creating, editing and saving documents.
* Commenting on paragraphs in the document.
* Generating a PDF of the document.
* Write code using the built-in code editor.
* Run JavaScript code live and see the result.

## Configuration

This app needs the following environment variables to be avilable:

| Environment variable | Description |
|----------------------|-------------|
| REACT_APP_API_HOSTNAME | The hostname to the backend service, e g https://app.azurewebsites.net.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
