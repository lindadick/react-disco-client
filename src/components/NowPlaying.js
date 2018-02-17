import React, { Component } from 'react';
import { Track } from './Track';
import { Table, Header, Loader, Segment } from 'semantic-ui-react';

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
   }

    onError(error){
        console.log(error)
    }

    render() {
        let trackOptions = {
            addToPlaylist: false,
            sortable: false,
            skip: true
        };

        return (
            <Segment>
                <Header size="medium">Now Playing</Header>
                { this.props.currentTrack ? (                   
                <Table compact basic className="now-playing">
                    <Table.Body>
                        <Track key={this.props.currentTrack.album_id + `-` + this.props.currentTrack.track_id} options={trackOptions} index={0} {...this.props.currentTrack}/>	
                    </Table.Body>
                </Table>
                ): (
                <Loader active />
                ) }
            </Segment>
        );
    }
}