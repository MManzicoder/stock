import React from 'react'
import Layout from "../components/Layout";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../components/AdminLogin";
import { request } from '../apiHandler/Authapi';
import { toast, ToastContainer } from 'react-toastify';
function EditOrder() {
const { orderId } = useParams();
  return (
      <Layout>
        <Main>
          <Wrapper>
              <h2>{orderId}</h2>
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
               </Form>
               <AddButton>
                   <Button onClick={saveOrder}>{!loading ? "Add": 
                    <Loader style={{marginLeft: "40%", marginTop: 0, height: 20, width: 20}}></Loader>}
                   </Button>
               </AddButton>
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
   width: 70%;
   margin: 10px auto;
  @media screen and (max-width: 450px){
         width: 90%;
    }
`
const AddButton = styled.div`
  width: 30%;
  height: 40px;
  margin: 25px auto;

`
const Button = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 7px;
  background:rgba(30, 140, 250, 0.9);
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
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