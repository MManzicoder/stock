import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout";
import { Link, useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../components/AdminLogin";
import { getRequest, request } from '../apiHandler/Authapi';
import { toast, ToastContainer } from 'react-toastify';
function EditOrder() {
const history = useHistory();
const { orderId } = useParams();
const [loading, setLoading] = useState(false);
const [order, setOrder] = useState({
        recipientphone: "",
        address: "",
        quantity: 0,
        price: 0,
        status: "",
        delivery: 0
    })
const handleChange = e =>{
    setOrder({
        ...order,
        [e.target.name]: e.target.value
    })
}
const getOrder = ()=>{
  getRequest(`orders/${orderId}`, {bearer: `${localStorage.getItem("auth")}`})
  .then(res=>{
    setOrder(res.order);
  })
}

const saveOrder = () =>{
    if(order.name =="" || order.quantity == 0 || order.address =="" || order.price == 0){
        toast.error("All fields are required!")
        setLoading(false);
        return;
    }
    setLoading(true);
        request(`orders/${orderId}`, "PUT", 
        order, {"bearer":`${localStorage.getItem("auth")}`, 
        "Content-Type":"application/json"})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error)
            }
            toast.success(res.message);
            history.push("/orders");
        })
        .catch(err=>console.log(err.message))
}
useEffect(()=>{
   getOrder();
},[orderId]);
  return (
      <Layout>

        <Main>
          <ToastContainer position="top-center" autoClose={3000} />
          <Wrapper>
              <h2>Edit order</h2>
             <Sub>
                <Form>
                  <FormControl>
                    <Label>Recipient</Label>
                   <Input type='text' name='recipientphone' value={order.recipientphone} 
                   disabled={loading} onChange={handleChange} required placeholder='client phone'/>
                  </FormControl>
                  <FormControl>
                    <Label>Address</Label>
                   <Input type='text' name='address' value={order.address} disabled={loading} 
                   onChange={handleChange} required placeholder='client location'/>
                  </FormControl>                  
                    <FormControl>
                      <Label>Quantity</Label>
                      <Input type='text' name='quantity' placeholder='Enter quantity' 
                      disabled={loading} value={order.quantity} onChange={handleChange} required/>
                    </FormControl>
                    <FormControl>
                      <Label>Price</Label>
                      <Input type='text' name='price' placeholder='Enter price' disabled={loading} 
                      value={order.price} onChange={handleChange} required/>
                    </FormControl>                                      
                    <FormControl>
                      <Label>Status</Label>
                      <Select  name='status' disabled={loading} value={order.status} onChange={handleChange} required>
                          <option value={""}>select status</option>
                          <option value={"Paid"}>Paid</option>
                          <option value={"Not paid"}>Not paid</option>
                      </Select>
                    </FormControl>                     
                                         <FormControl>
                      <Label htmlFor='delivery'>Delivery & Food</Label>
                      <Input type='text' id='delivery' name='delivery' placeholder='Enter delivery price and food' disabled={loading} 
                      value={order.delivery} onChange={handleChange} required/>
                    </FormControl>
                 
               </Form>
              <Actions>
                 <AddButton>
                   <Button className='add' onClick={saveOrder}>{!loading ? "Save": 
                    <Loader style={{marginLeft: "40%", marginTop: 0, height: 20, width: 20}}></Loader>}
                   </Button>
               </AddButton>
                <AddButton>
                   <Link to={"/orders"} className='cancel'>Cancel</Link>
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
`
const Select = styled.select`
 width: 70%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
 font-size: 16px;
 border-radius: 5px;
 outline: 1px solid rgba(30, 140, 250, 0.9);
`
const Input = styled.input`
 width: 70%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
 font-size: 16px;
 border-radius: 5px;
 outline: 1px solid rgba(30, 140, 250, 0.9);
`

const Sub= styled.div`
   display: flex;
   flex-direction: column;
   width: 60%;
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