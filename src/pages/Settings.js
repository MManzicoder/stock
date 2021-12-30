import React , { useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import {Loader} from "../components/AdminLogin";
function Settings() {
    const [ price, setPrice ] = useState(0);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const saveConfig = ()=>{
        // setUpdate(false);
        setLoading(true);
    };
    return (
      <Layout>
        <Main>
          <Wrapper>
              <StockSettings>
                 <h2>Stock settings</h2>
                 <FormControl>
                     <Label>Price of one Cazier </Label>
                {update ? <Input type='number' name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>: "= "+price+" RWF"}     
                 </FormControl>
                 <Button type="button" style={loading ? {padding: "9px 20px"}: {}} onClick={update ? saveConfig: ()=>setUpdate(true)}>{!loading ? (update ? "Save": "Update" ): <Loader style={{margin: "0px"}}></Loader>}</Button>
              </StockSettings>
              <OtherSettings>
                  <h2>Other settings</h2>
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
       }
`
const OtherSettings = styled.div`
    width: 49%;
    height: 100%;
    padding-left: 20px;
       h2{
           text-align: center;
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