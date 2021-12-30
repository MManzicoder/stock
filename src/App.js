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
import InventoryEdit from "./pages/InventoryEdit";
import OutGoing from "./pages/OutGoing";
import Profile from './pages/Profile';
import Report from './pages/Report';
import Ingredients from './pages/Ingredients';
import Settings from './pages/Settings';
import IngredientsEdit from './pages/IngredientsEdit';
import IngredientsUsedEdit from './pages/IngredientsUsedEdit';


function App() {
    const store = Store(useState);
    
  return (
    <Modes.Provider  value ={ store }>
    <Router>
    <ToastContainer position="top-center" autoClose={5000} />
       <Switch>

       <Route component = {Auth} path="/account" exact/>
       <PublicRoute component={Dashboard}  path="/dashboard" /> 
        <PublicRoute component={IngredientsEdit} exact path="/ingredients/edit/:ingId"/> 
        <PublicRoute component={IngredientsUsedEdit} exact path="/ingredients/editused/:ingId"/> 
       <PublicRoute component={Ingredients}  path="/ingredients" /> 
       <PublicRoute component={Report}  path="/report" /> 
       <PublicRoute component={Profile}  path="/profile" /> 
       <PublicRoute component={InventoryEdit} path="/inventory/edit/:id"/>
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
