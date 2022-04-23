import React from 'react'
import { useHistory, Link, useLocation } from "react-router-dom";
import styled from 'styled-components'
import userImgsrc from "../assets/avatar.png";
import {Menu, Notifications, ArrowDropDown, ArrowRightOutlined ,
DashboardRounded , AddBox, Person, Report, 
    Settings, Shop, Input, OutdoorGrill} from "@material-ui/icons";
import { useState } from 'react';
import { isAuth } from '../shared/utils/isAuth';
import { Close } from "@material-ui/icons";
import ubwiza from "../assets/target.png"
function Header() {
    const {username, email, userType, profile}  = isAuth();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [showLogoutSection, setShowLogoutSection ]= React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const history = useHistory();

    const isActive = (history, path)=>{

    if(history.pathname === path){

       return {color: "dodgerblue", fontWeight: 300}
    }else{
        return {color: "grey"}
    }
}

    const redirectToProfile = ()=>{
         history.push("/profile");
    }
    const Notify = ()=>{
        setShowLogoutSection(false);
        setShowNotification(!showNotification);
    }
    const LogoutActivate = ()=>{
        setShowNotification(false);
        setShowLogoutSection(!showLogoutSection);
    }
    const logout = ()=>{
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        history.push("/");
    }
    const closeAllStaff = ()=>{
        setOpen(false);
    }
    const Links = ()=>{
        if(open){
          return(
             <MenuWrapper>
                <Link to="/dashboard">
            <Logo>
             <Image src={ubwiza} alt="ubwiza"/>
           
             <p>Ubwiza</p>
          </Logo></Link>
              <MenuItems>
              <ListItem onClick={()=>setOpen(false)}>
                <Link to="/dashboard" style={isActive(location, "/dashboard")}>
                    <DashboardRounded className='icon'/>
                  <span>Dashboard</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/inventory" style={isActive(location, "/inventory")}>
                      <Input className='icon'/>
                  <span>In Stock</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/orders" style={isActive(location, "/orders")}>
                      <OutdoorGrill className='icon'/>
                  <span>Orders</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/ingredients" style={isActive(location, "/ingredients")}>
                      <Shop className='icon'/>
                  <span>Ingredients</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/packaging" style={isActive(location, "/packaging")}>
                      <AddBox className='icon'/>
                  <span>Packaging</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/report" style={isActive(location, "/report")}>
                      <Report className='icon'/>
                  <span>Report</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/settings" style={isActive(location, "/settings")}>
                      <Settings className='icon'/>
                  <span>Settings</span>
                  </Link>
              </ListItem>
              <ListItem onClick={()=>setOpen(false)}>
                  <Link to="/profile" style={isActive(location, "/profile")}>
                      <Person className='icon'/>
                  <span>Profile</span>
                  </Link>
              </ListItem>
           </MenuItems>
            <CloseModalButton onClick={closeAllStaff} />
             </MenuWrapper>
          )
        }
    }
    return (
       <Holder>
           <MenuDiv onClick={()=>setOpen((prev)=>!prev)} className='menu'>
             <Menu />  
           </MenuDiv>
          <ProfileInfo>
           <Notification onClick={Notify}>
            <Notifications className="icon" color='blue'/>
           <div className="notification-counter" 
           style={{background:"red", display: "block"}}>
                   <span>3</span>
           </div>
           </Notification>
           {showNotification && (
               <NotifyDiv>
                   <p>No current notification</p>
               </NotifyDiv>
           )}
           <UserInfo onClick={redirectToProfile}>
               <UserImage>
                   <Img src={userImgsrc}/>
               </UserImage>
               <span>{username}</span>
           </UserInfo>
            <LogoutSection 
            style={{cursor: "pointer", justifyContent: "center", alignItems: "center"}}
            onClick={LogoutActivate}
            ><ArrowDropDown className='dropdown'/>
             {showLogoutSection && (
                <Lsection onClick={logout}>
                    <LogoutDiv>
                        <ArrowRightOutlined />
                        <span>Logout</span>
                    </LogoutDiv>
                </Lsection>
            )}
            </LogoutSection>
          </ProfileInfo>
          {open && Links()}
       </Holder>
    )
}

