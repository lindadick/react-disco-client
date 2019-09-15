import React from 'react'
import { Col, Row } from 'reactstrap'

import disco from '../lib/disco'
import TrackList from './TrackList'
import Spinner from './Spinner'

const NUM_TRACKS_TO_SHOW = 20

export default class History extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            history: [],
        }
    }

    componentDidMount() {
        disco.getPlaylistHistory().then((data) =>
            this.setState({
                history: data.reverse(),
            }),
        )
    }

    render() {
        const { history } = this.state
        const historyToDisplay = history ? history.slice(0, NUM_TRACKS_TO_SHOW) : []

        return (
            <Row>
                <Col>
                    <h1>History</h1>
                    {historyToDisplay.length > 0 ? (
                        <>
                            <p className="text-muted small">
                                Displaying the last {historyToDisplay.length} tracks played.
                            </p>
                            <TrackList
                                tracks={historyToDisplay}
                                options={{
                                    sortable: false,
                                    addToPlaylist: true,
                                    showLastPlayed: true,
                                    showDuration: true,
                                    showAlbumLink: true,
                                }}
                            />
                        </>
                    ) : (
                        <Spinner />
                    )}
                </Col>
            </Row>
        )
    }
}
