import React from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import Chart from '../components/Chart'
import { DoubleArrowOutlined} from '@material-ui/icons'
import { Link } from 'react-router-dom'
function Inventory () {
   const ing = {
     _id: 124124,
     name: "Cazier in stock",
     amount: "300",
   }
    return (
      <Layout>
        <Main>
          <Wrapper>
            <h2>Stock Analysis</h2>
            <FirstSection>
                <Card>
                        <FormControl>
                        <Label>{ing.name} </Label>
                     <p>{" "+ing.amount}</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/inventory/edit/"+ing._id}>
                          Edit
                        </Link>
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
                 <Chart Title={"Stock Production for this weeek"} dataArray={[180, 220, 280, 320, 400, 470]} labels={["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>
               <ChartHolder>
                 <Chart Title={"Stock production for last week"} dataArray={[140, 200, 260, 360, 390, 410, 450]} labels={["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>               
            </SecondSection>
          </Wrapper>         
        </Main>
      </Layout>
    )
}

export default Inventory
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
   background: #fff;
  padding: 10px;
    box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
`
const Card = styled.div`
  width: 28%;
  height: 100px;
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
      label,p{
        font-weight: bold;
      }
`
const Label = styled.label`
   /* width: 50%; */
`
const ButtonDiv = styled.div`
     width: 50%;
     margin: 30px auto;
     margin-left: 50px;
     a{
      
       padding: 10px 15px;
       text-decoration: none;
       border-radius: 5px;
       background:rgba(30, 140, 250, 0.9);
       color: #fff
     }
`
