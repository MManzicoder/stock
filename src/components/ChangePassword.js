import React,{useState} from "react";
import styled from "styled-components";
// import Shield from "../assets/Shield.svg"
// import axios from "axios";
import {toast} from "react-toastify";
import {request} from "../apiHandler/Authapi";
import { useHistory } from "react-router-dom";

const ChangePassword = () =>{
   
    const [password,setPassword]=useState("");
    const [retype,setRetype]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const history=useHistory();
    
    const handleData = async (e) =>{
         e.preventDefault();
         setIsLoading(true);
        if(password==="" && retype===""){
            setIsLoading(false);
            toast.error("Please fill the required field");
        }else{
            setIsLoading(true);
            try{
                const uniqueNumber = history.location.pathname.split('/')[3]

              let res= await  request("users/confirmReset", "POST", {  newPassword:password,retype,uniqueNumber }, {"Content-Type":"application/json"});
             
                if(res.error){
                    setIsLoading(false);
                    toast.error(res.error);
                }
                 if(res.message){
                     setIsLoading(false);
                      history.push("/account");
                }
           
               }catch(err){
                       console.log(err);
                       toast.error("Unexpected error occurred!");
               }
        }
 
       
    }

    return (
        <Container>
          <div className="form-container">
          {/* <img src={Shield} alt="The logo for verification"/> */}
          <h2 style={{textAlign:"center"}}> Please Choose and Confirm a New Password</h2>
           <form onSubmit={handleData}>
                <div className="row " required>
                    <input className="text-black font-bold outline-none px-2" type="password" onChange={(e) => setPassword(e.target.value)} 
                     placeholder="Enter a new Password"
                    />
                </div>
                <div className="row border-0  " required>
                    <input className="text-black font-bold outline-none px-2" type="password" onChange={(e) => setRetype(e.target.value)} 
                     placeholder="Confirm Password"
                    />
                </div>
                <div className="row">
                    <button>{ !isLoading?"Reset account password" : <div className="loader"></div>}</button>
                </div>
           </form>
           </div>
        </Container>
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
    padding: 5%;
}
.form-container  img{
    margin: 0px auto;
}
 .row{
     margin-top: 10px;
 }
 .row input{
     background-color: rgba(191, 219, 225);
     width: 400px;
     height: 40px;
     border-radius: 4px;
     
 }
 .row button{
     border: none;
     border-radius: 4px;
     background: dodgerblue;
     padding: 10px;
     color: white;
     width: 100%;
 }

 .loader{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 5px solid lightgray;
    border-top: 5px solid #5e93ff;
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

export default ChangePassword;