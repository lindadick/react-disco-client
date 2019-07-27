import React from 'react'
import { APP_NAME, THEME } from 'discoConfig'
import disco from '../lib/disco'

import NowPlaying from './NowPlaying'

switch (THEME) {
    case 'dark':
        // eslint-disable-next-line global-require
        require('../stylesheets/widget-dark.scss')
        document.querySelector('meta[name=theme-color]').setAttribute('content', '#292929')
        break
    default:
        // eslint-disable-next-line global-require
        require('../stylesheets/widget-light.scss')
}

export default class Widget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTrack: null,
            currentPlaylist: [],
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
        const { currentTrack } = this.state
        return (
            <NowPlaying
                currentTrack={currentTrack}
                updateTitle={this.updateDocumentTitle}
                appName={APP_NAME}
                widgetView
            />
        )
    }
}
