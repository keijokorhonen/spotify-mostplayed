import React from 'react'
import styled from 'styled-components'
import RankItem from './RankItem'

const StyledArtists = styled.div`
    padding-right: 25px;
    padding-left: 25px;
`

const Artists = ({ artists }) => (
    <StyledArtists>
        {artists.map((a, i) =>
            <div key={a.id}>
                <RankItem item={a} image={a.images[2]} rank={i + 1} />
            </div>
        )}
    </StyledArtists>
)

export default Artists