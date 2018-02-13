import React from 'react';
import { Grid } from 'semantic-ui-react';

export const Playlist = (({
    title, 
    options}) => 
    <Grid.Row columns={2}>
        <Grid.Column>
            {title}
        </Grid.Column>
        <Grid.Column>
            {options}
        </Grid.Column>
    </Grid.Row>
    );

