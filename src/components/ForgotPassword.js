import React,{useState} from "react";
import styled from "styled-components";
import Shield from "../assets/forgot.png"
// import axios from "axios";
import {toast} from "react-toastify";
import {request} from "../apiHandler/Authapi";
import { useHistory } from "react-router-dom";
import SimpleHeader from "./SimpleHeader";

const ForgotPassword = () =>{
   
    const [email,setEmail]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const history=useHistory();

    const handleData = async (e) =>{
         e.preventDefault();
        if(email===""){
            toast.error("Email is required!");
        }else{
            try{
                setIsLoading(true);
              let res= await  request("auth/resetPassword", "POST", {  email }, {"Content-Type":"application/json"});
              console.log(res);
                if(res.error){
                    setIsLoading(false)
                    toast.error(res.error);
                }
                 if(res.message){
                     setIsLoading(false)
                      history.push("/resetMessage");
                }
           
               }catch(err){
                       console.log(err);
                       toast.error("Unexpected error occurred!");
               }
        }
 
       
    }

    return (
        <Holder>
        <SimpleHeader />
        <Container>
          <div className="form-container">
          <img src={Shield} alt="The logo for verification"/>
          <p>Forgot password?</p>
           <form onSubmit={handleData}>
                <div className="row" required>
                    <input className="outline-none" type="email" onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Enter an email to reset your account!"
                    />
                </div>
                <div className="row">
                    <button>{ !isLoading?"Submit" : <div className="loader outline-none"></div>}</button>
                </div>
           </form>
           </div>
        </Container>
        </Holder>
        
    )
}

const Container=styled.div`
margin: 0px;
padding: 0px;
width: 100%;
height: 100vh;
background: #d5def5;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center; 
.form-container{
    background: white;
    border-radius: 10px;
    padding: 5%;
    form{
        margin-top: 10px;
    }
}
.form-container  img{
    margin: 0px auto;
}
 .row{
     margin-top: 10px;
 }
 .row input{
     border: 1px solid black;
     width: 300px;
     height: 40px;
     border-radius: 4px;
     padding: 2px 10px;
     border:   1px solid rgba(30, 140, 250, 0.9);
     outline: none;
 }
 .row button{
     border: none;
     border-radius: 4px;
     background: dodgerblue;
     padding: 10px;
     color: white;
     width: 100%;
     cursor: pointer;
 }
 .loader{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 5px solid lightgray;
    border-top: 5px solid dodgerblue;
    animation: spinner 1s linear infinite; 
    margin: 0px auto;
  }
  @keyframes spinner{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
 @media only screen and (max-width: 620px){
    margin: 0px;
    padding: 20% 10px;
    display: block;
    .form-container{
       width: 98%;
    }

    .row input{
        border: 1px solid black;
        width: 100%;
    }
 
 }
`
const Holder = styled.div`
  height: 100vh;
  width:100%;
  display: flex;
  flex-direction: row;
  position: relative;
`

export default ForgotPassword;