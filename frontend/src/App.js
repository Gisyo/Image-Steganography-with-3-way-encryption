import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import Landing from './Components/Landing/Landing';
import SignIn from './Components/Login/Login';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Details from './Components/Details/details';
import About from './Components/About/About';
import Security from './Components/Security/Security';
import DashboardMain from './Components/Dashboard/main/src/index';
import SignUp from './Components/Register/Register';

const theme = createMuiTheme({
	typography: {
		fontFamily: [ 'Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', 'Lato', 'Pacifico' ].join(','),
	},
});

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route path='/#/user/Overview' component={DashboardMain} />
						<Route path='/HowItWorks' component={Details} />
						<Route path='/AboutUs' component={About} />
						<Route path='/Security' component={Security} />
						<Route path='/SignIn' component={SignIn} />
						<Route path='/SignUp' component={SignUp} />
						<Route exact path='/' component={Landing} />
					</Switch>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
