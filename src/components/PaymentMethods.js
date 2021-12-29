import React, {useState,useEffect} from "react";
import styled from "styled-components";
import "../styles/PaymentMethodsStyles.css";
import Axios from "axios";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const PaymentMethods=({bankMethod,mobileMethod,load})=>{

     const token=localStorage.getItem("auth");
    
     const [cardHolder,setCardHolder]=useState("");
     const [cardNumber,setCardNumber]=useState("");
     const [cardExpiration,setCardExpiration]=useState("");
     const [cardSecurityCode,setCardSecurityCode]=useState("");
     const [isLoading,setIsLoading]=useState(false);
     const [userProducts,setUserProducts]=useState([]);

     const [mobileNumber,setMobileNumber]=useState("");
     const [payment,setPayment]=useState('');

     useEffect( async () =>{
         try{
           let res= await Axios.get("https://shaka-1.herokuapp.com/api/lostProducts/demons/user-products",{headers:{bearer:token}});
           
           setUserProducts(res.data.userProducts);
           setPayment(userProducts.length > 0 ? userProducts[0].category.price : "0")
           //toast.success(res.message);
         }catch(err){
            console.log(err);
         }
       
   },[])

     function handleBankPay(e){
        e.preventDefault();

    const bankPaymentObject={holder:cardHolder,cardNumber:cardNumber,expiration:cardExpiration,securityCode:cardSecurityCode};
    console.log(bankPaymentObject);

     }

   async  function handleMobilePay(e){
        e.preventDefault();
        const momoPaymentObject={mobileNumber:mobileNumber,payment:payment};
     if( !(/^07(8|9)\d{7}$/.test(mobileNumber))){
         toast.info("Invalid telephone number");
     }else{
    try {
            
        setIsLoading(true);       
        const res= await Axios.post("https://shaka-1.herokuapp.com/api/payments",momoPaymentObject,{headers:{bearer:token}});
        
          if(res.data.message){
              setIsLoading(false);
              window.open(res.data.paymentDetails.meta.authorization.redirect)
          }
           
    }
    catch(err){
        setIsLoading(false);
            toast.error("Unexpected event occurred!");
       }
     }
     
     }

    
 return (
  <LargeContainer >
            <Loader isLoading={isLoading}/>
            <div className="bank-container" style={isLoading ? {display:"none"} : {display:"block"}}>
            <Bank style={bankMethod ? {display:"block"}:{display:"none"}} >
                <form onSubmit={handleBankPay}>
                  <h2 style={{padding:"10px"}}> 
                    <FontAwesomeIcon icon={faExclamationTriangle} style={{color:"yellow",fontSize:"23px"}}/>   Bank Payment is currently unavailable
                       </h2>
                      <div className="bank-row">
                        <label htmlFor="cardHolderName">Card holder name</label>
                        <input type="text" className="form-control"
                         required placeholder="Enter cardHolder name"
                         onChange={(e) =>{setCardHolder(e.target.value)}}
                         />
                    </div>
                    <div className="bank-row">
                        <label htmlFor="cardHoldernumber">Card number</label>
                        <input type="text" className="form-control" 
                        required placeholder="Enter card numer"
                        onChange={(e) =>{setCardNumber(e.target.value)}}
                        />
                    </div>
                    <div id="special-bank-row">
                      <div className="sub-bank-row">
                        <label htmlFor="cardExpiration">Expiration</label>
                        <input type="date" className="form-control" 
                        required onChange={(e) =>{setCardExpiration(e.target.value)}}/>
                      </div>
                      <div className="sub-bank-row">
                        <label htmlFor="cardCode">Security code</label>
                        <input type="text" className="form-control" 
                        placeholder="Enter security code" required
                        onChange={(e) =>{setCardSecurityCode(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div id="button-bank-row">
                        <button type="submit" className="submit" onClick={load} disabled={true}>Pay now</button>
                        <button type="reset" className="reset">Reset</button>
                    </div>
                </form>

                </Bank>
                 </div>
                 
                <div className="mobilemoney-container" style={isLoading ? {display:"none"} : {display:"block"}}>
                <Mobile style={mobileMethod ? {display:"block"}:{display:"none"}}>
                  <form onSubmit={handleMobilePay}>
                  <div className="bank-row">
                        <label htmlFor="momoNumber">Mobile money number</label>
                        <input type="tel" className="form-control" 
                        required placeholder="Ex: 0780000000"
                        onChange={(e) =>{setMobileNumber(e.target.value)}}
                        />
                </div>
                <div className="bank-row">
                        <label htmlFor="amount">Payment amount</label>
                        <input type="number" className="form-control"  readOnly
                        required placeholder="Enter Payment amount" value={ userProducts.length > 0 ? userProducts[0].category.price : "0" }
                        onInput={(e) =>{setPayment(e.target.value)}}
                        />
                </div>

                <div id="button-bank-row">
                        <button type="submit" className="submit" disabled={!userProducts.length>0}>Pay now</button>
                        <button type="reset" className="reset">Reset</button>
                </div>
            </form>
                </Mobile>
                </div>
  </LargeContainer>
 )   
}

const LargeContainer=styled.div`


`

const Bank=styled.div`
width: 100%;

div.sub-bank-row{
    width: 100%;
}
div.sub-bank-row input{
    width: 99%;
    padding: 5px 15px;
    border-radius: 3px;
    border: 1px solid grey;
    height: 45px;
}
div.sub-bank-row input::placeholder{
    text-align: left;
}

@media only screen and (max-width:620px){
    div#special-bank-row{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
}

`
const Mobile=styled.div`
width: 100%;
div.bank-row{
    display: block;
}
div.bank-row label{
    display: block;
}
`

export default PaymentMethods;
