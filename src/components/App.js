import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Button, Container, Grid, Icon, Menu, Header, Responsive, Segment, Sidebar } from 'semantic-ui-react'

import disco from '../lib/disco';

import TrackSearch from './TrackSearch';
import AlbumSearch from './AlbumSearch';
import History from './History';
import NowPlaying from './NowPlaying';
import UpcomingPlaylist from './UpcomingPlaylist';

class AppMenu extends Component {
    state = { }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });        
        if (this.props.onClickMethod != null) {
            this.props.onClickMethod();
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu {...this.props}>
                <Menu.Item href='#/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>Current Playlist</Menu.Item>
                <Menu.Item href='#/search' name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>Tracks</Menu.Item>
                <Menu.Item href='#/albums' name='albums' active={activeItem === 'albums'} onClick={this.handleItemClick}>Albums</Menu.Item>
                <Menu.Item href='#/history' name='history' active={activeItem === 'history'} onClick={this.handleItemClick}>History</Menu.Item>
                <Menu.Item href='http://192.168.1.10:8000/disco' name='icecast' target='_blank' position='right' onClick={this.handleItemClick}>Icecast</Menu.Item>
            </Menu>
        )
    }    
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: [],
            sidebarVisible: false
        }

        this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
    }

    onError(error){
        console.log(error)
    }

    refreshData() {
        disco.getCurrentPlaylist()
        .then(data => this.updateStateIfNeeded(data));
    }

    updateStateIfNeeded(newData) {
        // Only update the state if it actually changed, to prevent unnecessary render calls
        if (newData == null) {
            this.state.currentPlaylist = [];
        } else if (!this.state.currentPlaylist || JSON.stringify(newData) !== JSON.stringify(this.state.currentPlaylist)) {
            this.setState({ 
                currentPlaylist: newData,
                currentTrack: newData[0],
                upcomingPlaylist: newData.slice(1)
            });            
        }
    }

    updateDocumentTitle(currentTrack, appName) {
        if (currentTrack) {
            document.title = currentTrack.artist + " - " + currentTrack.title + " | " + appName;
        } else {
            document.title = appName;
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 1000);                 
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toggleSidebarVisibility() {
        this.setState({ sidebarVisible: !this.state.sidebarVisible });
    }
  
    render() {
        const sidebarVisible = this.state.sidebarVisible;

        return (
            <Sidebar.Pushable>
                <Sidebar as={AppMenu} vertical inverted={true} animation='push' direction='left' visible={sidebarVisible} onClickMethod={this.toggleSidebarVisibility}/>
                <Sidebar.Pusher>
                    <Container>
                        <Header size="huge">
                            <Responsive maxWidth={767} as={Icon} name="sidebar" size ="small" onClick={this.toggleSidebarVisibility} />
                            {this.props.appName}
                        </Header>
                        <Responsive minWidth={768}>
                            <AppMenu inverted/>
                        </Responsive>
                        <NowPlaying currentTrack={this.state.currentTrack} updateTitle={this.updateDocumentTitle} appName={this.props.appName} />
                        <Switch>
                            <Route exact path='/' component={() => (<UpcomingPlaylist upcomingPlaylist={this.state.upcomingPlaylist} />)}/> />
                            <Route path="/search" component={TrackSearch} />
                            <Route path="/albums" component={AlbumSearch} />
                            <Route path="/history" component={History} />
                        </Switch>
                        <Segment textAlign="center" size="mini">
                            Robinet Disco client created by Linda Dick <a href="https://github.com/lindadick/react-disco-client"><Icon name="github" link={true} /></a>
                        </Segment>
                    </Container>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}