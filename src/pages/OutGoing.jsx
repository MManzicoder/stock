import React , { useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import Chart from '../components/Chart'
import { DoubleArrowOutlined} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import AddOrder from '../components/AddOrder'
import Table from '../components/Table'
import { getRequest } from '../apiHandler/Authapi'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
function OutGoing () {
    const [ showModal , setShowModal ] = useState(false);
    const [orders, setOrders] = useState([]);
    const [paid, setPaid] = useState({
      name: "Paid orders",
      quantity: 0
    })
    const [notPaid, setNotPaid] = useState({
      name: "Not Paid orders",
      quantity: 0
    })    
   const getOrders = ()=>{
     getRequest("orders", {"bearer": 
     `${localStorage.getItem("auth")}`})
     .then(res=>{
       if(res.error){
         toast.error(res.error)
       }
       setOrders(res.orders);
        setPaid({
          ...paid,
          quantity: res.paid
        });
        setNotPaid({
          ...notPaid,
          quantity: res.notPaid
        });
     })
     .catch(err=>console.log(err.message))
   }
   useEffect(()=>{
      getOrders();
   }, [])
    return (
        <Holder>
                <Layout>
        <Main>
          <Wrapper>
            <FirstSection>
                <Card>
                        <Label>{paid.name} </Label>
                     <p>{" "+paid.quantity}</p>
                   </Card>
                 <ArrowDefine>
                   <DoubleArrowOutlined className='icon'/>
                   <DoubleArrowOutlined className='icon'/>
                 </ArrowDefine>
                <Card>
                        <Label>{notPaid.name} </Label>
                     <p>{" "+notPaid.quantity}</p>
                   </Card>
                 
            </FirstSection>
            <SecondSection>
              <Orders>
                 <Table/>
              </Orders>
              <ButtonDiv>
                 <AddButton 
                 onClick={()=>setShowModal(true)}
                 >Add order</AddButton>
              </ButtonDiv>
            </SecondSection>
          </Wrapper>         
        </Main>
      </Layout>
      {showModal && (<AddOrder showModal={showModal} setShowModal={setShowModal}/>)}
        </Holder>
    )
}

export default OutGoing
const Holder= styled.div`
width: 100%;
height: 100vh;
position: relative;
`
const Main = styled.div`
   width: 101%;
   height: 90vh;
   background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
   display: flex;
    @media screen and (max-width: 768px){
     width: 100%;
     height: 93vh;
   }
`
const Wrapper = styled.div`
    width: 99%;
    margin: 2px auto;
    height: 85vh;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 20px;
    flex-wrap: wrap;
    @media screen and (min-width: 540px){
     height: 87 vh;
   }   
`
const FirstSection = styled.div`
      width: 60%;
      height: 10vh; 
      display: flex;
      justify-content: space-around;  
      margin: 20px auto;
      @media screen and (max-width: 1024px){
      width: 80%;   
   }
   @media screen and (max-width: 540px){
         width: 100%;
    }
`
const SecondSection = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto;
  justify-content: space-around;
`
const Card = styled.div`
  width: 28%;
  height: 100px;
  background: #fff;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  align-items: center;
  box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
  label{
    font-weight: bold;
  }
  @media screen and (max-width: 1024px){
      width: 34%;   
   }
`
const ArrowDefine = styled.div`
     width: 10%;
     height: 100px;
     align-items: center;
     justify-content: center;
     place-items: center;
     text-align: center;
     .icon{
       margin-top: 40px;
       color:rgba(30, 140, 250, 0.9);
     }
     @media screen and (max-width: 768px){
         width: 15%;
    }
`
const Label = styled.label`
   /* width: 50%; */
`
const ButtonDiv = styled.div`
     width: 12%;
     margin: 25px auto;
    @media screen and (max-width: 1024px){
      width: 20%;   
   }
   @media screen and (max-width: 540px){
         width: 30%;
    }
`
const Orders = styled.div`
   width: 80%;
   margin:  auto;
   height: 40vh;
   border-radius: 10px;
   box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
     @media screen and (max-width: 1024px){
      width: 90%;
      height: 50vh;
      margin: 0px;
   }
    @media screen and (max-width: 768px){
         width: 95%;
    }
    @media screen and (max-width: 540px){
         width: 98%;
         height: 45vh;
    }
`
const AddButton = styled.button`
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
    padding: 10px 10px;
    border: none;
    outline: none;
`