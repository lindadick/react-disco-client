import { SortableTrack } from './Track'
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SortableContainer } from 'react-sortable-hoc';

export const TrackList = SortableContainer(({tracks, options}) => {
    return (
        <Grid divided="vertically">
            {tracks.map((track, i) =>
                <SortableTrack key={`item-${i}`} options={options} index={i} {...track}/>	
                )}
        </Grid>
    );
});
