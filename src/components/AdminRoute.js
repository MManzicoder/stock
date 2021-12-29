import React, { Component } from 'react'
import { Route } from 'react-router'
import { isAuth, isAdmin } from '../shared/utils/isAuth'
const  AdminRoute=({component: Component, ...rest})=>(
     <Route {...rest}
     render={props=>
        isAuth() && isAdmin() ? (
            <Component {...props}/>
        ) : (
            <p>Admin resource Access denied!</p>
        )
    }
     />
)
export default AdminRoute