import React from 'react'
import { Col, Row } from 'reactstrap'

import disco from '../lib/disco'
import Playlist from './Playlist'
import Spinner from './Spinner'

export default class Playlists extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allPlaylists: [],
        }
    }

    componentDidMount() {
        disco.getAllPlaylists().then((data) =>
            this.setState({
                allPlaylists: data,
            }),
        )
    }

    render() {
        const rowClassName = 'border-bottom py-1'
        const { allPlaylists } = this.state
        return (
            <Row>
                <Col>
                    <h1>Playlists</h1>
                    {allPlaylists.length > 0 ? (
                        <React.Fragment>
                            {allPlaylists.map((playlist, i) => (
                                <Playlist
                                    key={playlist.id}
                                    index={i}
                                    {...playlist}
                                    rowClassName={rowClassName}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <Spinner />
                    )}
                </Col>
            </Row>
        )
    }
}
