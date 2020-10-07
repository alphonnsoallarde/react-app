import 'styles/main.scss';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Page} from 'components/Pages';
import Home from 'views/Home';
import Users from 'views/Users';

function App() {
  return (
    <div className="app">
      <Router>
        <Page>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="*">Page Not Found</Route>
          </Switch>
        </Page>
      </Router>
    </div>
  );
}

export default App;
