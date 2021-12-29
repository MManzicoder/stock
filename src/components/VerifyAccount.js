import React, {useEffect,  useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components"
import { useParams} from "react-router-dom";
import { request } from '../apiHandler/Authapi';
import { toast, ToastContainer } from 'react-toastify'


function VerifyAccount() {

    const { verificationCode } = useParams();
    
    const history = useHistory();
    const [loading, setLoading] = useState(false);
 
 
const validateString = () =>{
    setLoading(true);
    request("users/confirmEmail", "POST", { verificationCode: verificationCode.toString() }, {"Content-Type":"application/json"})
     .then(data=>{
         setLoading(false);
         if(data.user){     
            localStorage.setItem("auth", data.token);
             localStorage.setItem("user", JSON.stringify(data.user));
            history.push("/dashboard");
         }
         if (data.error) {
             if(data.error==="Verified"){
                 toast.info("Already registered. Please login ");
                 history.push("/account");
             }else{
                toast.error(data.error);
             }
            
        }
     })
     .catch(error =>{
       toast.error("An unexpected error occurred!");
     })
}
useEffect(()=>{
      validateString()
}, [verificationCode])
    return (
        
            <Wrapper>
                <ToastContainer position="top-center" autoClose={3000} />

             </Wrapper>
        
    )
}

const Wrapper=styled.div`
width: 100%;
height: 100vh;
background-color: #dfecf5;
padding-top: 20px;
`

export default VerifyAccount
