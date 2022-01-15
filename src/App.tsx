import React from 'react';
import { Routes, Route } from 'react-router'
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'
import Details from './components/Details';
import Search from './components/Search';

//intialize mui custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/details/:animeId" element={<Details />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>
    </>

  );
}

export default App;
