import React from 'react'
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"
import { DashboardRounded , AddBox, Person, Report, 
    Settings, Shop, Input, OutdoorGrill, AccessAlarm} from "@material-ui/icons"
import ubwiza from "../assets/target.png"
import { isAuth } from '../shared/utils/isAuth';
function Sidebar() {
    const location = useLocation();
    const { userType } = isAuth();
const isActive = (history, path)=>{

    if(history.pathname === path){

       return {color: "dodgerblue", fontWeight: 300}
    }else{
        return {color: "grey"}
    }
}
    return (
        <Holder>
           <Link to="/dashboard">
            <Logo>
             <Image src={ubwiza} alt="ubwiza"/>
           
             <p>Ubwiza</p>
          </Logo></Link>
           <MenuItems>
              <ListItem>
                <Link to="/dashboard" style={isActive(location, "/dashboard")}>
                    <DashboardRounded className='icon'/>
                  <span>Dashboard</span>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link to="/inventory" style={isActive(location, "/inventory")}>
                      <Input className='icon'/>
                  <span>In Stock</span>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link to="/orders" style={isActive(location, "/orders")}>
                      <OutdoorGrill className='icon'/>
                  <span>Orders</span>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link to="/ingredients" style={isActive(location, "/ingredients")}>
                      <Shop className='icon'/>
                  <span>Ingredients</span>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link to="/packaging" style={isActive(location, "/packaging")}>
                      <AddBox className='icon'/>
                  <span>Packaging</span>
                  </Link>
              </ListItem>
              <ListItem>
                  <Link to="/report" style={isActive(location, "/report")}>
                      <Report className='icon'/>
                  <span>Report</span>
                  </Link>
              </ListItem>
              {userType.toLowerCase() ==="admin" && <ListItem>
                  <Link to="/users" style={isActive(location, "/users")}>
                      <Person className='icon'/>
                  <span>Add User</span>
                  </Link>
              </ListItem>}
              {userType.toLowerCase() ==="admin" && <ListItem>
                  <Link to="/add_role" style={isActive(location, "/add_role")}>
                      <AccessAlarm className='icon'/>
                  <span>Add Role</span>
                  </Link>
              </ListItem>}              
              <ListItem>
                  <Link to="/settings" style={isActive(location, "/settings")}>
                      <Settings className='icon'/>
                  <span>Settings</span>
                  </Link>
              </ListItem>

           </MenuItems>
        </Holder>
    )
}

export default Sidebar
const Holder = styled.div`
position: fixed;
 width: 15%;
 height: 100vh;
 /* background: black; */
 display: flex;
 flex-direction: column;
 padding-left: 10px;
 /* box-shadow: 1px 0px 0px 1px rgba(0,0,0,0.2); */
 z-index: 1;
 @media screen and (max-width: 768px){
     display: none;
 }
`
const Logo = styled.div`
   margin-top: 10px;
   height: 50px;
   width: 50px;
   background: dodgerblue;
   position: relative;
   margin-left: 0px;
   border-radius: 50%;
   img{
       width: 100%;
       height: 100%;
       object-fit: cover;
       border-radius: 50%;
   }
   /* background: black; */
   p{
       position: absolute;
       top: 13px;
       left: 60px;
       width: 70%;
       /* font-size: px; */
   }
`
const Image = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
`
const MenuItems = styled.ul`
 display: flex;
 width: 95%;
 margin-top: 60px;
 margin-left: -25px;
 flex-direction: column;
 list-style: none;
`
const ListItem = styled.li`
 width: 100% !important;

 a{
    display: flex;
    align-items: center;
    text-decoration: none;
     span{
     margin-left: 10px;
 }
 .icon{
     font-size: 20px;
 }
 }

 margin-bottom: 18px;
 cursor: pointer;
`