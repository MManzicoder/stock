import React, { useContext, useState } from "react";
import { useHistory} from "react-router-dom"
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { adminLoginHandler } from "../apiHandler";
import { request } from "../apiHandler/Authapi";
import urwunge from "../assets/target.png";
// import { Modes } from "../utils/context";
export const AdminLogin = ()=>{
   const navigate = useHistory();
   // const { adminLogin, sponsorLogin,sponsorSignup, setSponsorLogin, setAdminLogin, setSponsorSignup } = useContext(Modes);
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
 const handleAdminLogin = e =>{
    setLoading(true);
       e.preventDefault();
     request(user)
      .then(data=>{
         setLoading(false);
         if(data.data.loginAdmin){
            console.log(data.data);
         }
      })
      .catch(err=>{
         setLoading(false);
         console.log(err.message)
      });
 }
    return(
      <Holder>
        <Wrapper>
          <Logo>
            <Image src={urwunge} alt="urwunge"/>
            <p>Urwunge</p>
          </Logo>
          <Sub autoComplete="off" onSubmit={handleAdminLogin}>
             <Input type="hidden" autoComplete="off"/>
             {/* {sponsorSignup && <FormControl>
                 <Label for="names">Names</Label> 
                 <Input type="text" id="names" name="names" 
                 onChange={handleChange} placeholder="Names"
                 required
                 />
                 </FormControl>} */}
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
              <Button onClick={handleAdminLogin} style={loading ? {padding: "0px"}: {}}>{!loading ? "Sign In": <Loader style={loading ? {marginLeft: "120px", marginTop: "-2px"}: {}}></Loader> }</Button>
              <UserBenefit>
                <RememberMe>
                   <Input type="checkbox" style={{cursor: "pointer"}} 
                   id = "remember" name="remember"/>
                    <Label for="remember" style={{cursor: "pointer"}}>Remember me</Label>
                   </RememberMe>  
                   <Link to="/forgotpassword">Forgot Password?</Link>   
              </UserBenefit>
          </Sub>
          {/* <BottomHeader>
             <p> Login as A 
             <Link to="/sponsorlogin" onClick={directToSponsorLogin} 
             > Sponsor</Link></p>
          </BottomHeader> */}
        </Wrapper>
      </Holder>
    );

}

export const Holder = styled.div`
   display: flex;
   flex-direction: column;
   width: 35%;
   padding: 30px;
   height: 100%;
   border-radius: 5px 0px 0px 5px;
   background: #fff;
`
export const Wrapper = styled.div`
position: relative;
 display: flex;
 height: 100% !important;
 flex-direction: column;
 width: 85%;
 margin: 60px auto;
 padding-left: 40px !important;
`
export const Logo = styled.div`
   height: 70px;
   width: 70px;
   justify-content: center;
   object-fit: cover;
   margin-left: 30px;
   align-items: center;
   margin-bottom: 20px;
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
      left: 140px;
   }
`
export const Sub = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const Image = styled.img`

`
export const FormControl = styled.div`
 display: flex;
 flex-direction: column;
`
export const Label = styled.label`
font-weight: bold;
/* opacity: 0.5; */
color: #807878;
      
`
export const Input = styled.input`
  margin: 6px 0px;
   width: 67%;
   padding: 7px 10px;
   border: 2px solid #5980801f;
   border-radius: 3px;
   outline: none;
   background: #abf5f55f;
   color: blue;
   :focus{  
      border: 2px solid dodgerblue;
   }
`
export const Button = styled.button`
  position: relative !important;
  width: 67%;
  padding: 13px 2px !important;
  background: #0000ffb9;
  color: #fff;
  border-radius: 3px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  outline: none;
  align-items: center;
  place-items: center;
`
export const UserBenefit = styled.div`
  margin-top: 15px;
  display: flex;
  position: relative;
  a{
     padding-top: 10px;
     text-decoration: none;
     font-size: 14px;
     width: 60%;
  }

`
export const BottomHeader = styled.div`
 position: absolute;
 bottom: -30px;
 a{
    text-decoration: none;
    color: blue;
 }
`
export const RememberMe = styled.div`
   margin: 10px;
   display: flex;
   position: absolute;
   left: -3%;
   width: 40%;
   position: relative;
   align-items: center;
   input{
      width: 10%;
      margin-right: 4px;
   }
   label{
      font-weight: normal;
      font-size: 12px;
      width: 80% !important;
      color: #000000;
   }
`
 export const Loader = styled.div`
     height: 12px;
     width: 12px;
     border-radius: 50%;
     background: transparent;
     border: 3px solid lightgray;
     border-top: 3px solid transparent;
     margin-left: 200px;
     margin-top: 5px;
     animation: spin 1s linear infinite;
     @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
 /* position: absolute; */
`