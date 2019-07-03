import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'

import Footer from './components/Footer'
import Artists from './components/Artists'
import Tracks from './components/Tracks'

const spotifyApi = new SpotifyWebApi()

const Background = styled.div`
    background-image: linear-gradient(90deg, #2C5E92 0%, #552F6D 80%);
`

const Header = styled.div`
    background-color: #000000;
    color: #ffffff;
    padding: 25px;
`

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #b3b3b3;
    padding: 5px;
    margin-left: 15px;
    margin-right: 15px;

    &:hover {
        color: #ffffff;
    }

    &.active {
        color: #ffffff;
        border-bottom: 3px solid #1db954;
    }
`

const StyledLinkHeading = styled(NavLink)`
    text-decoration: none;
    color: #b3b3b3;
    padding: 5px;
    margin-left: 15px;
    margin-right: 15px;

    &:hover, &.active {
        color: #ffffff;
    }
`

const LogoutButton = styled.button`
    background-color: #1db954;
    border: 0px;
    padding: 1em 2em;
    border-radius: 20px;
    color: #ffffff;
    cursor: pointer;
    margin-left: auto;

    &:hover {
        background-color: #069b3a;
    }
`

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [topArtistsLong, setTopArtistsLong] = useState([])
    const [topArtistsMedium, setTopArtistsMedium] = useState([])
    const [topArtistsShort, setTopArtistsShort] = useState([])
    const [topTracksLong, setTopTracksLong] = useState([])
    const [topTracksMedium, setTopTracksMedium] = useState([])
    const [topTracksShort, setTopTracksShort] = useState([])

    useEffect(() => {
        const localToken = window.localStorage.getItem('spotify-mostplay-token')
        const params = getHashParams()
        const token = params.access_token ? params.access_token : localToken
        if (token) {
            window.localStorage.setItem('spotify-mostplay-token', token)
            spotifyApi.setAccessToken(token)
        }
        setLoggedIn(token ? true : false)
    }, [])

    useEffect(() => {
        getTopArtists('long')
        getTopArtists('medium')
        getTopArtists('short')
        getTopTracks('long')
        getTopTracks('medium')
        getTopTracks('short')
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
            }  else if (period === 'short') {
                const { items } = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "short_term" })
                setTopArtistsShort(items)
            }       
        } catch (error) {
            console.log(error.message)
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
            }  else if (period === 'short') {
                const { items } = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "short_term" })
                setTopTracksShort(items)
            }       
        } catch (error) {
            console.log(error.message)
        }
    }
    if (!loggedIn) {
        return (
            <div>
                <div className="container main">
                    <h1>Spotify - Your Top Tracks and Artists</h1>
                    <p>To see your stats, <a href="http://localhost:8888">log in to Spotify</a></p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="main">
            <Router>
                <Route exact path="/" render={() => <Redirect to="/top-artists" />} />
                <Background>
                    <Header>
                        <div className="container">
                            <h1>Spotify - Your Top Tracks and Artists</h1>
                        </div>
                    </Header>
                    <div className="container">
                        <div className="menu outer-menu">
                            <StyledLinkHeading to="/top-artists"><h2>Artists</h2></StyledLinkHeading>
                            <StyledLinkHeading to="/top-tracks"><h2>Tracks</h2></StyledLinkHeading>
                        </div>
                        <div className="menu outer-menu">
                            <Route path="/top-artists" render={() => (
                                <div className="menu">
                                    <StyledLink exact to="/top-artists">All Time</StyledLink>
                                    <StyledLink to="/top-artists/medium">Last 6 months</StyledLink>
                                    <StyledLink to="/top-artists/short">Last month</StyledLink>
                                </div>
                            )} />
                            <Route path="/top-tracks" render={() => (
                                <div className="menu">
                                    <StyledLink exact to="/top-tracks">All Time</StyledLink>
                                    <StyledLink to="/top-tracks/medium">Last 6 months</StyledLink>
                                    <StyledLink to="/top-tracks/short">Last month</StyledLink>
                                </div>
                            )} />
                            <LogoutButton onClick={logout}>Logout</LogoutButton>
                        </div>
                    </div>

                    <div className="container">
                        <Route exact path="/top-artists" render={() => <Artists artists={topArtistsLong} />} />
                        <Route path="/top-artists/medium" render={() => <Artists artists={topArtistsMedium} />} />
                        <Route path="/top-artists/short" render={() => <Artists artists={topArtistsShort} />} />
                        <Route exact path="/top-tracks" render={() => <Tracks tracks={topTracksLong} />} />
                        <Route path="/top-tracks/medium" render={() => <Tracks tracks={topTracksMedium} />} />
                        <Route path="/top-tracks/short" render={() => <Tracks tracks={topTracksShort} />} />
                    </div>
                </Background>
            </Router>

            <Footer />

        </div>
    )
}

export default App
