import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

import AlbumSearch from './AlbumSearch'
import AlbumRandomList from './AlbumRandomList'

export default class Albums extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: '1',
        }
    }

    toggle(tab) {
        const { activeTab } = this.state
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab,
            })
        }
    }

    render() {
        const { activeTab } = this.state
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('1')
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2')
                            }}
                        >
                            <FontAwesomeIcon icon={faDice} /> Random
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <AlbumSearch />
                    </TabPane>
                    <TabPane tabId="2">
                        <AlbumRandomList />
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}
