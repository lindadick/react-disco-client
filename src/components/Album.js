import React, {Component} from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';

import disco from '../lib/disco';

export class Album extends Component {

    constructor(props) {
        super(props);

        this.state = {
            added: false
        }

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
    }

    addToCurrentPlaylist() {
        this.setState({
            added: disco.addAlbumToCurrentPlaylist(this.props.id, this.props.track_count)
        });
    }

    render() {
        // Build menu options
        let buttons = [];

        if (this.props.options['addToPlaylist']) {
            if (this.state.added) {
                buttons.push({
                    popup: "Added!",
                    icon: "check",
                    className: "button-added"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    popup: "Add album to playlist",
                    className: "button-add",
                    icon: "add"
                })
            }
        }

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
                    {buttons.map((option, i) =>
                            <Popup key={i} trigger={<Button loading={option.loading} className={option.className} 
                                icon={option.icon} onClick={option.onClick} />} 
                                content={option.popup} on='hover' />
                    )}
                </Table.Cell>
            </Table.Row>
        )
    }
}
