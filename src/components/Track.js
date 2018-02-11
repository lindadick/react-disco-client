import React, {Component} from 'react';
import disco from '../lib/disco';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Button, Grid, Icon, Popup } from 'semantic-ui-react';

const DragHandle = SortableHandle(() => <Icon name="move" label="Reorder Tracks" />);

export class Track extends Component {

    constructor(props) {
        super(props);
        
        // Store shortlist value as state, so it can be changed.
        this.state = {
            shortlist: false
        };

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
        if (!this.state.shortlist) {
            // TODO wait for result before changing toggle?
            disco.addTrackToShortlist(this.props.album_id, this.props.track_id);
            this.state.shortlist = true;
        } else {
            disco.removeTrackFromShortlist(this.props.album_id, this.props.track_id);
            this.state.shortlist = false;
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

        if (!this.props.online) {
            icons.push({
                popup: "This track is currently offline",
                icon: "dont"
            });
        } else {
            this.state.shortlist = this.props.shortlist;
            buttonToggles.push({
                onClick: this.toggleShortlist,
                popup: "Toggle shortlist status",
                icon: 'heart',
                active: this.state.shortlist
            });
        }

        let numOptions = buttons.length + icons.length + buttonToggles.length;
        let numColumns = 2;

        let optionsWidth = numOptions; // TODO figure out why this needs to be larger to accommodate phones
        let trackWidth = 16 - optionsWidth;

        if (this.props.options['sortable']) {
            trackWidth = trackWidth - 2;
            numColumns = 3;
        }

        return (
            <Grid.Row columns={numColumns}>
                { this.props.options['sortable'] ? (
                <Grid.Column width={1}>
                    <DragHandle />
                </Grid.Column>
                ) : null }
                <Grid.Column width={trackWidth}>
                    {this.props.title}<br/>
                    {this.props.artist}<br/>
                    {this.props.album_title}
                </Grid.Column>
                <Grid.Column width={optionsWidth} floated="right">
                    {icons.map((option, i) =>
                        <Popup key={i} trigger={<Icon name={option.icon} />} content={option.popup} on='hover' />
                    )}
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
