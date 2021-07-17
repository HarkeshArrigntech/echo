import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter  as Router,Redirect,Route, Switch } from "react-router-dom";
import MainApp from "./MainApp"
import './App.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D7874",
    },
  },
});


function App() {
  return (
      <ThemeProvider theme={theme}>
        <Router>
            <Switch>
              <Redirect exact from="/" to="/books&page=1&items=20" />
              <Route  path='/books&page=:page&items=:items' component={MainApp} />
            </Switch>
          </Router>
      </ThemeProvider>
  );
}

export default App;


