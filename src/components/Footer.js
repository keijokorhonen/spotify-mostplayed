import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const StyledFooter = styled.div`
    background-color: #000000;
    color: #919496;
    font-size: 14px;
    display: flex;
    align-content: flex-end;
    padding-top: 20px;
    padding-bottom: 20px;
    position: absolute;
    bottom: 0px;
    width: 100%;

.copyright {
    text-align: center;
}
`

const Footer = () => {
    return (
        <StyledFooter>
            <div className="container copyright">
                <div>
                    Made in Finland with <span style={{ color: "#e25555" }}>&#9829;</span> <FontAwesomeIcon icon={faGithub} />
                </div>
            </div>
        </StyledFooter>
    )
}

export default Footer