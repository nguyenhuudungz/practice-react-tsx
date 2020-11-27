import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => <div className="app">Hello TSX.</div>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
