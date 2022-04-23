import React, { useContext, useState } from "react";
import { useHistory} from "react-router-dom"
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { adminLoginHandler } from "../apiHandler";
import { request } from "../apiHandler/Authapi";
import karame from "../assets/target.png";
import { toast, ToastContainer } from 'react-toastify';
// import { Modes } from "../utils/context";
export const AdminLogin = ()=>{
      const history = useHistory();
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
     request("auth/login","POST", user, {
        "Content-Type":"application/json"
     })
      .then(data=>{
         setLoading(false);
         if(data.error){
            toast.error(data.error)
         }
         if(data.token){
            localStorage.setItem("auth", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))
            if(data.user.userType ==="ADMIN"){
               history.push("/dashboard")               
            }else{
               toast.error("Admin resource access denied!");
            }
         }
      })
      .catch(err=>{
         setLoading(false);
         toast.error("An error occured try again!");
         console.log(err.message)
      });
 }
    return(
      <Holder>
         <ToastContainer  position="top-center" draggable autoClose={2000} />
        <Wrapper className="wrapp">
          <Logo>
            <Image src={karame} alt="karame"/>
            <p>Ubwiza</p>
          </Logo>
          <Sub className="sub" autoComplete="off" onSubmit={handleAdminLogin}>
             <Input type="hidden" autoComplete="off"/>
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
              <Button onClick={handleAdminLogin} style={loading ? {padding: "0px"}: {}}>
                 {!loading ? "Sign In": <Loader style={loading ? {marginLeft: "100px", marginTop: "-2px"}: {}}>
                 </Loader> }
                 </Button>
              <UserBenefit className="userbenefit">
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
   @media only screen and (max-width: 768px){
      width: 100%;
      .wrapp{
         width:80%;
         margin: 15vh auto;
         .sub{
            margin-top: 50px;
         }
      }
   @media screen and (max-width: 539px){
      .wrapp{
         width: 100%;
      }
   }
   @media screen and (max-width: 359px){
      width: 100% !important;
      .wrapp{
         width: 100% !important;
         /* background: blue; */
         .sub{
             width: 100% !important;
         }
      }
   }
   }

`
export const Wrapper = styled.div`
position: relative;
 display: flex;
 height: 100% !important;
 flex-direction: column;
 width: 85%;
 margin: 60px auto;
 padding-left: 40px !important;
 @media screen and (max-width: 1024px){
    width: 90% !important;
    .sub{
       input, button{
          width: 100%;
       }
    }
    .userbenefit{
       display: block;
    }
    
 }
 @media screen and (max-width: 450px){
      height: 100vh !important;
 }
 @media screen and (max-height: 360px){
    width: 100% !important;
 }
`
export const Logo = styled.div`
   height: 70px;
   width: 70px;
   justify-content: center;
   object-fit: cover;
   margin-left: 30px;
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
      left: 145px;
   }
`
export const Sub = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 450px){
  }
`
export const Image = styled.img`

`
export const FormControl = styled.div`
 display: flex;
 flex-direction: column;
 @media screen and (max-width: 450px){
    input{
       width: 80%;
    }
 }
 @media screen and (max-width: 360px){
    input{
       width: 100% !important;
    }
    
 }
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
   @media only screen and (max-width: 360px){
      width: 100%;
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
  @media screen and (max-width: 450px){
     width: 80%
  }
  @media screen and (max-width: 360px){
     width: 100%;
  }
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

  @media only screen and (max-width: 450px){
    display: block !important;
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
   @media screen and (max-width: 1024px){
      width: 100% !important;
      input{
         width: 7%;
         margin-left: -80px;
      }
      label{
         width: 90%;
         margin-left: -100px;
      }
   }
   @media screen and (width: 820px){
      display: block;
    input{
         width: 7%;
         /* margin-left: 0px; */

      }
      label{
         width: 90%;
         margin-left: -30px;

      }
   }
   @media screen and (max-width: 450px){
      width: 100% !important;
   }
   @media screen and (max-width: 280px){
      input{
         width: 7%;
         margin-left: -80px;
      }
      label{
         width: 90%;
         margin-left: -60px;
      }
   }
   @media screen and (width: 540px){
      label{
         width: 90%;
         margin-left: -140px;
      }
   }
   @media screen and (width: 912px){
      label{
         width: 90%;
         margin-left: -80px;
      }
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