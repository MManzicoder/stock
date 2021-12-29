import React,{useState} from "react";
import styled from "styled-components";
// import Shield from "../assets/Shield.svg"
import {toast} from "react-toastify";
import {request} from "../apiHandler/Authapi";
import { useHistory } from "react-router-dom";

const Resend = () =>{
   
    const [email,setEmail]=useState("");
    const history=useHistory();

    const handleData = async (e) =>{
         e.preventDefault();
        if(email===""){
            toast.error("Please fill the required field");
        }else{
            try{

              let res= await  request("users/resendCode", "POST", { email: email }, {"Content-Type":"application/json"});

                if(res.error){
                    toast.error(res.error);
                }
                 if(res.message){
                      history.push("/verifyMessage");
                }
           
               }catch(err){
                       console.log(err);
                       toast.error("Unexpected error occurred!");
               }
        }
 
       
    }

    return (
        <>
        <Container>
          <div className="form-container">
          {/* <img src={Shield} alt="The logo for verification"/> */}
          <h2 style={{textAlign:"center"}}><strong style={{color:"dodgerblue"}}>SHAKA</strong> account verification</h2>
           <form onSubmit={handleData}>
                <div className="row" required>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Enter an email"
                    />
                </div>
                <div className="row">
                    <button>Resend</button>
                </div>
           </form>
           </div>
        </Container>
        </>
    )
}

const Container=styled.div`
margin: 0px;
padding: 0px;
width: 100%;
height: 85vh;
background: #dfecf5;
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: center; 
.form-container{
    margin-top: 20px;
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
     border: 1px solid black;
     width: 300px;
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

export default Resend;