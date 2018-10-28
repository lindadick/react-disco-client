import React from 'react';

import disco from '../lib/disco';
import { Playlist } from './Playlist'

export default class Playlists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allPlaylists: []
        }
    }

    onError(error){
        console.log(error);
    }

    refreshData() {
        disco.getAllPlaylists()
        .then(data => this.setState({ 
            allPlaylists: data
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 50000);    
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h1>Playlists</h1>
                <p>TBD</p>
                {/* 
                {this.state.allPlaylists.map((playlist, i) =>
                    <Playlist key={`item-${i}`} index={i} {...playlist}/>	
                )}
                */}
            </div>
        );
    }
}
