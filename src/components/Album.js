import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import disco from '../lib/disco';

export default class Album extends Component {

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
                    icon: "check",
                    color: "green"
                })
            } else {
                buttons.push({
                    onClick: this.addToCurrentPlaylist,
                    tooltip: "Add album to playlist",
                    icon: "plus"
                })
            }
        }

        return (
            <tr>
                <td>
                    {this.props.artist}
                </td>
                <td>
                    {this.props.title}
                </td>
                <td>
                    {this.props.duration}
                </td>
                <td>
                    {this.props.track_count}
                </td>
                <td className="text-right">
                    {buttons.map((option, i) =>
                        <React.Fragment>
                            <Button 
                                type="button"
                                key={"button" + i + this.props.album_id} 
                                id={"button" + i + this.props.album_id} 
                                className={"mr-1"} 
                                onClick={option.onClick}
                                data-toggle="tooltip" data-placement="top" title={option.tooltip} //TODO use Bootstrap's fancy tooltips
                            >
                                <FontAwesomeIcon key={"icon" + i + this.props.track_id} icon={["fas", option.icon]} color={option.color} onClick={option.onClick}/>
                            </Button>
                        </React.Fragment>
                    )}
                </td>
            </tr>
        )
    }
}
