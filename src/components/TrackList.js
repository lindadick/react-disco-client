import { SortableTrack, Track } from './Track'
import React from 'react';
import { Table } from 'reactstrap';
import { SortableContainer } from 'react-sortable-hoc';

function renderTracks(tracks, options) {
    if (options['sortable']) {
        return (
            tracks.map((track, i) =>
                <SortableTrack key={track.album_id + `-` + track.track_id} options={options} index={i} {...track}/>	
            )
        );
    } else {
        return (
            tracks.map((track, i) =>
                <Track key={track.album_id + `-` + track.track_id} options={options} index={i} {...track}/>	
            )
        )
    }
}

export const TrackList = SortableContainer(({tracks, options}) => {

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    { options['sortable'] ? (
                    <th></th>
                    ) : null }                   
                    <th>Title</th>
                    <th className="disco-hide-sm">Duration</th>
                    { options['showLastPlayed'] ? (
                    <th>Last Played</th>
                    ) : null }
                    <th className="text-right">
                        <span className="disco-hide-sm">Options</span>
                    </th>
                </tr>
            </thead>
            <tbody>
            { renderTracks(tracks, options) }
            </tbody>
        </Table>
    );

});
