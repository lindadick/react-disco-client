import React from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './components/App';
import "semantic-ui-less/semantic.less";
import './stylesheets/disco.scss';

window.React = React

ReactDOM.render(
  <HashRouter>
    <App appName="Robinet Disco"/>
  </HashRouter>,
  document.getElementById('react-container')
);
