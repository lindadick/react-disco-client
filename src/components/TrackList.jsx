import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import PropTypes from 'prop-types'
import Track from './Track'

export default class TrackList extends React.Component {
    render() {
        const { options, tracks, onSortEnd } = this.props
        const rowClassName = 'border-bottom py-1'
        if (options.sortable) {
            return (
                <Container lockAxis="y" onDrop={onSortEnd}>
                    {tracks.map((track, i) => (
                        <Draggable key={track.track_id}>
                            <Track
                                key={`${track.album_id}-${track.track_id}`}
                                options={options}
                                index={i}
                                {...track}
                                rowClassName={rowClassName}
                            />
                        </Draggable>
                    ))}
                </Container>
            )
        }
        return tracks.map((track, i) => (
            <Track
                key={`${track.album_id}-${track.track_id}`}
                options={options}
                index={i}
                {...track}
                rowClassName={rowClassName}
            />
        ))
    }
}

TrackList.propTypes = {
    options: PropTypes.objectOf(String).isRequired,
    tracks: PropTypes.objectOf(Track).isRequired,
    onSortEnd: PropTypes.func.isRequired,
}
