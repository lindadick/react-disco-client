import React, { Component } from 'react';
import disco from '../lib/disco';
import { Track } from './Track';
import { Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);

        this.options = {
            addToPlaylist: false,
            sortable: false
        }
    }

    onError(error){
        console.log(error);
    }

    next() {
        disco.skipToNextTrack();
    }

    render() {
        return (
            <Grid.Column>
                Now playing: <Track key='item-0' options={this.options} displayInTable={false} index={0} {...this.props.track}/>	
                <Button onClick={this.next} icon="step forward"></Button>  
            </Grid.Column>              
        );
    }
}
