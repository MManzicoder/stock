import React, { useContext, useState } from 'react'

import styled from 'styled-components';
import {SponsorLogin} from "../components/SponsorLogin.jsx";
import "../styles/Auth.css";
import { Modes } from '../utils/context.js';

function SponsorAuth() {
  const { loginMode, LoginAsAdmin, sponsorLogin, setSponsorLogin, sponsorSignup} = useContext(Modes);
    return (
        <GrandWrapper>
           <Wrapp>
             <SponsorLogin/>
             <Background className="back">
             </Background>
           </Wrapp>
        </GrandWrapper>
    )
}

export default SponsorAuth;
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
`