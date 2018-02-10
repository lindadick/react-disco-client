import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Current from './Current';
import TrackSearch from './TrackSearch';
import AlbumSearch from './AlbumSearch';
import Playlists from './Playlists';
import History from './History';
import Admin from './Admin';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header size="huge">Robinet Disco</Header>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#/search">Tracks</a></li>
          <li><a href="#/albums">Albums</a></li>
          <li><a href="#/playlists">Playlists</a></li>
          <li><a href="#/history">History</a></li>
          <li><a href="#/admin">Admin</a></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Current} />
          <Route path="/search" component={TrackSearch} />
          <Route path="/albums" component={AlbumSearch} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/history" component={History} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}

export default App;
