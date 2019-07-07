# spotify-mostplayed
A frontend to display your top artists and tracks on Spotify using the Spotify Web API. Built using React, spotify-web-api-js and styled-components.

https://spotify-mostplayed.herokuapp.com/

## How to run locally
First, fill in environment variables for CLIENT_ID, CLIENT_SECRET, REDIRECT_URI and PORT for your spotify app inside of .env in the root directory. 

Then run
    $ npm install
    $ npm run build
    $ node index.js

in the root directory and the app should launch on localhost on the port you specified.

## Todo
- Better implementation of API requests (currently all done after page load with useEffect)
- Token refresh after around an hour
- Remove excessive dependencies
