import React, { useContext, useState } from "react";
import 
{ Holder, Sub, FormControl, Input, Button, Loader, RememberMe, Wrapper, Logo, Image, UserBenefit, Label, BottomHeader } 
from "./AdminLogin"
import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import unhcrLogo from "../assets/logounchr.png";
import { Modes } from "../utils/context";
export const SponsorLogin = ()=>{
   const navigate = useNavigate();
   const { sponsorLogin,sponsorSignup, setSponsorLogin, setAdminLogin, setSponsorSignup } = useContext(Modes);
   const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = e =>{
       e.preventDefault();
       const {name, value} = e.target;
       setUser({
          ...user,
          [name]: value
       })
    }
 const directToAdminLogin=()=>{
    setSponsorLogin(false);
    setSponsorSignup(false);
 }
 const sponsorLoginMode = ()=>{
    setAdminLogin(false);
     setSponsorLogin(false);
     setSponsorSignup(true);
 }
const sponsorSignupMode = ()=>{
   setAdminLogin(false);
     setSponsorLogin(true);
     setSponsorSignup(false);
 } 
 const handleSponsorLogin = ()=>{
    setLoading(true);
 }
    return(
      <Holder>
        <Wrapper >
         <Logo>
            <Image src={unhcrLogo} alt="unhcr"/>
          </Logo>
          <Sub autoComplete="off">
             <Input type="hidden" autoComplete="off"/>
              {sponsorSignup && <FormControl>
                 <Label for="names">Names</Label> 
                 <Input type="text" id="names" name="names" 
                 onChange={handleChange} placeholder="Names"
                 required
                 />
              </FormControl>}
              <FormControl>
                 <Label for="email">Email</Label> 
                 <Input type="email" name="email" id="email" 
                 onChange={handleChange} placeholder="Email" 
                 required
                 />
              </FormControl>
              <FormControl>
                 <Label for="password">Password</Label> 
                 <Input type="password" name="password" id="password" 
                 onChange={handleChange} placeholder="Enter a password"
                 required
                 />
              </FormControl>
              <Button onClick={handleSponsorLogin} style={loading ? {padding: "0px"}: {}}>
                 {!loading ? "Sign In": <Loader style={loading ? {marginLeft: "120px", marginTop: "-2px"}: {}}>
                 </Loader> }</Button>
              <UserBenefit style={sponsorSignup ? {marginTop: "5px"}:{}}>
                <RememberMe>
                   <Input type="checkbox" style={{cursor: "pointer"}} 
                   id = "remember" name="remember"/>
                    <Label for="remember" style={{cursor: "pointer"}}>Remember me</Label>
                   </RememberMe>  
                   <Link to="/forgotpassword">Forgot Password?</Link>   
              </UserBenefit>
          </Sub>
          <BottomHeader style={sponsorSignup ? {bottom: "-60px"}: {}}>
             <p> Login as  
             <Link to="/adminlogin" onClick={directToAdminLogin}
             style={{marginRight: 20}} 
             > Admin</Link> or <Label onClick={sponsorLogin ? sponsorLoginMode : sponsorSignupMode } 
             style={{cursor: "pointer", color: "blue",marginLeft: 20}}> 
             { sponsorLogin ? "Signup": "As a sponsor"}</Label></p> 
          </BottomHeader>
        </Wrapper>
      </Holder>
    );

}
