import React from 'react';
import indexRoutes from './routes/index.jsx';
import {Route, Switch} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';

import './assets/scss/style.css';
export default function DashboardMain() {
  return (
    <HashRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </HashRouter>
  );
}
