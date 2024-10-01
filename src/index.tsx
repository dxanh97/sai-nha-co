import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { store } from './redux/store';
import HomePage from './pages/home';

import './index.scss';
import NewGamePage from './pages/new-game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
  /** Mantine theme override */
});

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={null} // layout component
            >
              <Route index element={<HomePage />} />
              <Route path="/new-game" element={<NewGamePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
