import { Link } from 'react-router-dom';

import React from 'react'
import styled from 'styled-components';
import karame from "../assets/target.png";
const SimpleHeader = () => {
    return (
        <Nav>
            <Link to='/'>
          <Logo>
            <Image src={karame} alt="karame"/>
            <p>Cetraf</p>
          </Logo>
            </Link>

         <Link className='login' to="/">
         <Button >Login</Button>
         </Link>
         
        </Nav>
    )
}
const Nav = styled.div`
  position: absolute;
  top: 10px;
  left: 50px;
  width: 90%;
  display: flex;
  align-items: center;
  .login{
      position: absolute;
      right: 20px;
  }
  @media screen and (max-width: 540px){
    .login{
      right: 50px;
    }
   }

`
const Button = styled.button`
 width: 100px;
 padding: 5px 2px;
 border-radius: 5px;
 border: none;
 cursor: pointer;
background: rgba(30, 140, 250, 0.9);
color: #fff;
 /* height: ; */
`
export const Logo = styled.div`
   height: 40px;
   width: 40px;
   justify-content: center;
   object-fit: cover;
   margin-left: 30px;
   margin-top: 15px;
   align-items: center;
   margin-bottom: 20px;
   background: #0000ffb9;
   border-radius: 50%;
   cursor: pointer;
   img{
      height: 100% !important;
      width: 100% !important;
      object-fit: cover;
      /* margin-left: -85px; */
   }
   p{
      position: absolute;
      top: 20px;
      font-weight: bold;
      color: black;
      font-size: 20px;
      left: 75px;
   }
   @media screen and (max-width: 540px){
     margin-left: -30px;
     p{
       left: 20px;
     }
   }
`
export const Image = styled.img`

`
export default SimpleHeader
