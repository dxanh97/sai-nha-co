import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="main">
        <span className="logo">📒</span>
        <button className="btn" type="button">
          New Game
        </button>
        <button className="btn" type="button">
          Game History
        </button>
      </div>
    </Provider>
  </React.StrictMode>,
);
