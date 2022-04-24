import React , { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import {Loader} from "../components/AdminLogin";
import { request, getRequest } from '../apiHandler/Authapi';
import { toast, ToastContainer } from 'react-toastify';
function Settings() {
    const [ price, setPrice ] = useState({
      amount: 0,
      _id: "",
    });
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const saveConfig = ()=>{
        setLoading(true);
        request(`price/${price._id}`, "PUT", {amount: price.amount}, {"bearer":`${localStorage.getItem("auth")}`, "Content-Type" : "application/json"})
        .then(res=>{
          setLoading(false);
          if(res.message){
            toast.success(res.message)
            setUpdate(false);
          }else{
            toast.error(res.error)
          }
        })
        .catch(err=>console.log(err.message))
    };
const retrievePrice = ()=>{
  getRequest("price", {"bearer": `${localStorage.getItem("auth")}`})
  .then(res=>{
    if(res.error){
      toast.error(res.error)
    }
    setPrice({
      ...price,
      _id: res.price._id,
      amount: res.price.amount
    })
  })
}
useEffect(()=>{
  retrievePrice();
},[update])
    return (
      <Layout>
        <Main>
          <ToastContainer position='top-center' autoClose={2500}/>
          <Wrapper>
              <StockSettings>
                 <h2>Stock settings</h2>
                 <FormControl>
                     <Label>Default price</Label>
                {update ? <Input type='number' name="price" value={price.amount} onChange={(e)=>setPrice({...price, amount: e.target.value})}/>: "= "+price.amount+" RWF"}     
                 </FormControl>
                 <Button type="button" style={loading ? {padding: "9px 20px"}: {}} onClick={update ? saveConfig: ()=>setUpdate(true)}>{!loading ? (update ? "Save": "Update" ): <Loader style={{margin: "0px"}}></Loader>}</Button>
                 {/* <p>No settings available</p> */}
              </StockSettings>
              <OtherSettings>
                  <h2>Other settings</h2>
                  <p>No settings available</p>
              </OtherSettings>
          </Wrapper>
        </Main>
      </Layout>
    )
}

export default Settings
const Main = styled.div`
   width: 101%;
   height: 90vh;
    background: rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
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
`
const StockSettings = styled.div`
       width: 49%;
       height: 100%;
       border-right: 3px dashed rgba(30, 140, 250, 0.5);
       h2{
           text-align: center;
           color: rgba(30, 140, 250, 0.9);
       }
       p{
         text-align: center;
         margin-top: 30vh;
         color: grey;
       }
`
const OtherSettings = styled.div`
    width: 49%;
    height: 100%;
    padding-left: 20px;
       h2{
           text-align: center;
           color: rgba(30, 140, 250, 0.9);
       }    
      p{
         text-align: center;
         margin-top: 30vh;
         color: grey;
       }
`
const FormControl = styled.div`
      width: 60%;
      margin: 30px auto;
      height: auto;
      align-items: center;
      text-align: center;
`
const Label = styled.label`
   width: 50%;
`
const Input = styled.input`
     width: 30%;
     border: none;
     border-bottom: 1px solid rgba(30, 140, 250, 0.9);
     outline: none;
     text-align: center;
`
const Button = styled.button`
  padding: 7px 15px;
  background: dodgerblue;
  margin-left: 40%;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`