import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Modes } from './shared/context/modes';
import { Store } from './shared/utils/Store';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './components/ChangePassword'; 
import PasswordResetNotification from "./components/PasswordResetNotification";
import Resend from "./components/Resend";
// import ForgotPassword from "./components/ForgotPassword";
import Auth from "./pages/Auth";
import Inventory from "./pages/Inventory";
import OutGoing from "./pages/OutGoing";
import Profile from './pages/Profile';
import Report from './pages/Report';
import Ingredients from './pages/Ingredients';
import Settings from './pages/Settings';

function App() {
    const store = Store(useState);
    
  return (
    <Modes.Provider  value ={ store }>
    <Router>
    <ToastContainer position="top-center" autoClose={5000} />
       <Switch>
       <PublicRoute component = {Auth} path="/account" exact/>
       {/* <Route exact  component={VerifyAccount} path="/verifyAccount/:verificationCode"/> */}
       <PublicRoute component={Dashboard}  path="/dashboard" /> 
       <PublicRoute component={Ingredients}  path="/ingredients" /> 
       <PublicRoute component={Report}  path="/report" /> 
       <PublicRoute component={Profile}  path="/profile" /> 
       <PublicRoute component={Inventory} path="/inventory"/>
       <PublicRoute component={OutGoing} path="/outgoing"/>
       <PublicRoute component={Settings} path="/settings"/>
       <Route component={PasswordResetNotification} path="/resetMessage"/>       
       {/* <Route component={ForgotPassword} path="/forgotpassword"/> */}
       <Route component={ChangePassword} path="/shaka/reset/:code"/>
       </Switch>
       
      
    </Router>
  
    </Modes.Provider>
  );
}

export default App;
