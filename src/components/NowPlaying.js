import React, { Component } from 'react';
import { Card, Table } from 'reactstrap';

import { Track } from './Track';
import Spinner from './Spinner';

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.updateTitle = this.props.updateTitle.bind(this);
    }

    onError(error){
        console.log(error)
    }

    render() {
        this.updateTitle(this.props.currentTrack, this.props.appName);

        let trackOptions = {
            addToPlaylist: false,
            sortable: false,
            skip: true
        };

        return (
            <Card body className="shadow">
                <h1>Now Playing</h1>
                { this.props.currentTrack ? (                   
                <Table borderless responsive size="sm">
                    <tbody>
                        <Track key={this.props.currentTrack.album_id + `-` + this.props.currentTrack.track_id} options={trackOptions} index={0} {...this.props.currentTrack}/>	
                    </tbody>
                </Table>
                ): (
                    <Spinner />
                ) }
            </Card>
        );
    }
}