import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { Loader } from "../components/AdminLogin"
import { Close } from "@material-ui/icons";
import "../styles/modal.css";
import { toast, ToastContainer } from 'react-toastify';
import { request } from '../apiHandler/Authapi';


const AddOrder = ({ showModal, setShowModal}) => {
    const [loading, setLoading] = useState(false);
    const [order, setIngredient] = useState({
        recipientphone: "",
        address: "",
        quantity: 0,
        price: 0,
        status: ""
    })
    const modalRef = useRef();
    const closeModal = e =>{
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }
    const closeAllStaff = () =>{
        setShowModal(false);

    }
const saveOrder = () =>{
    if(order.name =="" || order.quantity == 0 || order.address =="" || order.price == 0){
        toast.error("All fields are required!")
        setLoading(false);
        return;
    }
    setLoading(true);
        request("orders", "POST", 
        order, {"bearer":`${localStorage.getItem("auth")}`, 
        "Content-Type":"application/json"})
        .then(res=>{
            setLoading(false)
            console.log(res);
            if(res.error){
                toast.error(res.error)
            }
            toast.success(res.message);
            window.location ="/orders";
        })
        .catch(err=>console.log(err.message))
}
const handleChange = e =>{
    setIngredient({
        ...order,
        [e.target.name]: e.target.value
    })
}
    return (
        showModal ? (
        <Background ref={modalRef} onClick = { closeModal }>
            <ToastContainer position="top-center" autoClose={3000} />
           <Wrapper className={`${ showModal ? "animateOrder": "" }`} style={{height: 380, padding: 15}}>
               <h3>New Order</h3>
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
            <CloseModalButton onClick={closeAllStaff} />
           </Wrapper>
        </Background>
        ): null
    )
}
const Background = styled.div`
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 5000 !important;
    @media screen and (max-width: 1024px){
        height: 100vh !important;
        .animateOrder{
            top: 20vh !important;
        }
    }
    @media screen and (max-width: 768px){
    .wrapperHeight{
        height: 80vh !important;
    }
    @media screen and (max-width: 540px){
        height: 120vh !important;
}
}
  @media screen and (max-width: 450px){
      height: 103vh !important;
  }
  @media screen and (max-width: 380px){
      height: 125vh !important;
      .animateOrder{
            top: 40vh !important;
        }
  }
`


const Wrapper = styled.div`
      font-family: 'Roboto';
      width: 30%;
      height: 80vh;
      position: relative;
      top: -100%;
      background: #fff;
      z-index: 5000 !important;
      background: #fff;
      border-radius: 5px;
      padding-top: 20px;
      h3{
          text-align: center;
          font-size: 20px;
      }
      @media screen and (max-width: 1024px){
          width: 70% !important;
          height: 38vh !important;
      }
      @media screen and (max-width: 768px){
          height: 45vh !important;
      }
      @media screen and (max-width: 540px){
            width: 90% !important;
            height: 60vh !important;
   }
   @media screen and (max-width: 450px){
       .d-flexs{
           display: flex;
           flex-direction: column !important;
          input{
              width: 100% !important;
          }
          select{
              margin-top: 20px !important;
              width: 100% !important;
          }

       }
   }
  @media screen and (max-width: 380px){
         
  }
   @media screen and (max-width: 280px){
       h2{
           font-size: 15px !important;
           font-weight: bold;
           opacity: 0.7;
       }
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
`

 const CloseModalButton = styled(Close)`
   cursor: pointer;
   position: absolute;
   top: 10px;
   right: 10px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
   border: 1px solid dodgerblue;
   border-radius: 50%;
   :hover{
       border-color: #ff0066;
       color: dodgerblue;
   }
   @media screen and (max-width: 540px){
       right: 5%;
       height: 40px !important;
       width: 40px !important;
       border: 3px solid dodgerblue;
       border-radius: 50%;
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
export default AddOrder