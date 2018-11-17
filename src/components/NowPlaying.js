import React from 'react';
import { Container } from 'reactstrap';

import { Track } from './Track';
import Spinner from './Spinner';

export default class NowPlaying extends React.Component {
    constructor(props) {
        super(props);

        this.updateTitle = this.props.updateTitle.bind(this);
    }

    onError(error){
        console.log(error)
    }

    render() {
        this.updateTitle(this.props.currentTrack, this.props.appName);

        let trackOptions = {
            addToPlaylist: false,
            sortable: false,
            skip: true,
            showDuration: true,
            showAlbumLink: true
        };

        return (
            <div className="disco-highlight border-top border-bottom py-2 mb-2">
                <Container>
                    { this.props.currentTrack ? (                   
                        <Track key={this.props.currentTrack.album_id + `-` + this.props.currentTrack.track_id} options={trackOptions} index={0} {...this.props.currentTrack}/>	
                    ): (
                        <Spinner />
                    ) }
                </Container>
            </div>
        );
    }
}