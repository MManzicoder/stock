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
import Packaging from './pages/Packaging';
import MaterialsEdit from './pages/MaterialEdit';
import MaterialsUsedEdit from './pages/MaterialsUsedEdit';


function App() {
    const store = Store(useState);
    
  return (
    <Modes.Provider  value ={ store }>
    <Router>
    <ToastContainer position="top-center" autoClose={5000} />
       <Switch>

       <Route component = {Auth} path="/account" exact/>
       <PrivateRoute component={Dashboard}  path="/dashboard" /> 
       <PrivateRoute component={IngredientsEdit} exact path="/ingredients/edit/:ingId"/> 
       <PrivateRoute component={MaterialsEdit} exact path="/materials/edit/:mId"/> 
       <PrivateRoute component={IngredientsUsedEdit} exact path="/ingredients/editused/:ingId"/> 
       <PrivateRoute component={MaterialsUsedEdit} exact path="/materials/editused/:mId"/> 
       <PrivateRoute component={Ingredients}  path="/ingredients" /> 
       <PrivateRoute component={Packaging}  path="/packaging" /> 
       <PrivateRoute component={Report}  path="/report" /> 
       <PrivateRoute component={Profile}  path="/profile" /> 
       <PrivateRoute component={InventoryEdit} path="/inventory/edit/:id"/>
       <PrivateRoute component={Inventory} path="/inventory"/>
       <PrivateRoute component={OutGoing} path="/outgoing"/>
       <PrivateRoute component={Settings} path="/settings"/>
       <Route component={PasswordResetNotification} path="/resetMessage"/>       
       {/* <Route component={ForgotPassword} path="/forgotpassword"/> */}
       <Route component={ChangePassword} path="/shaka/reset/:code"/>
       </Switch>
       
      
    </Router>
  
    </Modes.Provider>
  );
}

export default App;
