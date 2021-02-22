import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, LandingPage } from '../components';

function PublicRoutes() {
	return (
		<Fragment>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</Fragment>
	)
}

export default PublicRoutes;