export default Header
const Holder = styled.div`
position: relative;
 width: 101%;
 height: 10vh;
 display: flex;
 align-items: center;
 padding-left: 10px;
 .menu{
     display: none;
 }
 @media screen and (max-width: 1024px){
      height: 5vh;
   }
@media screen and (max-width: 768px){
    width: 100%;
    height: 7vh;
    .menu{
        display: block;
    }
   }
 /* background: black; */
`
const ProfileInfo = styled.div`
   position: absolute;
   right: 5px;
   width: 25%;
   display: flex;
   top: 15px;
   align-items: center !important;
   @media screen and (max-width: 1024px){
       right: 30px;
   }
    @media screen and (max-width: 768px){
      right: 50px;
   }
`
const Notification = styled.div`
    width: 30px;
    height: 30px;
    padding-top: 10px; 
    position: relative;
    cursor: pointer;
    /* background: blue; */
    .icon{
        color: dodgerblue;
        font-size: 25px;
    }
  .notification-counter{
      position: absolute;
      border-radius: 45%;
      /* padding: 2px; */
      width: 15px;
      text-align: center;
      color: #fff;
      align-items: center;
      top: 4px;
      font-size: 10px;
      height: 14px;
      right: 4px;
      padding-top: 0px;

  }
  margin-right: 15px;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  span{
      font-weight: 500px;
        cursor: pointer;
  }
  .dropdown{
      margin-left: 15px;
      cursor: pointer;
  }
`
const UserImage = styled.div`
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
`
const Img = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
`

const LogoutSection = styled.div`
position: relative;
width: 100px;
margin-left: 10px;
  /* padding: 10px; */
  margin-top: 5px;
  .icon{
      padding: 0px;
  }
  z-index: 3;
`
const Lsection = styled.div`
   position: absolute;
   height: 40px;
   width: 100px;
   top: 30px;
   left: -30px;
   background: rgba(30, 140, 250, 0.9);
   border-radius: 7px;
   color: #fff;
`
const LogoutDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  z-index: 3,
  color: #fff;
  cursor: pointer;
  .icon{
      color: #fff;
  }   
`
const NotifyDiv = styled.div`
     position: absolute;
     width: 200px;
     padding: 20px;
     height: 100px;
     background: rgba(30, 140, 250, 0.9);
     top: 48px;
     left: -100px;
     border-radius: 7px;
     z-index: 2000;
     p{
         color: #fff;
     }
     `
const MenuDiv = styled.div`
    
    position: absolute;
    left: 5%;
`
const MenuWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0%;
  left: 0%;
  z-index: 7000 !important;
  /* place-items: center; */
`
const MenuItems = styled.ul`
 position: relative;
 display: flex;
 width: 40%;
 margin: 200px auto;
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
const Logo = styled.div`
   margin-top: 15px;
   height: 50px;
   width: 50px;
   background: dodgerblue;
   position: relative;
   margin-left: 20px;
   border-radius: 50%;
   img{
       width: 100%;
       height: 100%;
       object-fit: cover;
       border-radius: 50%;
   }
   p{
       position: absolute;
       top: 13px;
       left: 60px;
       width: 70%;
   }
`
const Image = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
`
const CloseModalButton = styled(Close)`
   cursor: pointer;
   position: absolute;
   top: 20px;
   right: 20px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
   border: 1px solid dodgerblue;
   border-radius: 50%;
   font-size: 25px;
   :hover{
       border-color: #ff0066;
       color: dodgerblue;
   }
   @media screen and (max-width: 540px){
       left: 46%;
       height: 40px !important;
       width: 40px !important;
       border: 3px solid dodgerblue;
       border-radius: 50%;
   }
`