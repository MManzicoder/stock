import React from 'react';
import styled from "styled-components"
// import Shield from "../assets/Shield.svg"
// import {Link} from "react-router-dom";



function PasswordResetNotification() {
    
    return (
        <>
            <Wrapper className="bg-primary">
                
            <VerifyContainer>
                {/* <img src={Shield} alt="The logo for verification"/> */}
                  <h2>Password Reset</h2>
                    <p>Head on to your Gmail to check for password reset link </p>
                    <p className="of-important">
                        <strong>Important</strong>: 
                        <span style={{color:"green"}}> Check your email and reset your account password!!!</span>
                    </p>
                 <Row>
                </Row>
             </VerifyContainer>
             </Wrapper>
             </>
        
    )
}

const VerifyContainer=styled.div`
 width: 40%;
 height: 70%;
 background: white;
 margin: 20px auto;
 text-align: center;
 border-radius: 2px;
 .verify{
  width: 40%;
  margin: 30px auto;
  padding: 10px 5px;
}
.of-important{
    margin-top: 10px;
}
.loading{
    width: 40%;
    margin: 30px auto;
    padding: 20px 5px;
}
 img{
     margin: 0px auto;
 }
 p{
    color: grey;
}
h2{
     color: #246DFF;
}
.focused{
    border: 2px solid #0055FF !important;
    outline: none;
    border-radius: 3px;
}
padding: 10px;
@media only screen and (max-width:620px){
    width: 80%;
    margin: 10px 10%;
    height: 70vh;
*{
    font-size: 20px;
}
.verify{
 width: 70%;
 padding: 5px;
 height: 50px;
}
}
@media only screen and (min-width:620px) and (max-width:920px){
    width: 70%;
}
@media only screen and (min-width:920px) and (max-width:1200px){
    width: 70%;
}
@media screen and (max-width: 360px){
    margin: 0%;
    width: 100%;
    height: 100vh;
    input{
  width: 90%;   
}
}


`
const Wrapper=styled.div`
width: 100%;
height: 100vh;
/* background-color: #dfecf5; */
padding-top: 20px;
`
const Row=styled.div`
margin-top: 10px;
text-align: center;
a{
    color: red;
    text-decoration: none;
}
p.spec-p{
    margin-top: 20px;
}
.resend-btn{
    display: block;
    color: white;
    border: 2px solid dodgerblue;
    background: dodgerblue;
    width: 40%;
    border-radius: 4px;
    padding: 4px;
    margin: 10px auto;
}

@media only screen and (max-width: 620px){
    .resend-btn{
        display: block;
        width: 100%;
        padding: 4px;
        margin: 10px auto;
    }
}
`


export default PasswordResetNotification;
