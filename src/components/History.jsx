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
            history: undefined,
            retrievingHistory: true,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshHistory(), 10000)
        this.refreshHistory()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshHistory = () => {
        this.setState({ retrievingHistory: true }, () =>
            disco.getPlaylistHistory().then((data) =>
                this.setState({
                    history: data.reverse(),
                    retrievingHistory: false,
                }),
            ),
        )
    }

    render() {
        const { history, retrievingHistory } = this.state
        const historyToDisplay = history ? history.slice(0, NUM_TRACKS_TO_SHOW) : 0
        return (
            <Row>
                <Col>
                    <h1>History</h1>
                    {!history && retrievingHistory ? (
                        <Spinner />
                    ) : (
                        <>
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
                                <p>The playlist history for today is currently empty.</p>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        )
    }
}
