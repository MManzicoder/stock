import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { Link } from "react-router-dom"
import Chart from '../components/Chart';
import cam from '../assets/kill.png'
import lose from '../assets/lose.png'
import happy from '../assets/happy.png'
import money from '../assets/money.jpg'

function Dashboard() {
        const cards = [
        {
            name: "Total sales",
            amount: "600000RWF",
            img: money,
        },
        {
            name: "Stock Left",
            amount: "3000",
            img: money,
        },
        {
            name: "Ingredients used",
            amount: "2500KG",
            img: money,
        },
    ]
return (
           <Layout>
              <Main>
                <Division1>
                    <Greetings>
                        <h2>Hi <span>Manzi Monnierey</span>, </h2>
                          <p>This is how your stock looks like today</p> 
                    </Greetings>
                    <SubDivision>
                      {cards.map((c, i)=>{
                          return (
                            <Card key={i}>
                              <ImageHolder>
                                 <img src={c.img}/>
                              </ImageHolder>
                              <OtherInfo>
                                <span style={{fontWeight: "bold"}}>{c.amount}</span>
                                <p style={{color: "gray"}}>{c.name}</p>
                              </OtherInfo>
                          </Card>
                          )
                      })}         
                    </SubDivision>
                </Division1>
                <Division2>
                    <ChartHolder>
                        <Chart Title={"Purchase history for this week"} dataArray={[180, 220, 280, 320, 360, 430]} labels={["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
                    </ChartHolder>
                    <ChartHolder>
                        <Chart Title={"Purchase history for last week"} dataArray={[150, 200, 300, 320, 350, 400, 420]} labels={["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]} background={"rgba(30, 140, 250, 0.9)"} dataSet={"Last Week"}/>
                    </ChartHolder>
                </Division2>
              </Main>
           </Layout>
    )
}

export default Dashboard
const Main = styled.div`
   width: 101%;
   height: 90vh;
   background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
`
const Division1 = styled.div`
   display: flex;
   flex-direction: column;
`
const Greetings = styled.div`
  margin-left: 25px;
  h2{
      font-size: 16px;
      span{
          color: blue;
          font-weight: normal;
      }
  }
  p{
      font-size: 15px;
      opacity: 0.6;
  }
`
const SubDivision = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: 70%;
  margin: 10px;
  justify-content: space-around;
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
const ImageHolder = styled.div`
 width: 60px;
 height: 60px;
 border-radius: 10px;
 background: red;
 object-fit: cover;  
  img{
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
`
const OtherInfo = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: auto;
  height: 80px;
  display: flex;
  flex-direction: column;
  p{
    margin-top: 10px;
  }
`
const Division2 = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  margin: 20px auto;
  justify-content: space-around;
`
const ChartHolder = styled.div`
  width: 47%;
  height: 53vh;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
`