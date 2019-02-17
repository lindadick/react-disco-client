import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'

import disco from '../lib/disco';

export default class Playlist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            added: false
        }

        this.addToCurrentPlaylist = this.addToCurrentPlaylist.bind(this);
    }

    addToCurrentPlaylist() {
        this.setState({
            added: disco.addPlaylistToCurrentPlaylist(this.props.name)
        });
    }

    render() {
        // Build menu options
        let buttons = [];

        if (this.state.added) {
            buttons.push({
                tooltip: "Added!",
                icon: faCheck,
                color: "green"
            })
        } else {
            buttons.push({
                onClick: this.addToCurrentPlaylist,
                tooltip: "Add playlist to playlist",
                icon: faPlus
            })
        }

        return (
            <Row className={this.props.rowClassName}>
                <Col xs="auto">
                    {this.props.name}
                </Col>
                <Col xs="auto" md="2" className="ml-auto">
                    <Row noGutters>
                        {buttons.map((option, i) =>
                        <Col key={"buttoncol" + i + this.props.id}>
                            <Button 
                                type="button"
                                className={"btn-block"} 
                                key={"button" + i + this.props.id} 
                                id={"button" + i + this.props.id} 
                                onClick={option.onClick}
                                data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips
                                >
                                <FontAwesomeIcon key={"icon" + i + this.props.id} icon={option.icon} color={option.color} onClick={option.onClick}/>
                            </Button>
                        </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        )
    }
}
