import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../shared/utils/isAuth';


export const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAuth() ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

