import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { store } from './redux/store';

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
  primaryColor: 'grape',
});

root.render(
  <MantineProvider theme={theme} defaultColorScheme="auto">
    <ModalsProvider>
      <Provider store={store}>
        <Container p="sm">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={null} // layout component
              >
                <Route index element={<HomePage />} />
                <Route path="/new-game" element={<NewGamePage />} />
                <Route path="/game/:gameId" element={<GameScreenPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </Provider>
    </ModalsProvider>
  </MantineProvider>,
);
