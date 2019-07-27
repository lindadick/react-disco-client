import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import disco from '../lib/disco'
import TrackList from './TrackList'
import Spinner from './Spinner'

export default class UpcomingPlaylist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            moving: false,
        }
    }

    onUpcomingPlaylistSortEnd = (event) => {
        const { refreshCallback, upcomingPlaylist } = this.props
        const oldIndex = event.removedIndex
        const newIndex = event.addedIndex
        if (oldIndex !== newIndex) {
            const { album_id, track_id } = upcomingPlaylist[oldIndex]
            this.setState({
                moving: true,
            })
            disco
                .moveTrackWithinCurrentPlaylist(album_id, track_id, oldIndex, newIndex)
                .then(() => {
                    refreshCallback()
                })
        }
    }

    render() {
        const { moving } = this.state
        const { upcomingPlaylist } = this.props
        if (moving) {
            return (
                <div className="text-center">
                    <Spinner />
                    Reordering playlist...
                </div>
            )
        }
        if (upcomingPlaylist && upcomingPlaylist.length > 0) {
            const isSortable = upcomingPlaylist.length > 1
            return (
                <div>
                    <h1>Coming Up</h1>
                    <TrackList
                        tracks={upcomingPlaylist}
                        onSortEnd={this.onUpcomingPlaylistSortEnd}
                        options={{
                            sortable: isSortable,
                            removeFromPlaylist: true,
                            showDuration: true,
                            showAlbumLink: true,
                            showAlbumArt: true,
                        }}
                    />
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="text-muted font-italic">There are no upcoming tracks.</div>
                <Link to="/search" className="btn btn-secondary">
                    Search for tracks
                </Link>
            </React.Fragment>
        )
    }
}

UpcomingPlaylist.propTypes = {
    refreshCallback: PropTypes.func.isRequired,
    upcomingPlaylist: PropTypes.objectOf(String).isRequired,
}
