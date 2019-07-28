import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { Button, Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Row } from 'reactstrap'
import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-unresolved
import { ART_URL } from 'discoConfig'
import disco from '../lib/disco'
import AlbumArt from './AlbumArt'

export default class Track extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            added: false,
            menuOpen: false,
            skipping: false,
        }
    }

    addToCurrentPlaylist = () => {
        const { online, album_id, track_id } = this.props
        if (online) {
            disco.addTrackToCurrentPlaylist(album_id, track_id).then((data) =>
                this.setState({
                    added: data.status === 200,
                }),
            )
        }
    }

    removeFromCurrentPlaylist = () => {
        const { album_id, track_id } = this.props
        disco.removeTrackFromCurrentPlaylist(album_id, track_id)
    }

    addToShortlist = () => {
        const { album_id, track_id } = this.props
        // eslint-disable-next-line no-restricted-globals,no-alert
        if (confirm('Add this track to shortlist?')) {
            // TODO use Reactstrap modal instead
            disco.addTrackToShortlist(album_id, track_id)
        }
    }

    removeFromShortlist = () => {
        const { album_id, track_id } = this.props
        // eslint-disable-next-line no-restricted-globals,no-alert
        if (confirm('Remove this track from shortlist?')) {
            // TODO use Reactstrap modal instead
            disco.removeTrackFromShortlist(album_id, track_id)
        }
    }

    addToBanList = () => {
        const { album_id, track_id } = this.props
        // eslint-disable-next-line no-restricted-globals,no-alert
        if (confirm('Remove this track from normal selection?')) {
            // TODO use Reactstrap modal instead
            disco.addTrackToBanList(album_id, track_id)
        }
    }

    removeFromBanList = () => {
        const { album_id, track_id } = this.props
        // eslint-disable-next-line no-restricted-globals,no-alert
        if (confirm('Add this track to normal selection?')) {
            // TODO use Reactstrap modal instead
            disco.removeTrackFromBanList(album_id, track_id)
        }
    }

    toggleMenu = () => {
        const { menuOpen } = this.state
        this.setState({ menuOpen: !menuOpen })
    }

    skipCurrentTrack = () => {
        disco.skipToNextTrack().then((data) =>
            this.setState({
                // TODO what to do when data is null?
                skipping: data.status === 200,
            }),
        )
    }

    render() {
        // Build menu options
        const buttons = []
        const icons = []
        const {
            album_id,
            album_title,
            artist,
            banned,
            duration,
            last_play,
            options,
            online,
            shortlist,
            rowClassName,
            track_id,
            title,
            widgetView,
        } = this.props
        const { added, menuOpen, skipping } = this.state

        if (options.addToPlaylist && online) {
            if (added) {
                buttons.push({
                    tooltip: 'Added!',
                    icon: faCheck,
                    color: 'green',
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: 'Add to playlist',
                    icon: faPlus,
                })
            }
        }

        if (options.removeFromPlaylist) {
            buttons.push({
                onClick: this.removeFromCurrentPlaylist,
                tooltip: 'Remove from playlist',
                icon: faTimes,
            })
        }

        if (options.skip) {
            if (skipping) {
                buttons.push({
                    tooltip: 'Skipping track', // TODO make this an alert
                    icon: faHourglassHalf,
                    spin: true,
                })
            } else {
                buttons.push({
                    onClick: this.skipCurrentTrack,
                    tooltip: 'Skip this track',
                    icon: faStepForward,
                })
            }
        }

        let trackClassName = ''

        if (online) {
            if (shortlist) {
                buttons.push({
                    onClick: this.removeFromShortlist,
                    tooltip: 'Remove from shortlist',
                    icon: faHeartRegular,
                })
                icons.push({
                    icon: faHeartSolid,
                })
            } else if (banned) {
                buttons.push({
                    onClick: this.removeFromBanList,
                    tooltip: 'Add to normal selection',
                    icon: faHeartRegular,
                })
                icons.push({
                    icon: faHeartBroken,
                })
            } else {
                buttons.push({
                    onClick: this.addToShortlist,
                    tooltip: 'Add to shortlist',
                    icon: faHeartSolid,
                })
                buttons.push({
                    onClick: this.addToBanList,
                    tooltip: 'Remove from normal selection',
                    icon: faHeartBroken,
                })
                icons.push({
                    icon: faHeartRegular,
                })
            }
        } else {
            trackClassName = 'text-muted'
            icons.push({
                tooltip: 'This track is currently offline',
                icon: faBan,
            })
        }

        let formattedDuration = ''
        if (options.showDuration) {
            formattedDuration = moment(duration, 'mm:ss').format('m:ss')
            if (formattedDuration === 'Invalid date') {
                // Moment doesn't like durations with more than 59 minutes.
                // Fall back to raw value.
                formattedDuration = duration
            }
        }

        let mediumButtonClassNames = 'd-none d-md-block ml-auto'
        const smallButtonClassNames = 'd-block d-md-none ml-auto'
        if (widgetView) {
            mediumButtonClassNames = 'd-block mx-auto mt-2'
        }

        return (
            <Row className={`no-gutters ${rowClassName}`}>
                {options.sortable && (
                    <Col xs="auto" className="pr-2">
                        <FontAwesomeIcon icon={faSort} />
                    </Col>
                )}
                {options.showLastPlayed && (
                    <Col xs="auto" className="pr-2">
                        {moment.unix(parseInt(last_play, 16)).format('H:mm')}
                    </Col>
                )}
                {ART_URL && (
                    <Col xs="2" sm="1" className="pr-2">
                        <AlbumArt
                            id={album_id}
                            linkToAlbum={options.showAlbumLink && !widgetView}
                        />
                    </Col>
                )}
                <Col className={`pr-2 ${trackClassName}`}>
                    {artist} - {title}
                    <ul className="list-inline font-italic text-muted">
                        {icons.map((option) => (
                            <li className="list-inline-item">
                                <FontAwesomeIcon
                                    key={`icon${track_id}`}
                                    color={option.color}
                                    icon={option.icon}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={option.tooltip}
                                />
                            </li>
                        ))}
                        <li className="list-inline-item">{album_title}</li>
                        {options.showDuration && <li className="list-inline-item">{duration}</li>}
                    </ul>
                </Col>
                <Col className={mediumButtonClassNames} md="auto">
                    {/* Buttons for medium-sized screens */}
                    <Row noGutters>
                        {buttons.map((option) => (
                            <Col key={`buttoncol${track_id}`} className="p-1">
                                <Button
                                    type="button"
                                    className="btn-block m-1"
                                    key={`button${track_id}`}
                                    id={`button${track_id}`}
                                    onClick={option.onClick}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={option.tooltip} // TODO use Bootstrap's fancy tooltips?
                                >
                                    <FontAwesomeIcon
                                        key={`icon${track_id}`}
                                        icon={option.icon}
                                        spin={option.spin}
                                        color={option.color}
                                    />
                                </Button>
                            </Col>
                        ))}
                        {options.showAlbumLink && !widgetView && (
                            <Col key={`album_details${track_id}`} className="p-1">
                                <Link
                                    to={`/albumdetails/${album_id}`}
                                    className="btn btn-secondary btn-block m-1"
                                    title="View album details"
                                >
                                    <FontAwesomeIcon icon={faCompactDisc} />
                                </Link>
                            </Col>
                        )}
                    </Row>
                </Col>
                {!widgetView && (
                    <Col className={smallButtonClassNames} xs="1">
                        {/* Menu for small screens */}
                        <Dropdown isOpen={menuOpen} toggle={this.toggleMenu} direction="left">
                            <DropdownToggle className="btn-link border-0">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </DropdownToggle>
                            <DropdownMenu>
                                {buttons.map((option) => (
                                    <DropdownItem
                                        key={`button${track_id}`}
                                        id={`button${track_id}`}
                                        onClick={option.onClick}
                                        className="wrap-text"
                                    >
                                        {option.tooltip}
                                    </DropdownItem>
                                ))}
                                {options.showAlbumLink && !widgetView && (
                                    <DropdownItem
                                        key={`album_details${track_id}`}
                                        className="wrap-text"
                                        href={`#/albumdetails/${album_id}`}
                                    >
                                        View album details
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                )}
            </Row>
        )
    }
}

Track.propTypes = {
    album_id: PropTypes.string.isRequired,
    album_title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    banned: PropTypes.bool,
    duration: PropTypes.string.isRequired,
    last_play: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    options: PropTypes.objectOf(String).isRequired,
    rowClassName: PropTypes.string.isRequired,
    shortlist: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    track_id: PropTypes.string.isRequired,
    widgetView: PropTypes.bool,
}

Track.defaultProps = {
    banned: false,
    widgetView: false,
}
