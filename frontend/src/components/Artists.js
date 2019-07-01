import React from 'react'
import styled from 'styled-components'
import Artist from './Artist'

const StyledArtists = styled.div`
    padding-right: 25px;
    padding-left: 25px;
`

const Artists = ({ artists }) => (
    <StyledArtists>
        {artists.map((a, i) =>
            <div key={a.id}>
                <Artist artist={a} rank={i + 1} />
            </div>
        )}
    </StyledArtists>
)

export default Artists