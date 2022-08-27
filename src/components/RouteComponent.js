import React from 'react';
import Nav from './NavComponent';
import MovieWrapper from './WrapperComponent';
import MoreInfo from './MoreInfoComponent';
import WishList from './WIshList';
import { Route, Switch } from 'react-router-dom';
import Register from './User/Register';
import Login from './User/Login';

function SwitchRouter() {
    return (
        <>
            <Nav />
            <Switch>
                <Route exact path="/search/:searchVal" component={MovieWrapper} />
                <Route exact path="/id/:id" component={MoreInfo} />
                <Route exact path="/wishlist" component={WishList} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </>
    );
}

export default SwitchRouter;