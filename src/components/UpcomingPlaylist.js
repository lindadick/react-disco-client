import React, { Component } from 'react';
import disco from '../lib/disco';
import { TrackList } from './TrackList';
import { arrayMove } from 'react-sortable-hoc';
import { Header, Loader, Message, Segment } from 'semantic-ui-react';

export default class UpcomingPlaylist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            moving: false
        };
    }

    onUpcomingPlaylistSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex != newIndex) {
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
                    <Header as="h1">Coming Up</Header>
                    { this.state.moving ? (
                    <Message>
                        <Loader active />
                        <p>Reordering playlist...</p>
                    </Message>
                    ) : (
                    <TrackList tracks={this.props.upcomingPlaylist} onSortEnd={this.onUpcomingPlaylistSortEnd} 
                    useDragHandle={true} pressDelay={200} options={{sortable: true, removeFromPlaylist: true, showDuration: true}} />
                    )}
                    </div>
            );
        } else {
            return null;
        }
    }

}