import React, { useState } from 'react'

import styled from 'styled-components';
import {AdminLogin} from "../components/AdminLogin.jsx";
import "../styles/Auth.css";

function Auth() {
    return (
        <GrandWrapper>
           <Wrapp>
             <AdminLogin/>
             <Background className="back">
               <ForeLook className='forelook'></ForeLook>
             </Background>
           </Wrapp>
        </GrandWrapper>
    )
}

export default Auth;
const Background = styled.div`
     background-size: cover;
     width: 65%;
     border-radius: 0px 5px 5px 0px;
     height: 100%;
`
const GrandWrapper = styled.div`
      width: 100%;
       height: 100vh;   
      display: flex;
      flex-direction: row !important;
      background: #6f9e9e61;
`
const Wrapp = styled.div`
   width: 98%;
   height: 94%;
   margin: 20px auto;
   display: flex;
   border-radius: 5px;
   @media only screen and (max-width: 768px){
      .back{
         display: none;
      }
      width: 100%;
      height: 100%;
      margin: 0px;
      
   }
`
const ForeLook = styled.div`
   width: 60%;
   height: 60vh;
   margin: 40px auto;
   object-fit: cover;
`