import React from 'react';
import {Link} from 'react-router-dom';
import disco from '../lib/disco';
import TrackList from './TrackList';
import Spinner from './Spinner';

export default class UpcomingPlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moving: false
        };
    }

    onUpcomingPlaylistSortEnd = (event) => {
        let oldIndex = event.removedIndex;
        let newIndex = event.addedIndex;
        if (oldIndex !== newIndex) {
            let album_id = this.props.upcomingPlaylist[oldIndex].album_id;
            let track_id = this.props.upcomingPlaylist[oldIndex].track_id;
            this.setState({
                moving: true
            });
            disco.moveTrackWithinCurrentPlaylist(album_id, track_id, oldIndex, newIndex)
            .then(data => {
                this.props.refreshCallback();
            });
        }
    };

    render() {
        if (this.state.moving) {
            return (
                <div className="text-center">
                    <Spinner/>
                    Reordering playlist...
                </div>
            );
        } else if (this.props.upcomingPlaylist && this.props.upcomingPlaylist.length > 0) {
            const isSortable = this.props.upcomingPlaylist.length > 1;
            return (
                <div>
                    <h1>Coming Up</h1>
                    <TrackList 
                        tracks={this.props.upcomingPlaylist} 
                        onSortEnd={this.onUpcomingPlaylistSortEnd} 
                        options={{sortable: isSortable, removeFromPlaylist: true, showDuration: true, showAlbumLink: true}} 
                    />
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="text-muted font-italic">The playlist is empty.</div>
                    <Link to="/search" className="btn btn-secondary">Search for tracks</Link>
                </React.Fragment>
            );
        }
    }

}