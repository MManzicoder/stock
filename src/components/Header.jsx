import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import userImgsrc from "../assets/avatar.png";
import { Notifications, ArrowDropDown, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from 'react';
import { isAuth } from '../shared/utils/isAuth';
function Header() {
    const {username, email, userType, profile}  = isAuth();
    const [showLogoutSection, setShowLogoutSection ]= React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const history = useHistory();
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
    return (
       <Holder>
          <ProfileInfo>
           <Notification onClick={Notify}>
            <Notifications className="icon" color='blue'/>
           <div className="notification-counter" style={{background:"red", display: "block"}}>
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
            <LogoutSection style={{cursor: "pointer", justifyContent: "center", alignItems: "center"}}
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
       </Holder>
    )
}

export default Header
const Holder = styled.div`
position: relative;
 width: 101%;
 height: 10vh;
 display: flex;
 flex-direction: column;
 padding-left: 10px;
 /* background: black; */
`
const ProfileInfo = styled.div`
   position: absolute;
   right: 5px;
   width: 25%;
   display: flex;
   top: 15px;
   align-items: center !important;
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