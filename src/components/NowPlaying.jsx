import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'

import Track from './Track'
import Spinner from './Spinner'

export default function NowPlaying(props) {
    const { currentTrack, appName, updateTitle, widgetView } = props

    updateTitle(currentTrack, appName)

    const trackOptions = {
        addToPlaylist: false,
        sortable: false,
        skip: true,
        showDuration: true,
        showAlbumLink: true,
        showAlbumArt: true,
    }

    return (
        <div className="disco-highlight border-top border-bottom py-2 mb-2">
            <Container>
                {currentTrack ? (
                    <Track
                        key={`${currentTrack.album_id}-${currentTrack.track_id}`}
                        options={trackOptions}
                        index={0}
                        widgetView={widgetView}
                        {...currentTrack}
                    />
                ) : (
                    <Spinner />
                )}
            </Container>
        </div>
    )
}

NowPlaying.propTypes = {
    currentTrack: PropTypes.objectOf(Track),
    appName: PropTypes.string.isRequired,
    updateTitle: PropTypes.func.isRequired,
    widgetView: PropTypes.bool,
}

NowPlaying.defaultProps = {
    currentTrack: undefined,
    widgetView: false,
}
