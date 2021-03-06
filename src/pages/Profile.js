import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout";
import { Link, useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../components/AdminLogin";
import { getRequest, request } from '../apiHandler/Authapi';
import { toast, ToastContainer } from 'react-toastify';
function EditOrder() {
const history = useHistory();
const [loading, setLoading] = useState(false);
const[user, setUser] = useState({
  username: "",
  email:"",
  userType:"",
  password:""
})
const handleChange = e =>{
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
}

const saveUser = () =>{
    if(user.username =="" || user.email== "" || user.userType =="" || user.password == ""){
        toast.error("All fields are required!")
        setLoading(false);
        return;
    }
    setLoading(true);
        request("register", "POST", 
        user, {"bearer":`${localStorage.getItem("auth")}`, 
        "Content-Type":"application/json"})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error)
            }
            toast.success(res.message);
            history.push("/dashboard");
        })
        .catch(err=>console.log(err.message))
}

  return (
      <Layout>

        <Main>
          <ToastContainer position="top-center" autoClose={3000} />
          <Wrapper>
              <h2>Add new user</h2>
             <Sub>
                <Form>
                  <FormControl>
                    <Label>Username</Label>
                   <Input type='text' name='username' value={user.username} 
                   disabled={loading} onChange={handleChange} required placeholder='username'/>
                  </FormControl>
                  <FormControl>
                    <Label>Email</Label>
                   <Input type='text' name='email' value={user.email} disabled={loading} 
                   onChange={handleChange} required placeholder='user email'/>
                  </FormControl>    
                  <FormControl>
                    <Label>Password</Label>
                   <Input type='text' name='password' value={user.password} disabled={loading} 
                   onChange={handleChange} required placeholder='user password'/>
                  </FormControl>    
                  <FormControl>
                    <Label>userType</Label>
                    <Select  name='userType' disabled={loading} value={user.userType} onChange={handleChange} required>
                          <option value={""}>userType</option>
                          <option value={"MANAGER"}>MANAGER</option>
                          <option value={"OTHER"}>OTHER</option>
                      </Select>

                  </FormControl>
               </Form>
              <Actions>
                 <AddButton>
                   <Button className='add' onClick={saveUser}>{!loading ? "Save": 
                    <Loader style={{marginLeft: "40%", marginTop: 0, height: 20, width: 20}}></Loader>}
                   </Button>
               </AddButton>
                <AddButton>
                   <Link to={"/dashboard"} className='cancel'>Cancel</Link>
               </AddButton>
              </Actions>
             </Sub>
          </Wrapper>    
        </Main>        
      </Layout>
  )
}

export default EditOrder

const Main = styled.div`
   width: 101%;
   height: 90vh;
    background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
   @media screen and (max-width: 768px){
     width: 100%;
     height: 93vh;
   }
   @media screen and (max-width: 360px){
     height: 113vh;
   }
`
const Wrapper = styled.div`
    width: 99%;
    margin: 2px auto;
    position: relative;
    height: 85vh;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    h2{
      opacity: 0.7;
    }
    @media screen and (max-width: 540px){
     h2{
       text-align: left !important;
       font-size: 18px;
       position: absolute;
       left: 5%;
       
     }
   }
     @media screen and (max-width: 360px){
     height: 110vh;
   }
`

const Form = styled.form`
   width: 80%;
   margin: 10px auto;
  @media screen and (max-width: 450px){
         width: 90%;
    }
    @media screen and (max-width: 375px){
     width: 96%;
   }
  
`
const Actions = styled.div`
  display: flex;
 width: 50%;
 margin: 10px auto;
 align-items: center;

`
const AddButton = styled.div`
  position: relative; 
  width: 15%;
  height: 40px;
  margin: 25px auto;
 .add{
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 7px;
  background:rgba(30, 140, 250, 0.9);
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
  @media screen and (max-width: 450px){
    position: absolute;
    margin-left: -70% !important;
    /* left: -20% !important; */
  }
 }
 .cancel{
   padding: 7px 15px;
   background: #ff0066;
   color: #fff;
   text-decoration: none;
   border-radius: 7px;
   margin-top: 100px;
    position: absolute;
    top: -100px;
 }
`
const Button = styled.button`
  `
const FormControl = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
`
const Label = styled.label`
 width: 30% !important;
 @media screen and (max-width: 450px){
   width: 40% !important;
 }
`
const Select = styled.select`
 width: 70%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
 font-size: 16px;
 border-radius: 5px;
 outline: 1px solid rgba(30, 140, 250, 0.9);
 @media screen and (max-width: 450px){
   width: 60%;
 }  
`
const Input = styled.input`
 width: 70%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
 font-size: 16px;
 border-radius: 5px;
 outline: 1px solid rgba(30, 140, 250, 0.9);
 @media screen and (max-width: 450px){
   width: 60%;
 }
`

const Sub= styled.div`
   display: flex;
   flex-direction: column;
   width: 40%;
   height: auto;
   padding: 10px;
   border: 3px dashed rgba(30, 140, 250, 0.5);
   margin: 20px auto;
   border-radius: 5px;
   @media screen and (max-width: 768px){
     width: 80%;
   }
   @media screen and (max-width: 540px){
     margin-top: 50px;
     width: 98%;
   }
   @media screen and (max-width: 375px){
     /* margin-top: 50px; */
     width: 100%;
   }
`