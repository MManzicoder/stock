import React, { useState , useEffect} from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {request, getRequest} from "../apiHandler/Authapi"
import { toast, ToastContainer } from 'react-toastify';
import CurrencyFormat from "react-currency-format";
function Report() {
   const dObj = new Date();
   const today = new Date(dObj.setDate(dObj.getDate()));
   const [date, setDate]= useState(today);
   const [history, setHistory] = useState({});
   const [stock, setStock] = useState({});
   const [orders, setOrders] = useState([]);
   const [price, setPrice] = useState(0);
  const onChange  = e =>{    
    setDate(e.target.value);
  }
  const getHistory = ()=>{
    request("history/date", "POST", {date},{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      if(res.error){
        console.log(res.error)
      }
        setHistory(res.history);
    })
  }
  
const getStock = ()=>{
    getRequest("stock", {"bearer": `${localStorage.getItem("auth")}`})
    .then(res=>{
      setStock(res.stock)
    })
    .catch(err=>console.log(err.message))
}
const getOrders = ()=>{
    request("orders/orders/date", "POST", {date: date},{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setOrders(res.orders)
    })
    .catch(err=>console.log(err.message))
}
let NoPaid = 0;
let Paid = 0;
let paidAmount =0;
let notpaidAmount = 0;
let totalQuantity =0;
if(orders.length > 0){
  orders.map((or, i)=>{
    if(or.status == "Paid"){
      Paid++;
      paidAmount += or.quantity * or.price;
     }else{
       NoPaid++;
       notpaidAmount += or.quantity * or.price;
     }
  })
}
console.log(totalQuantity)
const retrievePrice = ()=>{
  getRequest("price", {"bearer": `${localStorage.getItem("auth")}`})
  .then(res=>{
    if(res.error){
      toast.error(res.error)
    }
    setPrice(res.price.amount)
  })
}
  useEffect(()=>{
    getHistory();
    getOrders();
    getStock();
    retrievePrice();
  }, [date])

    return (
      <Layout>
        <Main>
          <Wrapper>
            <h2>Report for the stock</h2>
            <Filter>
              <Label>Date</Label>
              <DateTimePickerComponent  name="date" value={date} onChange={onChange} max={today}/> 
            </Filter>
            <ReportDiv>
               <ReportIssueSection><p>Ingredients used</p><p>
                {!history ? (0 +"KG"): history.ingredients+"KG"}</p>
                </ReportIssueSection>
               <ReportIssueSection><p>Beer produced (Cazier) </p><p>
                 {!history ? 0 : history.stock }</p></ReportIssueSection>
               <ReportIssueSection><p>Beer Left (Cazier) </p>
               <p>{ stock.quantity }</p></ReportIssueSection>
               <ReportIssueSection><p>Registered orders</p><p>
                 {orders.length}</p></ReportIssueSection>
               <ReportIssueSection><p>Paid orders</p><p>{Paid}</p></ReportIssueSection>
               <ReportIssueSection><p>Not paid orders</p><p>{NoPaid}</p></ReportIssueSection>
               <ReportIssueSection><p>Gained Amount</p>
               <p><CurrencyFormat value={paidAmount}  suffix=" Frw" 
               thousandSeparator={true} displayType={"text"} /></p></ReportIssueSection>
               <ReportIssueSection><p>Expected Amount</p>
               <p><CurrencyFormat value={paidAmount + notpaidAmount}  suffix=" Frw" 
               thousandSeparator={true} displayType={"text"} /></p></ReportIssueSection>
               <DownloadReport>
                  <DownloadButton >Download</DownloadButton>
               </DownloadReport>
            </ReportDiv>
          </Wrapper>          
        </Main>
      </Layout>
    )
}

export default Report

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
const ReportDiv = styled.div`
 width: 60%;
 margin: auto;
 height: 65vh;
 border: 3px dashed rgba(30, 140, 250, 0.5);
 border-radius: 7px;
 @media screen and (max-width: 1024px){
   width: 80%;
   height: 40vh;
 }
  @media screen and (max-width: 768px){
     width: 98%;
     height: 45vh;
   }
  @media screen and (max-width: 540px){
     width: 100%;
     height: 50vh;
   }
  @media screen and (max-width: 540px){
     width: 100%;
     height: 60vh;
   }
   @media screen and (max-width: 360px){
     height: 88vh;
     margin-top: 15vh;
   }
`
const ReportIssueSection = styled.div`
   width: 100%;
   margin: 30px auto;
   justify-content: space-around;
   display: flex;
   p{
     width: 40%;
     font-size: 20px;
     height: 7px;
     margin-left: 40px !important;
    @media screen and (max-width: 540px){
      font-size: 15px;
      width: 45%;
      }
      @media screen and (max-width: 360px){
      font-size: 15px;
      width: 50%;
      margin-top: 25px;
      }

   }
`
const DownloadReport = styled.div`
   width: 20%;
   margin: 45px auto;
   height: 40px;
   border-radius: 35px;
  @media screen and (max-width: 1024px){
   margin-top: 80px;
   width: 23%;
 }
  @media screen and (max-width: 540px){
   /* margin-top: 80px; */
   width: 30%;
 }
 @media screen and (max-width: 450px){
   /* margin-top: 80px; */
   width: 60%;
 }
`
const DownloadButton = styled.button`
    width: 100%;
    height: 100%;
    background: rgba(30, 140, 250, 0.9);
    text-align: center;
    border-radius: 7px;
    color: #fff;
    justify-content: center;
    cursor: pointer;
    place-items: center;  
    font-size: 20px;
    border: none;
`
const Filter = styled.div`
 position: absolute;
 top: 20px;
 right: 20px;
 width: 30%;
`
const Label = styled.label`

`