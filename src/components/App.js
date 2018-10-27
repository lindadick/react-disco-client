import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { 
    Card, 
    Col, 
    Collapse,
    Container, 
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, 
    NavLink, 
    Row, 
} from 'reactstrap';
  
import disco from '../lib/disco';

import TrackSearch from './TrackSearch';
import AlbumSearch from './AlbumSearch';
import History from './History';
import NowPlaying from './NowPlaying';
import UpcomingPlaylist from './UpcomingPlaylist';
import {APP_NAME, ICECAST_URL} from 'discoConfig';

library.add(fas, far, faGithub);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: [],
        }
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

    updateDocumentTitle(currentTrack) {
        if (currentTrack) {
            document.title = currentTrack.artist + " - " + currentTrack.title + " | " + APP_NAME;             
        } else {
            document.title = APP_NAME;
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 1000);                 
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <React.Fragment>
                <AppMenu />
                <NowPlaying currentTrack={this.state.currentTrack} updateTitle={this.updateDocumentTitle} appName={APP_NAME} />
                <Container>
                    <Row>
                        <Col className="mb-3">
                            <Switch>
                                <Route exact path='/' component={() => (<UpcomingPlaylist upcomingPlaylist={this.state.upcomingPlaylist} />)}/> />
                                <Route path="/search" component={TrackSearch} />
                                <Route path="/albums" component={AlbumSearch} />
                                <Route path="/history" component={History} />
                            </Switch>
                        </Col>                   
                    </Row>
                </Container>
                <div className="text-center border p-2">
                    <Container>
                        {APP_NAME} created by John Howard. Client and API by Linda and Michael Dick.
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

class AppMenu extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="#/">{APP_NAME}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} onClick={this.toggle} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href='#/'>Current Playlist</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  href='#/search'>Tracks</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  href='#/albums'>Albums</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='#/history'>History</NavLink>
                        </NavItem>
                    </Nav>
                        { ICECAST_URL &&
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink  href={ICECAST_URL} target='_blank'>Icecast</NavLink>
                            </NavItem>
                        </Nav>
                        }
                    </Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
      );
    }
  }
  