import React, {Component} from 'react';
import moment from 'moment';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Button, Table, Icon, Popup } from 'semantic-ui-react';

import disco from '../lib/disco';

const DragHandle = SortableHandle(() => <Icon name="move" label="Reorder Tracks" />);

export class Track extends Component {

    constructor(props) {
        super(props);
        
        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
        this.removeFromCurrentPlaylist = this.removeFromCurrentPlaylist.bind(this);
        this.toggleShortlist = this.toggleShortlist.bind(this);
    }

    addToCurrentPlaylist() {
        if (this.props.online) {
            disco.addTrackToCurrentPlaylist(this.props.album_id, this.props.track_id);
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
        disco.skipToNextTrack();
    }
      
    render() {
        // Build menu options
        let buttons = [];
        let icons = [];
        let buttonToggles = [];

        if (this.props.options['addToPlaylist'] && this.props.online) {
            buttons.push({
                onClick: this.addToCurrentPlaylist,
                popup: "Add to playlist",
                icon: "add"
            })
        }

        if (this.props.options['removeFromPlaylist']) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                popup: "Remove from playlist",
                icon: "delete"
            })
        }

        if (this.props.options['skip']) {
            buttons.push({
                onClick: this.skipCurrentTrack,
                popup: "Skip this track",
                icon: "step forward"
            })
        }

        let trackClassName = "";

        if (!this.props.online) {
            trackClassName = "track-offline";
            icons.push({
                popup: "This track is currently offline",
                icon: "dont"
            });
        } else {
            buttonToggles.push({
                onClick: this.toggleShortlist,
                popup: "Toggle shortlist status",
                icon: 'heart',
                active: this.props.shortlist
            });
        }

        let numColumns = 2;
        let trackWidth = 10;

        if (this.props.options['sortable']) {
            trackWidth = trackWidth - 1;
            numColumns = numColumns + 1;
        }
        if (this.props.options['showDuration']) {
            trackWidth = trackWidth - 1;
            numColumns = numColumns + 2;
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
                <Table.Cell collapsing>
                    {moment.unix(parseInt(this.props.last_play, 16)).format('llll')}
                </Table.Cell>
                ) : null }
                <Table.Cell collapsing>
                    <Button.Group>
                    {buttons.map((option, i) =>
                        <Popup key={i} trigger={<Button icon={option.icon} onClick={option.onClick} />} content={option.popup} on='hover' />
                    )}
                    {buttonToggles.map((option, i) =>
                        <Popup key={i} trigger={<Button toggle active={option.active} icon={option.icon} onClick={option.onClick} />} content={option.popup} on='hover' />
                    )}
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }

}

export const SortableTrack = SortableElement(Track);
