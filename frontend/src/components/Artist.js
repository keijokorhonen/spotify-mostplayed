import React from 'react'
import styled from 'styled-components'

const StyledArtist = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #1e3264;
    color: #ffffff;

    :hover {
        box-shadow: 0px 0px 16px -2px #686868;
    }

    .rank {
        flex: 25px 0;
        font-weight: bold;
    }

    .imgContainer {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 5px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .imgContainer img {
        width: 70px;
        height: 70px;
        object-position: 50% 50%;
        object-fit: cover;
    }
    
    .artistInfo {
        vertical-align: middle;
    }

    .artistInfo a{
        color: #ffffff;
    }
`

const Artist = ({ artist, rank }) => (
    <StyledArtist>
        <div className="rank">
            <span>{rank}</span>
        </div>
        <div className="imgContainer">
            <img alt="" src={artist.images[2].url} />
        </div>
        <div className="artistInfo">
            <a href={artist.external_urls.spotify}>{artist.name}</a>
        </div>
    </StyledArtist>
)

export default Artist