import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuth } from '../shared/utils/isAuth'

const  PrivateRoute=({component: Component, ...rest})=>(
     <Route {...rest}
     render={props=>(
        isAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/account" />
        )
     )
    }
     />
)
export default PrivateRoute;