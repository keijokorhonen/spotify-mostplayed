# spotify-mostplayed
A frontend to display your top artists and tracks on Spotify using the Spotify Web API. Built using React, spotify-web-api-js and styled-components.

## How to run
First, run the server for spotify authentication. (Ultimately, I want this to be a part of the frontend too)
    
    $ cd auth-server
    $ npm install
    $ node authorization_code/app.js

Then start the node app with

    $ cd frontend
    $ npm install
    $ npm start

The app should launch on http://localhost:3000.

## Todo
- Better implementation of API requests (currently all done after page load with useEffect)
- Token refresh after around an hour
- Login integrated into frontend
- Host on some server
- Remove excessive dependencies
