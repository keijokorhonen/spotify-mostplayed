import React from 'react'
import styled from 'styled-components'

const StyledTrack = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
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
    
    .trackInfo {
        vertical-align: middle;
    }

    .trackInfo a{
        color: #ffffff;
    }

    .trackInfo a:hover {
        border-bottom: 1px solid #ffffff;
    }
    
    .trackInfo span {
        color: rgb(255, 255, 255, 0.3);
    }
`

const Track = ({ track, rank }) => (
    <StyledTrack>
        <div className="rank">
            <span>{rank}</span>
        </div>
        <div className="imgContainer">
            <img alt="" src={track.album.images[2].url} />
        </div>
        <div className="trackInfo">
            <a href={track.external_urls.spotify}>{track.name}</a><br />
            {track.artists.map(a => <span key={a.id}>{a.name}</span>)
                .reduce((acc, cur) => [acc, (<span>, </span>), cur])
            }
        </div>
    </StyledTrack>
)

export default Track