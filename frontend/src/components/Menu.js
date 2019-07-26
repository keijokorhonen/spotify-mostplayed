import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'


const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #b3b3b3;
    padding: 5px;
    margin-left: 15px;
    margin-right: 15px;

    &:hover, &.active {
        color: #ffffff;
    }
`

const StyledLinkSubMenu = styled(StyledLink)`
    &.active {
        border-bottom: 3px solid #1db954;
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
    max-height: 3em;

    &:hover {
        background-color: #069b3a;
    }
`

const Menu = ({ logout }) => (
    <div className="container">
        <div className="menu outer-menu">
            <StyledLink to="/top-artists"><h2>Artists</h2></StyledLink>
            <StyledLink to="/top-tracks"><h2>Tracks</h2></StyledLink>
            <StyledLink to="/recently-played"><h2>Recently Played</h2></StyledLink>
        </div>
        <div className="menu outer-menu">
            <Route path="/top-artists" render={() => (
                <div className="menu submenu">
                    <StyledLinkSubMenu exact to="/top-artists">All Time</StyledLinkSubMenu>
                    <StyledLinkSubMenu to="/top-artists/medium">Last 6 months</StyledLinkSubMenu>
                    <StyledLinkSubMenu to="/top-artists/short">Last month</StyledLinkSubMenu>
                </div>
            )} />
            <Route path="/top-tracks" render={() => (
                <div className="menu submenu">
                    <StyledLinkSubMenu exact to="/top-tracks">All Time</StyledLinkSubMenu>
                    <StyledLinkSubMenu to="/top-tracks/medium">Last 6 months</StyledLinkSubMenu>
                    <StyledLinkSubMenu to="/top-tracks/short">Last month</StyledLinkSubMenu>
                </div>
            )} />
            <LogoutButton onClick={logout}>Logout</LogoutButton>
        </div>
    </div>
)

export default Menu