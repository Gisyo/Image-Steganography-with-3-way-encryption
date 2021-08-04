import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../src/Components/Dashboard/main/src/assets/scss/style.css';

ReactDOM.render(
  // <React.StrictMode>
  //   <DashboardMain />
  // </React.StrictMode>,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // <HashRouter>
  //   <Switch>
  //     {indexRoutes.map((prop, key) => {
  //       return <Route path={prop.path} key={key} component={prop.component} />;
  //     })}
  //   </Switch>
  // </HashRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
