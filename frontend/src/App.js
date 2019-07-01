import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'

import Footer from './components/Footer'
import Artists from './components/Artists'

const spotifyApi = new SpotifyWebApi()

const Background = styled.div`
    background-image: linear-gradient(90deg, #2C5E92 0%, #552F6D 80%);
`

const Headers = styled.div`
    color: #ffffff;
    margin-left: 25px;
    margin-right: 25px;
`

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [topArtistsLong, setTopArtistsLong] = useState([])

    useEffect(() => {
        const params = getHashParams()
        const token = params.access_token
        if (token) {
            spotifyApi.setAccessToken(token)
        }
        setLoggedIn(token ? true : false)
    }, [])

    useEffect(() => {
        getTopArtists()
    }, [])

    const getHashParams = () => {
        const hash = window.location.hash.substr(1)
        const result = hash.split('&').reduce((acc, cur) => {
            const parts = cur.split('=')
            acc[parts[0]] = parts[1]
            return acc
        }, {})
        return result
    }

    const getTopArtists = async () => {
        try {
            const { items } = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "long_term"})
            setTopArtistsLong(items)
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!loggedIn) {
        return (
            <div>
                <div className="container main">
                    <h1>Spotify Most Played Artists and Tracks</h1>
                    <p>To see your stats, <a href="http://localhost:8888">log in to Spotify</a></p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="main">
            <Background>
                <div className="container">
                    <Headers>
                        <h1>Spotify Most Played Tracks and Artists</h1>
                        <h2>Your Top Artists (All Time)</h2>
                    </Headers>
                    <Artists artists={topArtistsLong} />
                </div>
            </Background>
            <Footer />
        </div>
    )
}

export default App
