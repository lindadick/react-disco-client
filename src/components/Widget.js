import React from 'react';
import disco from '../lib/disco';

import NowPlaying from './NowPlaying';
import {APP_NAME, THEME} from 'discoConfig';

switch(THEME) {
    case "dark":
        require("../stylesheets/widget-dark.scss");
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
        break;
    default:
        require("../stylesheets/widget-light.scss");
}


export default class Widget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: [],
        }
    }

    onError(error){
        console.log(error)
    }

    refreshData() {
        disco.getCurrentPlaylist()
        .then(data => this.updateStateIfNeeded(data));
    }

    updateStateIfNeeded(newData) {
        if (newData == null) {
            return;
        } else if (!this.state.currentPlaylist || JSON.stringify(newData) !== JSON.stringify(this.state.currentPlaylist)) {
            // Only update the state if it actually changed, to prevent unnecessary render calls
            this.setState({ 
                currentPlaylist: newData,
                currentTrack: newData[0],
                upcomingPlaylist: newData.slice(1)
            });            
        }
    }

    updateDocumentTitle(currentTrack) {
        if (currentTrack) {
            document.title = currentTrack.artist + " - " + currentTrack.title + " | " + APP_NAME;             
        } else {
            document.title = APP_NAME;
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 1000);                 
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <NowPlaying currentTrack={this.state.currentTrack} updateTitle={this.updateDocumentTitle} appName={APP_NAME} widgetView={true} />
        );
    }
}

