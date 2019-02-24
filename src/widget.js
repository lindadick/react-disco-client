import React from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import Widget from './components/Widget';

window.React = React

ReactDOM.render(
  <HashRouter>
    <Widget />
  </HashRouter>,
  document.getElementById('react-container')
);
