import React, {Component} from 'react';
import { Grid, Button, Popup } from 'semantic-ui-react';

import disco from '../lib/disco';

export class Album extends Component {

    constructor(props) {
        super(props);

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
    }

    addToCurrentPlaylist() {
        disco.addAlbumToCurrentPlaylist(this.props.id, this.props.track_count);
    }

    render() {
        return (
            <Grid.Row columns={5}>
                <Grid.Column>
                    <span>{this.props.artist}</span>
                </Grid.Column>
                <Grid.Column>
                    <span>{this.props.title}</span>
                </Grid.Column>
                <Grid.Column>
                    <span>{this.props.duration}</span>
                </Grid.Column>
                <Grid.Column>
                    <span>{this.props.track_count}</span>
                </Grid.Column>
                <Grid.Column>
                    {this.props.options['addToPlaylist'] ? (
                    <Popup trigger={<Button icon="add" onClick={this.addToCurrentPlaylist} />} content="Add album to current playlist" on='hover' />
                    ) : null} 
                </Grid.Column>
            </Grid.Row>
        )
    }
}
