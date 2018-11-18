import Track from './Track'
import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

export default class TrackList extends React.Component {
    render() {
        const rowClassName="border-bottom py-1";
        if (this.props.options.sortable) {
            return (
                <Container lockAxis="y" onDrop={this.props.onSortEnd}>
                    {this.props.tracks.map((track, i) =>
                        <Draggable key={i}>
                            <Track key={track.album_id + `-` + track.track_id} options={this.props.options} index={i} {...track} rowClassName={rowClassName}/>	
                        </Draggable>
                    )}
                </Container>
            );    
        } else {
            return (
                this.props.tracks.map((track, i) =>
                    <Track key={track.album_id + `-` + track.track_id} options={this.props.options} index={i} {...track} rowClassName={rowClassName}/>	
                )
            )
        }
    }
}