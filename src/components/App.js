import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Menu, Header } from 'semantic-ui-react'

import Current from './Current';
import TrackSearch from './TrackSearch';
import AlbumSearch from './AlbumSearch';
import Playlists from './Playlists';
import History from './History';
import Admin from './Admin';

class AppMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable inverted>
        <Menu.Item href='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>Now Playing</Menu.Item>
        <Menu.Item href='#/search' name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>Tracks</Menu.Item>
        <Menu.Item href='#/albums' name='albums' active={activeItem === 'albums'} onClick={this.handleItemClick}>Albums</Menu.Item>
        {/* <Menu.Item href='#/playlists' name='playlists' active={activeItem === 'playlists'} onClick={this.handleItemClick}>Playlists</Menu.Item> */}
        {/* <Menu.Item href='#/history' name='history' active={activeItem === 'history'} onClick={this.handleItemClick}>History</Menu.Item> */}
        {/* <Menu.Item href='#/admin' name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick}>Admin</Menu.Item> */}
      </Menu>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header size="huge">Robinet Disco</Header>

        <AppMenu/>

        <Switch>
          <Route exact path="/" component={Current} />
          <Route path="/search" component={TrackSearch} />
          <Route path="/albums" component={AlbumSearch} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/history" component={History} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Container>
    );
  }
}