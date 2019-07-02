import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'

import Footer from './components/Footer'
import Artists from './components/Artists'

const spotifyApi = new SpotifyWebApi()

const Background = styled.div`
    background-image: linear-gradient(90deg, #2C5E92 0%, #552F6D 80%);
`

const Header = styled.div`
    background-color: #000000;
    color: #ffffff;
    padding: 25px;
`

const Heading = styled.h2`
    color: #ffffff;
`

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #ffffff;
    padding: 5px;
    margin-left: 15px;
    margin-right: 15px;

    &:hover, &.active {
        border-bottom: 3px solid #ffffff;
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
            <Router>
                <Background>
                    <Header>
                        <div className="container">
                            <h1>Spotify Most Played Tracks and Artists</h1>
                            <Route path="/" render={() => <Heading>Your Top Artists</Heading>} />
                            <div className="menu">
                                <StyledLink exact to="/">All Time</StyledLink>
                                <StyledLink to="/artists-medium">Last 6 months</StyledLink>
                                <StyledLink to="/artists-short">Last month</StyledLink>
                                <LogoutButton onClick={logout}>Logout</LogoutButton>
                            </div>
                        </div>
                    </Header>

                    <div className="container">
                        <Route exact path="/" render={() => <Artists artists={topArtistsLong} />} />
                        <Route path="/artists-medium" render={() => <Artists artists={topArtistsMedium} />} />
                        <Route path="/artists-short" render={() => <Artists artists={topArtistsShort} />} />
                    </div>
                </Background>
            </Router>

            <Footer />

        </div>
    )
}

export default App
