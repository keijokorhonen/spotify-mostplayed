import React from 'react'
import styled from 'styled-components'
import RankItem from './RankItem'

const StyledTracks = styled.div`
    padding-right: 25px;
    padding-left: 25px;
`

const Tracks = ({ tracks }) => (
    <StyledTracks>
        {tracks.map((t, i) =>
            <div key={i}>
                <RankItem item={t} image={t.album.images[2]} subitems={t.artists} rank={i + 1} />
            </div>
        )}
    </StyledTracks>
)

export default Tracks