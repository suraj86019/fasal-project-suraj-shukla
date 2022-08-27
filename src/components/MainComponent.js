import React from 'react';
import SwitchRouter from './RouteComponent';
import { Route, Switch } from 'react-router-dom';

function Main() {
    return (
        <Switch>
            <Route path="/" component={SwitchRouter} />
        </Switch>
    );
}

export default Main;