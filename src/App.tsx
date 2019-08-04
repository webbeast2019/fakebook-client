import React from 'react';
import {createMuiTheme} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import Header from './components/Header';
import {Route, Switch} from 'react-router';
import Feed from './pages/Feed/Feed';
import PostPage from './pages/Profile/PostPage';
import {BrowserRouter as Router} from 'react-router-dom';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#104DA1'
      }
    },
  });
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header/>
        <main className="App-main">
          <Switch>
            <Route path="/new-post" component={PostPage}/>
            <Route path="/edit-post/:id" component={PostPage}/>
            <Route path="/" component={Feed}/>
            <Route render={() => 'Page not found'}/>
          </Switch>
        </main>
      </ThemeProvider>
    </Router>
  );
};

export default App;
