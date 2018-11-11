import { SortableTrack, Track } from './Track'
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

export class TrackList extends React.Component {
    render() {
        let rowClassName="border-bottom py-1";
        return (
            this.props.tracks.map((track, i) =>
                <Track key={track.album_id + `-` + track.track_id} options={this.props.options} index={i} {...track} rowClassName={rowClassName}/>	
            )
        )
    }
}

export const SortableTrackList = SortableContainer(({tracks, options}) => {
    let rowClassName="border-bottom py-1";
    return (
        tracks.map((track, i) =>
            <SortableTrack key={track.album_id + `-` + track.track_id} options={options} index={i} {...track} rowClassName={rowClassName}/>	
        )
    );
});
