import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function PrivateRoute({ component: Component, ...rest }) {
    const [isLoggedIn, setIsLoggedIn,authId,setAuthId]=useContext(AuthContext);
    return (
        <Route
        {...rest}
        render={(props) =>
            isLoggedIn ? <Component {...props} /> : <Navigate replace to="/login" />
        }
        />
    );
}
export default PrivateRoute;