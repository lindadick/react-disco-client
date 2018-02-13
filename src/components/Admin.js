import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import disco from '../lib/disco'

export default class Admin extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as="h1">Admin</Header>
                        <p>Still to do, will include:</p>
                        <ul>
                            <li>Change playing mode</li>
                            <li>Set mood</li>
                        </ul>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
  