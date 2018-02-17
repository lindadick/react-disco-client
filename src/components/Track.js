import React, {Component} from 'react';
import moment from 'moment';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Button, Table, Icon, Message, Popup } from 'semantic-ui-react';

import disco from '../lib/disco';

const DragHandle = SortableHandle(() => <Icon name="move" label="Reorder Tracks" />);

export class Track extends Component {

    constructor(props) {
        super(props);

        this.state = {
            added: false,
            skipping: false
        }

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
        this.removeFromCurrentPlaylist = this.removeFromCurrentPlaylist.bind(this);
        this.skipCurrentTrack = this.skipCurrentTrack.bind(this);
        this.toggleShortlist = this.toggleShortlist.bind(this);
    }

    addToCurrentPlaylist() {
        if (this.props.online) {
            disco.addTrackToCurrentPlaylist(this.props.album_id, this.props.track_id)
                .then(data => this.setState({ 
                    added: (data.status == 200)
                }));
        }
    }
    
    removeFromCurrentPlaylist() {
        disco.removeTrackFromCurrentPlaylist(this.props.album_id, this.props.track_id);
    }

    toggleShortlist() {
        if (!this.props.shortlist) {
            disco.addTrackToShortlist(this.props.album_id, this.props.track_id);
        } else {
            disco.removeTrackFromShortlist(this.props.album_id, this.props.track_id);
        }
    }
    
    skipCurrentTrack() {
        disco.skipToNextTrack()
        .then(data => this.setState({ //TODO what to do when data is null?
            skipping: (data.status == 200)
        }));
    }
     
    render() {
        // Build menu options
        let buttons = [];
        let icons = [];

        if (this.props.options['addToPlaylist'] && this.props.online) {
            if (this.state.added) {
                buttons.push({
                    popup: "Added!",
                    icon: "check",
                    className: "button-added"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    popup: "Add to playlist",
                    className: "button-add",
                    icon: "add"
                })
            }
        }

        if (this.props.options['removeFromPlaylist']) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                popup: "Remove from playlist",
                className: "button-remove",
                icon: "delete"
            })
        }

        if (this.props.options['skip']) {
            if (this.state.skipping) {
                buttons.push({
                    popup: "Skipping track",
                    icon: "hourglass half",
                    className: "button-skipping"
                })
            } else {
                buttons.push({
                    onClick: this.skipCurrentTrack,
                    popup: "Skip this track",
                    className: "button-skip",
                    icon: "step forward"
                })
            }
        }

        let trackClassName = "";

        if (!this.props.online) {
            trackClassName = "track-offline";
            icons.push({
                popup: "This track is currently offline",
                icon: "dont"
            });
        }

        return (
            <Table.Row>
                { this.props.options['sortable'] ? (
                <Table.Cell collapsing>
                    <DragHandle />
                </Table.Cell>
                ) : null }
                <Table.Cell className={trackClassName}>
                    {icons.map((option, i) =>
                        <Popup key={i} trigger={<Icon name={option.icon} />} content={option.popup} on='hover' />
                    )}
                    {this.props.artist} - {this.props.title}<br/>
                    <span className="track-album-title">{this.props.album_title}</span>
                </Table.Cell>
                { this.props.options['showDuration'] ? (
                <Table.Cell collapsing>
                    {this.props.duration}
                </Table.Cell>
                ) : null }
                { this.props.options['showLastPlayed'] ? (
                <Table.Cell>
                    {moment.unix(parseInt(this.props.last_play, 16)).format('llll')}
                </Table.Cell>
                ) : null }
                <Table.Cell collapsing>
                    {buttons.map((option, i) =>
                        <Popup key={i} trigger={<Button loading={option.loading} className={option.className} 
                            icon={option.icon} onClick={option.onClick} />} 
                            content={option.popup} on='hover' />
                    )}
                    {this.props.online? (
                        <Popup trigger={<Button className="shortlist-button" 
                            toggle active={this.props.shortlist} 
                            icon="heart" onClick={this.toggleShortlist} />} 
                            content="Toggle shortlist status" on='hover' />
                    ) : null }
                </Table.Cell>
            </Table.Row>
        );
    }

}

export const SortableTrack = SortableElement(Track);
