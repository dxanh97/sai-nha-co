import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Container,
  createTheme,
  MantineProvider,
  virtualColor,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { PersistGate } from 'redux-persist/integration/react';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';

import { persistor, store } from './redux/store';

import HomePage from './pages/home';
import NewGamePage from './pages/new-game';
import GameScreenPage from './pages/game-screen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
  fontFamily: 'Space Grotesk',
  headings: {
    fontFamily: 'Space Grotesk',
  },
  primaryColor: 'primary',
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'gray',
      light: 'dark',
    }),
  },
});

root.render(
  <MantineProvider theme={theme} defaultColorScheme="auto">
    <ModalsProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container p="sm" pos="relative">
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<HomePage />} />
                  <Route path="/new-game" element={<NewGamePage />} />
                  <Route path="/game/:gameId" element={<GameScreenPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Container>
        </PersistGate>
      </Provider>
    </ModalsProvider>
  </MantineProvider>,
);
