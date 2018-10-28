import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons/faCompactDisc'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons/faHourglassHalf'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons/faHeart'
import { Col, Row } from 'reactstrap';

import disco from '../lib/disco';

const DragHandle = SortableHandle(() => <FontAwesomeIcon icon={faArrowsAlt}/>);

export class Track extends React.Component {

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
                    icon: faCheck,
                    color: "green"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: "Add to playlist",
                    icon: faPlus
                })
            }
        }

        if (this.props.options['removeFromPlaylist']) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                tooltip: "Remove from playlist",
                icon: faTimes
            })
        }

        if (this.props.options['skip']) {
            if (this.state.skipping) {
                buttons.push({
                    tooltip: "Skipping track", //TODO make this a popover?
                    icon: faHourglassHalf,
                    spin: true
                })
            } else {
                buttons.push({
                    onClick: this.skipCurrentTrack,
                    tooltip: "Skip this track",
                    icon: faStepForward
                })
            }
        }

        let trackClassName = "";

        if (!this.props.online) {
            trackClassName = "text-muted";
            icons.push({
                tooltip: "This track is currently offline",
                icon: faBan
            });
        }

        return (
            <Row className={this.props.rowClassName}>
                { this.props.options['sortable'] ? (
                <Col xs="auto">
                    <DragHandle />
                </Col>
                ) : null }
                { this.props.options['showLastPlayed'] && <Col xs="auto">{moment.unix(parseInt(this.props.last_play, 16)).format('H:mm')}</Col> }
                <Col className={trackClassName}>
                    {icons.map((option, i) =>
                        <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={option.icon} data-toggle="tooltip" data-placement="top" title={option.tooltip}/>
                    )} {this.props.artist} - {this.props.title}<br/>
                    <span className="font-italic text-muted">
                        <FontAwesomeIcon className="mr-1" key={"duration" + this.props.track_id} icon={faCompactDisc} data-toggle="tooltip" data-placement="top" title="Album"/>
                        {this.props.album_title}
                        { this.props.options['showDuration'] && (
                            <React.Fragment>
                                <br/>
                                <FontAwesomeIcon className="mr-1" key={"duration" + this.props.track_id} icon={faClock} data-toggle="tooltip" data-placement="top" title="Track duration"/>
                                {this.props.duration}
                            </React.Fragment>
                        ) }
                    </span>
                </Col>
                <Col xs="3" lg="2" className="ml-auto">
                    <Row noGutters>
                        {buttons.map((option, i) =>
                        <Col key={"buttoncol" + i + this.props.track_id} className="p-1">
                            <Button 
                                type="button"
                                className={"btn-block m-1"} 
                                key={"button" + i + this.props.track_id} 
                                id={"button" + i + this.props.track_id} 
                                onClick={option.onClick}
                                data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips
                                >
                                <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={option.icon} spin={option.spin} color={option.color}/>
                            </Button>
                        </Col>
                        )}
                        {this.props.online && (
                        <Col className="p-1">
                            <Button 
                                type="button"
                                className={"btn-block m-1"} 
                                key={"button_shortlist" + this.props.track_id} 
                                id={"button_shortlist" + this.props.track_id} 
                                onClick={this.toggleShortlist}
                                data-toggle="tooltip" data-placement="top" title="Toggle shortlist status" //TODO use Bootstrap's fancy tooltips
                            >
                                {this.props.shortlist? (
                                    <FontAwesomeIcon key={"icon" + this.props.track_id} icon={faHeartSolid} color="red"/>
                                ) : (
                                    <FontAwesomeIcon key={"icon" + this.props.track_id} icon={faHeartRegular}/>
                                )}
                            </Button>
                        </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        );
    }

}

export const SortableTrack = SortableElement(Track);
