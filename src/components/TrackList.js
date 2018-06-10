import { SortableTrack, Track } from './Track'
import React from 'react';
import { Table } from 'semantic-ui-react';
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
        <Table basic compact unstackable striped className="raised">
            <Table.Header>
                <Table.Row>
                    { options['sortable'] ? (
                    <Table.HeaderCell></Table.HeaderCell>
                    ) : null }                   
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    { options['showDuration'] ? (
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    ) : null }
                    { options['showLastPlayed'] ? (
                    <Table.HeaderCell>Last Played</Table.HeaderCell>
                    ) : null }
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            { renderTracks(tracks, options) }
            </Table.Body>
        </Table>
    );

});
