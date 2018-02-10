import React, { Component } from 'react';
import disco from '../lib/disco';
import { Track } from './Track';
import { TrackList } from './TrackList';
import NowPlaying from './NowPlaying';
import { arrayMove } from 'react-sortable-hoc';
import { Container, Grid, Header } from 'semantic-ui-react';

export default class Current extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: []
        }

        this.currentPlaylistOptions = {sortable: true, removeFromPlaylist: true};
    }

    onError(error){
        console.log(error)
    }

    refreshData() {
        // Current playlist
        disco.getCurrentPlaylist()
        .then(data => this.setState({ 
            currentPlaylist: data,
            currentTrack: data[0],
            upcomingPlaylist: data.slice(1)
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 5000);         
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onUpcomingPlaylistSortEnd = ({oldIndex, newIndex}) => {
        let album_id = this.state.upcomingPlaylist[oldIndex].album_id;
        let track_id = this.state.upcomingPlaylist[oldIndex].track_id;
        disco.moveTrackWithinCurrentPlaylist(album_id, track_id, oldIndex, newIndex)
        .then(this.refreshData())
        .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row columns={1}>
                        <Header as="h1">Current Playlist</Header>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <NowPlaying track={this.state.currentTrack}/>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        { this.state.upcomingPlaylist.length > 0 ? 
                            (
                            <Grid.Column>
                                <Header as="h2">Coming Up</Header>
                                <TrackList tracks={this.state.upcomingPlaylist} onSortEnd={this.onUpcomingPlaylistSortEnd} 
                                useDragHandle={false} pressDelay={200} options={this.currentPlaylistOptions} />
                            </Grid.Column>
                            )
                            : null
                        }
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
