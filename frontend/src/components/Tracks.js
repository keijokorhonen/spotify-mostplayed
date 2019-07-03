import React from 'react'
import styled from 'styled-components'
import Track from './Track'

const StyledTracks = styled.div`
    padding-right: 25px;
    padding-left: 25px;
`

const Tracks = ({ tracks }) => (
    <StyledTracks>
        {tracks.map((t, i) =>
            <div key={t.id}>
                <Track track={t} rank={i + 1} />
            </div>
        )}
    </StyledTracks>
)

export default Tracks