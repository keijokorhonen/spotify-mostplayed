import React, { useState } from 'react'

import Footer from './components/Footer'

function App() {
    const [user, setUser] = useState(null)

    if (user === null) {
        return (
            <div>
                <div className="container main">
                    <h1>Spotify Most Played Artists and Tracks</h1>
                    <p>To see your stats, log in to Spotify</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <div className="container main">
                <h1>Spotify Most Played Tracks and Artists</h1>
                <p>Test paragraph</p>
            </div>
            <Footer />
        </div>
    )
}

export default App
