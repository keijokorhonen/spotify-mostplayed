import React from 'react'
import styled from 'styled-components'

const StyledItem = styled.div`
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
    
    .itemInfo {
        vertical-align: middle;
    }

    .itemInfo a{
        color: #ffffff;
    }

    .itemInfo a:hover {
        text-decoration: underline;
    }

    .itemInfo span {
        color: rgb(255, 255, 255, 0.5);
    }
`

const RankItem = ({ item, image, subitems, rank }) => (
    <StyledItem>
        <div className="rank">
            <span>{rank}</span>
        </div>
        <div className="imgContainer">
            <img alt="" src={image.url} />
        </div>
        <div className="itemInfo">
            <a href={item.external_urls.spotify}>{item.name}</a><br />
            <span>{subitems && subitems.map(a => <span key={a.id}>{a.name}</span>)
                .reduce((acc, cur) => [acc, ", ", cur])
            }
            </span>
        </div>
    </StyledItem>
)

export default RankItem