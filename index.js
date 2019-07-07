require('dotenv').config()

const express = require('express')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const request = require('request')
const path = require('path')

var CLIENT_ID = process.env.CLIENT_ID
var CLIENT_SECRET = process.env.CLIENT_SECRET
var REDIRECT_URI = process.env.REDIRECT_URI
var STATE_KEY = 'spotify_auth_state'

const app = express()

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(express.static(__dirname + '/frontend/build'))
app.use(cookieParser())

app.get('/login', (req, res) => {
    const state = generateRandomString(16)
    res.cookie(STATE_KEY, state)

    const scope = 'user-read-private user-read-email user-top-read'
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        })
    )
})

app.get('/callback', (req, res) => {
    var { code, state } = req.query
    var storedState = req.cookies ? req.cookies[STATE_KEY] : null
    
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            })
        )
    } else {
        res.clearCookie(STATE_KEY)

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            json: true
        }

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const accessToken = body.access_token
                const refreshToken = body.refresh_token
                
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    })
                )
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    })
                )
            }
        })
    }
})

app.get('/*', (req, res) => {
    let url = path.join(__dirname, '/frontend/build', 'index.html')
    res.sendFile(url)
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})