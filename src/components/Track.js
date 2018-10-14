import React, {Component} from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import disco from '../lib/disco';

const DragHandle = SortableHandle(() => <FontAwesomeIcon icon={["fas", "arrows-alt"]}/>);

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
                    tooltip: "Added!",
                    icon: "check",
                    color: "green"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: "Add to playlist",
                    icon: "plus"
                })
            }
        }

        if (this.props.options['removeFromPlaylist']) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                tooltip: "Remove from playlist",
                icon: "times"
            })
        }

        if (this.props.options['skip']) {
            if (this.state.skipping) {
                buttons.push({
                    tooltip: "Skipping track", //TODO make this a popover?
                    icon: "hourglass-half",
                    spin: true
                })
            } else {
                buttons.push({
                    onClick: this.skipCurrentTrack,
                    tooltip: "Skip this track",
                    icon: "step-forward"
                })
            }
        }

        let trackClassName = "";

        if (!this.props.online) {
            trackClassName = "text-muted font-italic";
            icons.push({
                tooltip: "This track is currently offline",
                icon: "ban"
            });
        }

        return (
            <tr>
                { this.props.options['sortable'] ? (
                <td>
                    <DragHandle />
                </td>
                ) : null }
                <td className={trackClassName}>
                    {icons.map((option, i) =>
                        <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={["fas", option.icon]} data-toggle="tooltip" data-placement="top" title={option.tooltip}/>
                    )}
                    {this.props.artist} - {this.props.title}<br/>
                    <span className="font-italic">{this.props.album_title}</span>
                </td>
                { this.props.options['showDuration'] && <td>{this.props.duration}</td> }
                { this.props.options['showLastPlayed'] && <td>{moment.unix(parseInt(this.props.last_play, 16)).format('MMM D YYYY, H:mm')}</td> }
                <td className="text-right">
                    {buttons.map((option, i) =>
                        <Button 
                            type="button"
                            className={"m-1"} 
                            key={"button" + i + this.props.track_id} 
                            id={"button" + i + this.props.track_id} 
                            onClick={option.onClick}
                            data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips
                            >
                            <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={["fas", option.icon]} spin={option.spin} color={option.color}/>
                        </Button>
                    )}
                    {this.props.online && (
                        <Button 
                            type="button"
                            className={"m-1"} 
                            key={"button_shortlist" + this.props.track_id} 
                            id={"button_shortlist" + this.props.track_id} 
                            onClick={this.toggleShortlist}
                            data-toggle="tooltip" data-placement="top" title="Toggle shortlist status" //TODO use Bootstrap's fancy tooltips
                        >
                            {this.props.shortlist? (
                                <FontAwesomeIcon key={"icon" + this.props.track_id} icon={["fas", "heart"]} color="red"/>
                            ) : (
                                <FontAwesomeIcon key={"icon" + this.props.track_id} icon={["far", "heart"]}/>
                            )}
                        </Button>
                    )}
                </td>
            </tr>
        );
    }

}

export const SortableTrack = SortableElement(Track);
