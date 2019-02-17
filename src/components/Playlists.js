import React from 'react';
import { Col, Row } from 'reactstrap';

import disco from '../lib/disco';
import Playlist from './Playlist'
import Spinner from './Spinner';

export default class Playlists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allPlaylists: []
        }
    }

    onError(error){
        console.log(error);
    }

    componentDidMount() {
        disco.getAllPlaylists()
        .then(data => this.setState({ 
            allPlaylists: data
        }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const rowClassName="border-bottom py-1";
        return (
            <Row>
                <Col>
                    <h1>Playlists</h1>
                    { this.state.allPlaylists.length > 0 ? (      
                        <React.Fragment>
                            {this.state.allPlaylists.map((playlist, i) =>
                                <Playlist key={`item-${i}`} index={i} {...playlist} rowClassName={rowClassName} />	
                            )}
                        </React.Fragment>             
                    ): (
                        <Spinner />
                    ) }
                </Col>
            </Row>
        );
    }
}
