import React from 'react';
import disco from '../lib/disco';
import { SortableTrackList, TrackList } from './TrackList';
import Spinner from './Spinner';

export default class UpcomingPlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moving: false
        };
    }

    onUpcomingPlaylistSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex !== newIndex) {
            let album_id = this.props.upcomingPlaylist[oldIndex].album_id;
            let track_id = this.props.upcomingPlaylist[oldIndex].track_id;
            this.setState({
                moving: true
            });
            disco.moveTrackWithinCurrentPlaylist(album_id, track_id, oldIndex, newIndex)
            .then(data => {
                this.setState({ 
                    moving: false
                });
            });
        }
    };

    render() {
        if (this.props.upcomingPlaylist && this.props.upcomingPlaylist.length > 0) {
            return (
                <div>
                    <h1>Coming Up</h1>
                    { this.state.moving && ( <Spinner /> ) }
                    { this.props.upcomingPlaylist.length > 1 ? (
                        <SortableTrackList tracks={this.props.upcomingPlaylist} onSortEnd={this.onUpcomingPlaylistSortEnd} 
                        useDragHandle={true} pressDelay={200} options={{sortable: true, removeFromPlaylist: true, showDuration: true, showAlbumLink: true}} />
                    ) : (
                        <TrackList tracks={this.props.upcomingPlaylist} options={{sortable: false, removeFromPlaylist: true, showDuration: true, showAlbumLink: true}} />
                    )}
                </div>
            );
        } else {
            return null;
        }
    }

}