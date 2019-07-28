import React from 'react'
import { Switch, Route, NavLink as RRNavLink } from 'react-router-dom'
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
} from 'reactstrap'

// eslint-disable-next-line import/no-unresolved
import { APP_NAME, ICECAST_URL, THEME } from 'discoConfig'
import disco from '../lib/disco'

import TrackSearch from './TrackSearch'
import Albums from './Albums'
import AlbumDetails from './AlbumDetails'
import History from './History'
import NowPlaying from './NowPlaying'
import Modes from './Modes'
import Playlists from './Playlists'
import UpcomingPlaylist from './UpcomingPlaylist'

switch (THEME) {
    case 'dark':
        // eslint-disable-next-line global-require
        require('../stylesheets/disco-dark.scss')
        document.querySelector('meta[name=theme-color]').setAttribute('content', '#000000')
        break
    default:
        // eslint-disable-next-line global-require
        require('../stylesheets/disco-light.scss')
}

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
            upcomingPlaylist: [],
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), 1000)
        this.refreshData()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onError = (error) => {
        // eslint-disable-next-line no-console
        console.log(error)
    }

    refreshData = () => {
        disco.getCurrentPlaylist().then((data) => this.updateStateIfNeeded(data))
    }

    updateStateIfNeeded = (newData) => {
        const { currentPlaylist } = this.state
        if (
            newData != null &&
            (!currentPlaylist || JSON.stringify(newData) !== JSON.stringify(currentPlaylist))
        ) {
            // Only update the state if it actually changed, to prevent unnecessary render calls
            this.setState({
                currentPlaylist: newData,
                currentTrack: newData[0],
                upcomingPlaylist: newData.slice(1),
            })
        }
    }

    updateDocumentTitle = (currentTrack) => {
        if (currentTrack) {
            document.title = `${currentTrack.artist} - ${currentTrack.title} | ${APP_NAME}`
        } else {
            document.title = APP_NAME
        }
    }

    render() {
        const { currentTrack, upcomingPlaylist } = this.state
        return (
            <React.Fragment>
                <AppMenu />
                <NowPlaying
                    currentTrack={currentTrack}
                    updateTitle={this.updateDocumentTitle}
                    appName={APP_NAME}
                />
                <Container>
                    <Row>
                        <Col className="mb-3">
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={() => (
                                        <UpcomingPlaylist
                                            upcomingPlaylist={upcomingPlaylist}
                                            refreshCallback={this.refreshData}
                                        />
                                    )}
                                />
                                <Route path="/search" component={TrackSearch} />
                                <Route path="/albums" component={Albums} />
                                <Route path="/playlists" component={Playlists} />
                                <Route path="/modes" component={Modes} />
                                <Route exact path="/albumdetails/:id" component={AlbumDetails} />
                                <Route path="/history" component={History} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <div className="border-top border-bottom text-center disco-highlight p-2">
                    <Container>
                        <span className="small">
                            {APP_NAME} created by John Howard. Client and API by Linda and Michael
                            Dick.
                        </span>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

class AppMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
        }
        this.toggle = this.toggle.bind(this)
        this.collapse = this.collapse.bind(this)
    }

    toggle() {
        const { collapsed } = this.state
        this.setState({
            collapsed: !collapsed,
        })
    }

    collapse() {
        const { collapsed } = this.state
        if (!collapsed) {
            this.setState({
                collapsed: true,
            })
        }
    }

    render() {
        const { collapsed } = this.state
        const activeClassName = 'active'
        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarBrand href="#/">{APP_NAME}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={!collapsed} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        exact
                                        to="/"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        Upcoming
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/search"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        Tracks
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/albums"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        Albums
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/playlists"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        Playlists
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/modes"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        Modes
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/history"
                                        onClick={this.collapse}
                                        tag={RRNavLink}
                                        activeClassName={activeClassName}
                                    >
                                        History
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {ICECAST_URL && (
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink
                                            href={ICECAST_URL}
                                            target="_blank"
                                            onClick={this.collapse}
                                        >
                                            Icecast
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                        </Collapse>
                    </Container>
                </Navbar>
            </React.Fragment>
        )
    }
}
