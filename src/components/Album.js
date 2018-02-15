import React, {Component} from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';

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
            <Table.Row>
                <Table.Cell>
                    {this.props.artist}
                </Table.Cell>
                <Table.Cell>
                    {this.props.title}
                </Table.Cell>
                <Table.Cell collapsing>
                    {this.props.duration}
                </Table.Cell>
                <Table.Cell collapsing>
                    {this.props.track_count}
                </Table.Cell>
                <Table.Cell collapsing>
                    {this.props.options['addToPlaylist'] ? (
                    <Popup trigger={<Button icon="add" onClick={this.addToCurrentPlaylist} />} content="Add album to current playlist" on='hover' />
                    ) : null} 
                </Table.Cell>
            </Table.Row>
        )
    }
}
