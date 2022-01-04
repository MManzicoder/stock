import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { Link } from "react-router-dom"
import Chart from '../components/Chart';
import cam from '../assets/kill.png'
import lose from '../assets/lose.png'
import happy from '../assets/happy.png'
import money from '../assets/money.jpg'
import { getRequest, request } from '../apiHandler/Authapi';

function Dashboard() {
  const [prevSun, setPrevSun] = useState(0);
  const [prevMon, setPrevMon] = useState(0);
  const [prevTue, setPrevTue] = useState(0);
  const [prevWed, setPrevWed] = useState(0);
  const [prevThu, setPrevThu] = useState(0);
  const [prevFri, setPrevFri] = useState(0);
  const [prevSat, setPrevSat] = useState(0);
  const [currSun, setCurrSun] = useState(0);
  const [currMon, setCurrMon] = useState(0);
  const [currTue, setCurrTue] = useState(0);
  const [currWed, setCurrWed] = useState(0);
  const [currThu, setCurrThu] = useState(0);
  const [currFri, setCurrFri] = useState(0);
  const [currSat, setCurrSat] = useState(0);
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
var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(curr.setDate(first));
var lastday = new Date(curr.setDate(last));
// var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;}; get dates between two dates

//get first day and last day of the previous week 
const currentDateObj = new Date();
const currentDate = currentDateObj.getDate();

var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
var beforeOneWeek2 = new Date(beforeOneWeek);
 const  day = beforeOneWeek.getDay()
 const diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -7 : 0)
 const lastSunday = new Date(beforeOneWeek.setDate(diffToMonday))

  const lastSaturday = new Date(beforeOneWeek2.setDate(diffToMonday + 6));
  var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;}
  const datesofPreviousWeek = getDaysArray(lastSunday, lastSaturday);
  const labels = datesofPreviousWeek.map((d,i)=>{
    return d.toString().split(" ")[0];
  })
  const getPrevSun =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[0] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevSun(res.amount)
    })
  }
    const getPrevMon =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[1] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevMon(res.amount)
    })
  }
    const getPrevTue =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[2] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevTue(res.amount)
    })
  }
    const getPrevWed =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[3] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevWed(res.amount)
    })
  }
    const getPrevThu =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[4] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevThu(res.amount)
    })
  }
    const getPrevFri =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[5] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevFri(res.amount)
    })
  }
    const getPrevSat =()=>{
       request("orders/date", "POST", {date: datesofPreviousWeek[6] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setPrevSat(res.amount)
    })
  }
  const datesOfCurrentWeek = getDaysArray(firstday, lastday);
  const getCurrSun =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[0] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrSun(res.amount)
    })
  }
    const getCurrMon =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[1] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrMon(res.amount)
    })
  }
    const getCurrTue =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[2] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
     setCurrTue(res.amount)
    })
  }
    const getCurrWed =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[3] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrWed(res.amount)
    })
  }
    const getCurrThu =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[4] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrThu(res.amount)
    })
  }
    const getCurrFri =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[5] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrFri(res.amount)
    })
  }
    const getCurrSat =()=>{
       request("orders/date", "POST", {date: datesOfCurrentWeek[6] },{"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
    .then(res=>{
      setCurrSat(res.amount)
    })
  }
  useEffect(()=>{
    getPrevSun();
    getPrevMon();
    getPrevTue();
    getPrevWed();
    getPrevThu();
    getPrevFri();
    getPrevSat();
    getCurrSun();
    getCurrMon();
    getCurrTue();
    getCurrWed();
    getCurrThu();
    getCurrFri();
    getCurrSat();
  })
  const data1 =[prevSun, prevMon, prevTue, prevWed, prevThu, prevFri, prevSat];
  const data2 = [currSun, currMon, currTue, currWed, currThu, currFri, currSat];
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
                        <Chart Title={"Purchase history for this week"} dataArray={data2} labels={labels} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
                    </ChartHolder>
                    <ChartHolder>
                        <Chart Title={"Purchase history for last week"} dataArray={data1} labels={labels} background={"rgba(30, 140, 250, 0.9)"} dataSet={"Last Week"}/>
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