import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components';
import theme from './constants/theme';
import { BoardPage, BoardPageSaved, HomePage } from './pages';
import { BoardPageWrapper } from './hoc';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='board'>
            <Route index element={<BoardPage />} />
            <Route
              path=':code'
              element={<BoardPageWrapper Component={BoardPageSaved} />}
            />
          </Route>
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
