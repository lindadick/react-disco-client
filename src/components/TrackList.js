import { SortableTrack, Track } from './Track'
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

export const TrackList = SortableContainer(({tracks, options}) => {
    let rowClassName="border-bottom py-1";

    if (options['sortable']) {
        return (
            tracks.map((track, i) =>
                <SortableTrack key={track.album_id + `-` + track.track_id} options={options} index={i} {...track} rowClassName={rowClassName}/>	
            )
        );
    } else {
        return (
            tracks.map((track, i) =>
                <Track key={track.album_id + `-` + track.track_id} options={options} index={i} {...track} rowClassName={rowClassName}/>	
            )
        )
    }
});
