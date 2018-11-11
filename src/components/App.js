import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { 
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
import AlbumDetails from './AlbumDetails';
import History from './History';
import NowPlaying from './NowPlaying';
import UpcomingPlaylist from './UpcomingPlaylist';
import {APP_NAME, ICECAST_URL} from 'discoConfig';

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
        if (newData == null) {
            return;
        } else if (!this.state.currentPlaylist || JSON.stringify(newData) !== JSON.stringify(this.state.currentPlaylist)) {
            // Only update the state if it actually changed, to prevent unnecessary render calls
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
                                <Route exact path="/albumdetails/:id" component={AlbumDetails} />
                                <Route path="/history" component={History} />
                            </Switch>
                        </Col>                   
                    </Row>
                </Container>
                <div className="text-center border p-2">
                    <Container>
                        <span className="small">{APP_NAME} created by John Howard. Client and API by Linda and Michael Dick.</span>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

class AppMenu extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        collapsed: true
      }
      this.toggle = this.toggle.bind(this)
      this.collapse = this.collapse.bind(this)
    }
    toggle() {
      this.setState({
        collapsed: !this.state.collapsed
      })
    }
    collapse() {
        if (!this.state.collapsed) {
            this.setState({
                collapsed: true
            })
        }
    }
    render() {
      return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="#/">{APP_NAME}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href='#/' onClick={this.collapse}>Current Playlist</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href='#/search' onClick={this.collapse}>Tracks</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href='#/albums' onClick={this.collapse}>Albums</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='#/history' onClick={this.collapse}>History</NavLink>
                            </NavItem>
                        </Nav>
                        { ICECAST_URL &&
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink  href={ICECAST_URL} target='_blank' onClick={this.collapse}>Icecast</NavLink>
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
  