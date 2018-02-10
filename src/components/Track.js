import React, {Component} from 'react';
import disco from '../lib/disco';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import { Button, Grid, Icon } from 'semantic-ui-react';

const DragHandle = SortableHandle(() => <Icon name="move" label="Reorder Tracks" />);

export class Track extends Component {

    constructor(props) {
        super(props);
        
        // Store shortlist value as state, so it can be changed.
        this.state = {
            status: this.props.status
        };

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
        this.removeFromShortlist = this.removeFromShortlist.bind(this);
        this.toggleShortlist = this.toggleShortlist.bind(this);
        this.addToShortlist = this.addToShortlist.bind(this);
        this.removeFromCurrentPlaylist = this.removeFromCurrentPlaylist.bind(this);
    }

    addToCurrentPlaylist() {
        if (this.props.online) {
            disco.addTrackToCurrentPlaylist(this.props.album_id, this.props.track_id);
        }
    }
    
    removeFromCurrentPlaylist() {
        console.log(this.props);
        disco.removeTrackFromCurrentPlaylist(this.props.album_id, this.props.track_id);
    }

    addToShortlist() {
        disco.addTrackToShortlist(this.props.album_id, this.props.track_id);
        this.state.status = 'S';
    }

    removeFromShortlist() {
        disco.removeTrackFromShortlist(this.props.album_id, this.props.track_id);
        this.state.status = '-';
    }

    toggleShortlist() {
        if (this.state.status == '-') {
            disco.addTrackToShortlist(this.props.album_id, this.props.track_id);
            this.state.status = 'S';                
        } else {
            disco.removeTrackFromShortlist(this.props.album_id, this.props.track_id);
            this.state.status = '-';
        }
    }
    
    next() {
        disco.skipToNextTrack();
    }
      
    render() {

        // Build menu options
        let buttons = [];
        let icons = [];
        let iconToggles = [];

        if (this.props.options['addToPlaylist'] && this.props.online) {
            buttons.push({
                onClick: this.addToCurrentPlaylist,
                label: "Add to playlist",
                icon: "add"
            })
        }

        if (this.props.options['removeFromPlaylist']) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                label: "Remove from playlist",
                icon: "delete"
            })
        }

        if (!this.props.online) {
            icons.push({
                label: "Track is currently offline",
                icon: "dont"
            });
        } else {
            iconToggles.push({
                onChange: this.toggleShortlist,
                icon: 'heart',
                active: this.state.status == 'S'
            });
        }

        if (this.props.displayInTable) {
            let numOptions = buttons.length + icons.length + iconToggles.length;

            let phoneSpan = 4 - numOptions;
            let tabletSpan = 7 - numOptions;
            let desktopSpan = 12 - numOptions;

            if (this.props.options['sortable']) {
                phoneSpan--;
                tabletSpan--;
                desktopSpan--;
            }

            return (
                <Grid.Row columns={3}>
                    { this.props.options['sortable'] ? (
                    <Grid.Column>
                        <DragHandle />
                    </Grid.Column>
                    ) : null }
                    <Grid.Column>
                        {this.props.title}<br/>
                        {this.props.artist}<br/>
                        {this.props.album_title}
                    </Grid.Column>
                    <Grid.Column>
                        {buttons.map((option, i) =>
                            <Button key={i} onClick={option.onClick} icon={option.icon} />	
                        )}
                        {icons.map((option, i) =>
                            <Icon key={i} label={option.label} name={option.icon} />	
                        )}
                        {iconToggles.map((option, i) =>
                            <Button toggle active={option.active} key={i} onClick={option.onChange} icon={option.icon} />
                        )}
                    </Grid.Column>
                </Grid.Row>
            )
        } else {
            return ( 
                <span>
                    <span>{this.props.artist}</span> - <span>{this.props.title}</span>
                    <span> <em>(from the album '{this.props.album_title}')</em></span>
                </span>
            );
        }
    }
}

Track.defaultProps = {
    displayInTable: true
};

export const SortableTrack = SortableElement(Track);
