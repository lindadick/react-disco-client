import React, { Component } from 'react';
import disco from '../lib/disco';
import NowPlaying from './NowPlaying';
import UpcomingPlaylist from './UpcomingPlaylist';

export default class Current extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: []
        }
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

    render() {
        return (
            <div>
                {/* <NowPlaying currentTrack={this.state.currentTrack} /> */}
                <UpcomingPlaylist upcomingPlaylist={this.state.upcomingPlaylist} />
            </div>
        );
    }
}