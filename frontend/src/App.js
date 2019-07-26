import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'

import Footer from './components/Footer'
import Artists from './components/Artists'
import Tracks from './components/Tracks'
import Menu from './components/Menu'

const spotifyApi = new SpotifyWebApi()

const Background = styled.div`
    background-color: #000000;
    background-image: linear-gradient(0, #2a4faa 0%, #60359F 100%);
    min-height: 100vh;
    min-height: calc(100vh - 5rem);
`

const Header = styled.div`
    background-color: #000000;
    color: #ffffff;
    padding: 25px;
    text-align: center;
`

function App () {
    const [loggedIn, setLoggedIn] = useState(false)
    const [topArtistsLong, setTopArtistsLong] = useState([])
    const [topArtistsMedium, setTopArtistsMedium] = useState([])
    const [topArtistsShort, setTopArtistsShort] = useState([])
    const [topTracksLong, setTopTracksLong] = useState([])
    const [topTracksMedium, setTopTracksMedium] = useState([])
    const [topTracksShort, setTopTracksShort] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {
        const localToken = window.localStorage.getItem('spotify-mostplayed-token')
        const params = getHashParams()
        const token = params.access_token ? params.access_token : localToken
        if (token) {
            window.localStorage.setItem('spotify-mostplayed-token', token)
            spotifyApi.setAccessToken(token)
        }
        setLoggedIn(token ? true : false)
    }, [])

    useEffect(() => {
        if (loggedIn) {
            getTopArtists('long')
            getTopArtists('medium')
            getTopArtists('short')
            getTopTracks('long')
            getTopTracks('medium')
            getTopTracks('short')
            getRecentlyPlayed()
        }
    }, [loggedIn])

    const getHashParams = () => {
        const hash = window.location.hash.substr(1)
        const result = hash.split('&').reduce((acc, cur) => {
            const parts = cur.split('=')
            acc[parts[0]] = parts[1]
            return acc
        }, {})
        return result
    }

    const logout = () => {
        window.localStorage.removeItem('spotify-mostplayed-token')
        setLoggedIn(false)
    }

    const getTopArtists = async (period) => {
        try {
            if (period === 'long') {
                const { items } = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "long_term" })
                setTopArtistsLong(items)
            } else if (period === 'medium') {
                const { items } = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "medium_term" })
                setTopArtistsMedium(items)
            } else if (period === 'short') {
                const { items } = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "short_term" })
                setTopArtistsShort(items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTopTracks = async (period) => {
        try {
            if (period === 'long') {
                const { items } = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "long_term" })
                setTopTracksLong(items)
            } else if (period === 'medium') {
                const { items } = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "medium_term" })
                setTopTracksMedium(items)
            } else if (period === 'short') {
                const { items } = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "short_term" })
                setTopTracksShort(items)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getRecentlyPlayed = async () => {
        try {
            const { items } = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50, time_range: "long_term" })
            const tracks = items.map(i => i.track)
            
            setRecentlyPlayed(tracks)
        } catch (error) {
            console.log(error)
        }
    }

    if (!loggedIn) {
        return (
            <div className="main">
                <Router>
                    <Switch>
                        <Route exact path="/" render={null} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
                <Background>
                    <Header>
                        <div className="container">
                            <h1>Spotify - Your Top Tracks and Artists</h1>
                        </div>
                    </Header>
                    <div className="container centertext">
                        <p>To see your stats, <a href="/login">log in to Spotify</a></p>
                    </div>
                </Background>
                <Footer />
            </div>
        )
    }

    return (
        <div className="main">
            <Background>
                <Router>
                    <Route exact path="/" render={() => <Redirect to="/top-artists" />} />
                    <Header>
                        <div className="container">
                            <h1>Spotify - Your Top Tracks and Artists</h1>
                        </div>
                    </Header>
                    <Menu logout={logout} />
                    <div className="container">
                        <Route exact path="/top-artists" render={() => <Artists artists={topArtistsLong} />} />
                        <Route path="/top-artists/medium" render={() => <Artists artists={topArtistsMedium} />} />
                        <Route path="/top-artists/short" render={() => <Artists artists={topArtistsShort} />} />
                        <Route exact path="/top-tracks" render={() => <Tracks tracks={topTracksLong} />} />
                        <Route path="/top-tracks/medium" render={() => <Tracks tracks={topTracksMedium} />} />
                        <Route path="/top-tracks/short" render={() => <Tracks tracks={topTracksShort} />} />
                        <Route path="/recently-played" render={() => <Tracks tracks={recentlyPlayed} />} />
                    </div>
                </Router>
                <Footer />
            </Background>
        </div>
    )
}

export default App
