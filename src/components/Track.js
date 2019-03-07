import React from 'react';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons/faCompactDisc'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons/faHourglassHalf'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons/faHeart'
import { Button, Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Row } from 'reactstrap';

import disco from '../lib/disco';

export default class Track extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            added: false,
            skipping: false,
            menuOpen: false
        }

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
        this.removeFromCurrentPlaylist = this.removeFromCurrentPlaylist.bind(this);
        this.showAlbumDetails = this.showAlbumDetails.bind(this);
        this.skipCurrentTrack = this.skipCurrentTrack.bind(this);
        this.addToShortlist = this.addToShortlist.bind(this);
        this.removeFromShortlist = this.removeFromShortlist.bind(this);
        this.addToBanList = this.addToBanList.bind(this);
        this.removeFromBanList = this.removeFromBanList.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    addToCurrentPlaylist() {
        if (this.props.online) {
            disco.addTrackToCurrentPlaylist(this.props.album_id, this.props.track_id)
                .then(data => this.setState({ 
                    added: (data.status === 200)
                }));
        }
    }
    
    removeFromCurrentPlaylist() {
        disco.removeTrackFromCurrentPlaylist(this.props.album_id, this.props.track_id);
    }

    addToShortlist() {
        if (confirm("Add this track to shortlist?")) {
            //TODO use Reactstrap modal instead
            disco.addTrackToShortlist(this.props.album_id, this.props.track_id);
        }
    }
    
    removeFromShortlist(e) {
        if (confirm("Remove this track from shortlist?")) {
            //TODO use Reactstrap modal instead
            disco.removeTrackFromShortlist(this.props.album_id, this.props.track_id);
        }
    }

    addToBanList() {
        if (confirm("Remove this track from normal selection?")) {
            //TODO use Reactstrap modal instead
            disco.addTrackToBanList(this.props.album_id, this.props.track_id);
        }
    }

    removeFromBanList() {
        if (confirm("Add this track to normal selection?")) {
            //TODO use Reactstrap modal instead
            disco.removeTrackFromBanList(this.props.album_id, this.props.track_id);
        }
    }

    toggleMenu() {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    skipCurrentTrack() {
        disco.skipToNextTrack()
        .then(data => this.setState({ //TODO what to do when data is null?
            skipping: (data.status === 200)
        }));
    }

    showAlbumDetails() {
        this.setState({redirectToAlbumDetails: true});
    }

    render() {
        if (this.state.redirectToAlbumDetails) {
            return <Redirect push to={"/albumdetails/" + this.props.album_id} />;
        }

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
                    tooltip: "Skipping track", //TODO make this an alert
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

        if (this.props.online) {
            if (this.props.shortlist) {
                buttons.push({
                    onClick: this.removeFromShortlist,
                    tooltip: "Remove from shortlist",
                    icon: faHeartRegular
                });
                icons.push({
                    icon: faHeartSolid
                });
            } else if (this.props.banned) {
                buttons.push({
                    onClick: this.removeFromBanList,
                    tooltip: "Add to normal selection",
                    icon: faHeartRegular
                });
                icons.push({
                    icon: faHeartBroken
                });
            } else {
                buttons.push({
                    onClick: this.addToShortlist,
                    tooltip: "Add to shortlist",
                    icon: faHeartSolid
                });
                buttons.push({
                    onClick: this.addToBanList,
                    tooltip: "Remove from normal selection",
                    icon: faHeartBroken
                });
                icons.push({
                    icon: faHeartRegular
                });
            }
        } else {
            trackClassName = "text-muted";
            icons.push({
                tooltip: "This track is currently offline",
                icon: faBan
            });
        }

        if (this.props.options['showAlbumLink'] && !this.props.widgetView) {
            buttons.push({
                onClick: this.showAlbumDetails,
                tooltip: "View album",
                icon: faCompactDisc
            })
        }

        let duration = "";
        if (this.props.options['showDuration']) {
            duration = moment(this.props.duration, "mm:ss").format("m:ss");
            if (duration === "Invalid date") {
                // Moment doesn't like durations with more than 59 minutes.
                // Fall back to raw value.
                duration = this.props.duration;
            }    
        }

        let mediumButtonClassNames = "d-none d-md-block ml-auto";
        let smallButtonClassNames = "d-block d-md-none ml-auto";
        if (this.props.widgetView) {
            mediumButtonClassNames = "d-block mx-auto mt-2";
        }

        return (
            <Row className={this.props.rowClassName}>
                { this.props.options['sortable'] ? (
                    <Col xs="auto">
                        <FontAwesomeIcon icon={faSort}/>
                    </Col>
                ) : null }
                { this.props.options['showLastPlayed'] && <Col xs="auto">{moment.unix(parseInt(this.props.last_play, 16)).format('H:mm')}</Col> }
                <Col className={trackClassName}>
                    {this.props.artist} - {this.props.title}<br/>
                    <ul className="list-inline font-italic text-muted">
                        {icons.map((option, i) =>
                            <li className="list-inline-item">
                            <FontAwesomeIcon key={"icon" + i + this.props.track_id} color={option.color} icon={option.icon} data-toggle="tooltip" data-placement="top" title={option.tooltip}/>
                            </li>
                        )} 
                        <li className="list-inline-item">
                            {this.props.album_title}
                        </li>
                        { this.props.options['showDuration'] && (
                            <li className="list-inline-item">
                                {duration}
                            </li>
                        ) }
                    </ul>
                </Col>
                <Col className={mediumButtonClassNames} md="auto">
                    {/* Buttons for medium-sized screens */}
                    <Row noGutters>
                        {buttons.map((option, i) =>
                        <Col key={"buttoncol" + i + this.props.track_id} className="p-1">
                            <Button 
                                type="button"
                                className={"btn-block m-1"} 
                                key={"button" + i + this.props.track_id} 
                                id={"button" + i + this.props.track_id} 
                                onClick={option.onClick}
                                data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips?
                                >
                                <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={option.icon} spin={option.spin} color={option.color}/>
                            </Button>
                        </Col>
                        )}
                    </Row>
                </Col>
                { !this.props.widgetView && (
                    <Col className={smallButtonClassNames} xs="auto">
                        {/* Menu for small screens */}
                        <Dropdown isOpen={this.state.menuOpen} toggle={this.toggleMenu} direction="left">
                            <DropdownToggle className="btn-link border-0">
                                <FontAwesomeIcon icon={faEllipsisV}/>
                            </DropdownToggle>
                            <DropdownMenu>
                                {buttons.map((option, i) =>
                                    <DropdownItem
                                        key={"button" + i + this.props.track_id} 
                                        id={"button" + i + this.props.track_id} 
                                        onClick={option.onClick}
                                        className="wrap-text"
                                    >
                                        {option.tooltip}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                ) }
            </Row>
        );
    }

}
