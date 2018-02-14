import React, {Component} from 'react';
import disco from '../lib/disco';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Button, Grid, Icon, Popup } from 'semantic-ui-react';

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
            <Grid.Row columns={numColumns}>
                { this.props.options['sortable'] ? (
                <Grid.Column width={1}>
                    <DragHandle />
                </Grid.Column>
                ) : null }
                <Grid.Column width={trackWidth} className={trackClassName}>
                    {icons.map((option, i) =>
                        <Popup key={i} trigger={<Icon name={option.icon} />} content={option.popup} on='hover' />
                    )}
                    {this.props.artist} - {this.props.title}<br/>
                    <span className="track-album-title">{this.props.album_title}</span>
                </Grid.Column>
                { this.props.options['showDuration'] ? (
                <Grid.Column width={2}>
                    {this.props.duration}
                </Grid.Column>
                ) : null }
                <Grid.Column width={5} floated="right" textAlign="right">
                    <Button.Group>
                    {buttons.map((option, i) =>
                        <Popup key={i} trigger={<Button icon={option.icon} onClick={option.onClick} />} content={option.popup} on='hover' />
                    )}
                    {buttonToggles.map((option, i) =>
                        <Popup key={i} trigger={<Button toggle active={option.active} icon={option.icon} onClick={option.onClick} />} content={option.popup} on='hover' />
                    )}
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        );
    }

}

export const SortableTrack = SortableElement(Track);
