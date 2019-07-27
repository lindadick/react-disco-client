import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

import AlbumSearch from './AlbumSearch'
import AlbumRandomList from './AlbumRandomList';

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? "active" : ""}
                            onClick={() => { this.toggle('1'); }}
                        >
                            <FontAwesomeIcon icon={faSearch}/> Search
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? "active" : ""}
                            onClick={() => { this.toggle('2'); }}
                        >
                            <FontAwesomeIcon icon={faDice}/> Random
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <AlbumSearch/>
                    </TabPane>
                    <TabPane tabId="2">
                        <AlbumRandomList/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}
  