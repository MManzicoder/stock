import React, { useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import Chart from '../components/Chart'
import { DoubleArrowOutlined} from '@material-ui/icons'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Loader } from '../components/AdminLogin'
import { Button } from './IngredientsEdit'
import { request } from '../apiHandler/Authapi'
import { getRequest} from "../apiHandler/Authapi"
import { useEffect } from 'react'
import {toast, ToastContainer } from 'react-toastify'
function InventoryEdit () {
  const history = useHistory();
  const { id } = useParams();
     const [stock, setStock] = useState({
     name: "Cazier in stock",
     _id: "",
     quantity: 0
   });
   const stockRetrieve = ()=>{
     getRequest(`stock/${id}`, {"bearer": `${localStorage.getItem("auth")}`})
     .then(res=>{
       if(res.error){
         toast.error(res.error)
       }
       console.log(res);
       setStock({
         ...stock,
         _id: res.stock._id,
         quantity: res.stock.quantity
        })
     })
  
    }
    useEffect(()=>{
     stockRetrieve()
   }, [id])
    const [loading, setLoading] = useState(false);
    const handleChange = e =>{
      setStock({
        ...stock,
        quantity: e.target.value
      })
    }
    const updateInventory = ()=>{
      setLoading(true);
        request(`stock/${id}`, "PUT", {quantity: stock.quantity}, {"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
        .then(res=>{
          setLoading(false);
          if(res.error){
            toast.error(res.error)
          }
          if(res.message){
            toast.success(res.message);
            history.push("/inventory");
          }
        })

    }

    return (
      <Layout>
        <ToastContainer position="top-center" autoClose={3000} />
        <Main>
          <Wrapper>
            <h2>Stock Analysis</h2>
            <FirstSection>
                <Card>
                        <FormControl>
                        <Label>{stock?.name} </Label>
                        <Input type="text" name="quantity" value={stock.quantity} onChange={handleChange}/>
                    </FormControl>
                    <ButtonDiv>
                      <Button 
                      onClick={updateInventory}
                       >
                          {loading ? <Loader style={{margin: "0px", marginLeft: "40%"}}></Loader>: "Save"}
                        </Button>
                    </ButtonDiv>
                   </Card>
                 <ArrowDefine>
                   <DoubleArrowOutlined className='icon'/>
                   <DoubleArrowOutlined className='icon'/>
                 </ArrowDefine>
                 <Card style={{display: "flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "bold"}}>Expected Amount</span>
                   <p style={{marginTop: "20px"}}>150000RWF</p>
                 </Card>
                 
            </FirstSection>
            <SecondSection>
               <ChartHolder>
                 <Chart Title={"Stock Production for this weeek"} dataArray={[180, 220, 280, 320, 400, 470]} labels={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"]} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>
               <ChartHolder>
                 <Chart Title={"Stock production for last week"} dataArray={[140, 200, 260, 360, 390, 410, 450]} labels={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"]} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>               
            </SecondSection>
          </Wrapper>         
        </Main>
      </Layout>
    )
}

export default InventoryEdit
const Main = styled.div`
   width: 101%;
   height: 90vh;
    background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
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
`
const FirstSection = styled.div`
      width: 60%;
      height: 10vh; 
      display: flex;
      justify-content: space-around;  
      margin: 20px auto;
`
const SecondSection = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  margin: 70px auto;
  justify-content: space-around;
`
const ChartHolder = styled.div`
  width: 47%;
  height: 45vh;
  border-radius: 10px;
   /* background:rgba(30, 140, 250, 0.3); */
   background: #fff;
  padding: 10px;
    box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
`
const Card = styled.div`
  width: 28%;
  height:110px;
  background: #fff;
  border-radius: 7px;
  padding: 10px;
  position: relative;
  align-items: center;
  box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
  /* margin-left: 15px; */
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
`
const FormControl = styled.div`
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      /* text-align: center; */
      justify-content: space-around;
`
const Label = styled.label`
   /* width: 50%; */
`
const Input = styled.input`
     width: 40%;
     border: none;
     border-bottom: 1px solid rgba(30, 140, 250, 0.9);
     outline: none;
     text-align: center;
`
const ButtonDiv = styled.div`
     width: 50%;
     margin: 10px auto;
     margin-left: 50px;
     a{
      
       padding: 10px 15px;
       text-decoration: none;
       border-radius: 5px;
       background:rgba(30, 140, 250, 0.9);
       color: #fff
     }
`