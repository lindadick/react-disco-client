import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'

import disco from '../lib/disco';

export default class Album extends React.Component {

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
                    tooltip: "Added!",
                    icon: faCheck,
                    color: "green"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: "Add album to playlist",
                    icon: faPlus
                })
            }
        }

        return (
            <Row className={this.props.rowClassName}>
                <Col xs="auto">
                    {this.props.artist} - {this.props.title}
                    <ul className="list-inline font-italic text-muted">
                        <li className="list-inline-item">
                            {this.props.duration}
                        </li>
                        <li className="list-inline-item">
                            {this.props.track_count} tracks
                        </li>
                    </ul>
                </Col>
                <Col xs="auto" md="2" className="ml-auto">
                    <Row noGutters>
                        {buttons.map((option, i) =>
                        <Col key={"buttoncol" + i + this.props.album_id}>
                            <Button 
                                type="button"
                                className={"btn-block"} 
                                key={"button" + i + this.props.album_id} 
                                id={"button" + i + this.props.album_id} 
                                onClick={option.onClick}
                                data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips
                                >
                                <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={option.icon} color={option.color} onClick={option.onClick}/>
                            </Button>
                        </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        )
    }
}
