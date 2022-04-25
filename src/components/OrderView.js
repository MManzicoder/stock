import React, { useState, useRef } from 'react';
import styled from "styled-components";
import CurrencyFormat from "react-currency-format"
import { Close, Check, Delete, Edit } from "@material-ui/icons";

function OrderView({ data, show}) {
 const [showView, setShowView] = useState(show);
 const modalRef = useRef();
 const closeModal = e =>{
        if(modalRef.current === e.target){
            setShowView(false);
        }
    }
const closeAllStaff = () =>{
        setShowView(false);

    }
  return (
      showView && <Background ref={modalRef} onClick = { closeModal }>
            <Wrapper className={`${ showView ? "animate": "" }`} 
            style={{height: 400, padding: 15}}>
              <h2>Order details</h2>             
              <Holder>
               <Field><p><Check className='check' /><span> Client Contact</span></p> 
               <p>{data.recipientphone}</p></Field>
               <Field><p><Check className='check' /><span> Client location</span></p> 
               <p>{data.address}</p></Field>
               <Field><p><Check className='check' /><span> Quantity</span></p> 
               <p>{data.quantity+" crates"}</p></Field>                              
               <Field><p><Check className='check' /><span> Price</span></p> 
               <p><CurrencyFormat value={data.price} thousandSeparator={true} 
               suffix=" Frw" displayType={"text"}/></p></Field>
               <Field><p><Check className='check' /><span> Amount</span></p> 
               <p><CurrencyFormat value={data.amount} thousandSeparator={true} 
               suffix=" Frw" displayType={"text"}/></p></Field>                              
               <Field><p><Check className='check' /><span> Ordered Date</span>
               </p> <p>{new Date(data.createdAt).toDateString()}</p></Field>               
               <Field><p><Check className='check' /><span> Status</span></p> 
               <p>{data.status}</p></Field>
               <Field><p><Check className='check' /><span> Delivery & Food </span></p> 
               <p><CurrencyFormat value={50000} thousandSeparator={true} suffix=" Frw" 
                displayType={"text"}/></p></Field>                              
              </Holder>
              <ActionSection>
                <Action 
                style={{marginLeft:"100px", marginRight: "30px", borderColor:"dodgerblue"}}>
                 <Edit className="edit"/> <span className='ed'>Edit</span>
                </Action>
                <Action style={{borderColor: "#ff0066"}}>
                    <Delete className="delete" /><span className='del'>Delete</span>
                </Action>
              </ActionSection>
            <CloseModalButton onClick={closeAllStaff} />
           </Wrapper>
        </Background>
  )
}
const Background = styled.div`
      position: absolute;
      top: 0px;
      left: 0%;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 5000 !important;
      .animate{
    top: 10vh !important;
}
    @media screen and (max-width: 1024px){
        height: 100vh !important;
        .animate{
            top: 20vh !important
        };
        .wrapp{
            height: 50vh !important;
        }
    }
}
  @media screen and (max-width: 450px){
      height: 103vh !important;
  }
 @media screen and (max-width: 380px){
      height: 125vh !important;
  }
`


const Wrapper = styled.div`
      font-family: 'Roboto';
      width: 40%;
      height: 100vh;
      position: relative;
      top: -100%;
      background: #fff;
      z-index: 5000 !important;
      background: #fff;
      border-radius: 5px;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
  h2{
      text-align: center;
      opacity: 0.7;
      color: dodgerblue;
  }
   @media screen and (max-width: 280px){
       h2{
           font-size: 15px !important;
       }
   }
       @media screen and (max-width: 1024px){
         height: 35vh !important;
         width: 70%;
    }
    @media screen and (max-width: 768px){
         height: 40vh !important;
         width: 70%;
    }
    @media screen and (max-width: 768px){
         width: 85%;
         height: 60vh !important;
    }
    @media screen and (max-width: 450px){
         width: 98%;
    }
    @media screen and (max-width: 380px){
      height: 70vh !important;
  }
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
const Holder = styled.div`
 width: 80%;
 margin: 30px auto;
 display: flex;
 flex-direction: column;
 align-items: center;

 div{
     width: 100% !important;
     display: flex;
     align-items: center; 
 }
 @media screen and (max-width: 380px){
      width: 100% !important;
  }
   @media screen and (max-width: 360px){
      width: 90% !important;
  }
`
const Field = styled.div`
margin-bottom: 3px;
 p{
     width: 50%;
     display: flex;
     align-items: center;
     font-size: 16px;
 }
 .check{
    color: dodgerblue;
    margin-right: 10px;
 }

`
const ActionSection = styled.div`
     display: flex;
     align-items: center;
     width: 80%;
     margin: 0 auto;
     @media screen and (max-width: 540px){
        margin-left: -20px;
    }
        @media screen and (max-width: 450px){
         width: 90%;
    }
    @media screen and (max-width: 360px){
      width: 98% !important;
  }
`
const Action = styled.div`
   width: 22%;
   height: 40px;
   border: 1px solid black;
   cursor: pointer;
   border-radius: 7px;
   display: flex;
   align-items: center;
   padding-left: 10px;
   .edit, .ed{
       color: dodgerblue;
   }
   .edit,. .delete{
       font-size: 10px !important;
   }

   .delete, .del{
       color: #ff0066;
   }
   font-size: 15px;
   @media screen and (max-width: 540px){
         width: 30%;
    }
    @media screen and (max-width: 450px){
         width: 35%;
    }
    @media screen and (max-width: 380px){
      width: 40%;
  }
     @media screen and (max-width: 360px){
      width: 50% !important;
  }
`
export default OrderView