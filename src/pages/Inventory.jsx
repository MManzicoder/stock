import React, {useState} from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import Chart from '../components/Chart'
import { DoubleArrowOutlined,} from '@material-ui/icons'
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {toast, ToastContainer } from 'react-toastify'
import { request, getRequest} from "../apiHandler/Authapi"
import CurrencyFormat from "react-currency-format";
function Inventory () {
  const name = "Crates in stock(Beer)";
   const [stock, setStock] = useState({
     stock_id: "",
     quantity: 0
   });
  const [price, setPrice] = useState(0);
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
  const [amount, setAmount ] = useState(0);
  const todayObj = new Date();
  const td = todayObj.getDate();
  const today = new Date(todayObj.setDate(td));
const getStock = ()=>{
    getRequest("stock", {"bearer": `${localStorage.getItem("auth")}`})
    .then(res=>{
      setStock(res.stock)
    })
    .catch(err=>console.log(err.message))
}
var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(curr.setDate(first));
var lastday = new Date(curr.setDate(last));

//get first day and last day of the previous week 
const currentDateObj = new Date();
const currentDate = currentDateObj.getDate();
var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
var beforeOneWeek2 = new Date(beforeOneWeek);
const  day = beforeOneWeek.getDay()
const diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -7 : 0)
const lastSunday = new Date(beforeOneWeek.setDate(diffToMonday))

const lastSaturday = new Date(beforeOneWeek2.setDate(diffToMonday + 6));
var getDaysArray = function(s,e) 
{for(var a=[],d=new Date(s);d<=e;
  d.setDate(d.getDate()+1)){ a.push(new Date(d));}
  return a;
}

const datesofPreviousWeek = getDaysArray(lastSunday, lastSaturday);
  const labels = datesofPreviousWeek.map((d,i)=>{
    return d.toString().split(" ")[0];
  })
const getPrevSun =()=>{
  request("history/date", "POST", 
  {date: datesofPreviousWeek[0] },
  {"bearer": `${localStorage.getItem("auth")}`, 
  "Content-Type":"application/json"})
    .then(res=>{
      setPrevSun(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getPrevMon =()=>{
  request("history/date", "POST", 
   {date: datesofPreviousWeek[1] },
   {"bearer": `${localStorage.getItem("auth")}`, 
   "Content-Type":"application/json"})
    .then(res=>{
      setPrevMon(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }

const getPrevTue =()=>{
  request("history/date", "POST", 
  {date: datesofPreviousWeek[2] },
  {"bearer": `${localStorage.getItem("auth")}`, 
  "Content-Type":"application/json"})
    .then(res=>{
      setPrevTue(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }

const getPrevWed =()=>{
 request("history/date", "POST", 
 {date: datesofPreviousWeek[3] },
 {"bearer": `${localStorage.getItem("auth")}`, 
 "Content-Type":"application/json"})
    .then(res=>{
      setPrevWed(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getPrevThu =()=>{
  request("history/date", "POST", 
    {date: datesofPreviousWeek[4] },
    {"bearer": `${localStorage.getItem("auth")}`, 
    "Content-Type":"application/json"})
    .then(res=>{
      setPrevThu(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getPrevFri =()=>{
      request("history/date", "POST", 
    {date: datesofPreviousWeek[5] },
    {"bearer": `${localStorage.getItem("auth")}`, 
    "Content-Type":"application/json"})
    .then(res=>{
      setPrevFri(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getPrevSat =()=>{
  request("history/date", "POST", 
  {date: datesofPreviousWeek[6] },
  {"bearer": `${localStorage.getItem("auth")}`, 
  "Content-Type":"application/json"})
    .then(res=>{
      setPrevSat(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const datesOfCurrentWeek = getDaysArray(firstday, lastday);
const getCurrSun =()=>{
    request("history/date", "POST", 
    {date: datesOfCurrentWeek[0] },
    {"bearer": `${localStorage.getItem("auth")}`, 
    "Content-Type":"application/json"})
    .then(res=>{
      setCurrSun(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getCurrMon =()=>{
    request("history/date", "POST", 
    {date: datesOfCurrentWeek[1] },
    {"bearer": `${localStorage.getItem("auth")}`, 
    "Content-Type":"application/json"})
    .then(res=>{
      setCurrMon(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
const getCurrTue =()=>{
    request("history/date", "POST", 
    {date: datesOfCurrentWeek[2] },
    {"bearer": `${localStorage.getItem("auth")}`, 
    "Content-Type":"application/json"})
    .then(res=>{
     setCurrTue(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
    const getCurrWed =()=>{
       request("history/date", "POST", 
       {date: datesOfCurrentWeek[3] },
       {"bearer": `${localStorage.getItem("auth")}`, 
       "Content-Type":"application/json"})
    .then(res=>{
      setCurrWed(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
    const getCurrThu =()=>{
       request("history/date", "POST", 
       {date: datesOfCurrentWeek[4] },{"bearer": 
       `${localStorage.getItem("auth")}`, 
       "Content-Type":"application/json"})
    .then(res=>{
      setCurrThu(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
    const getCurrFri =()=>{
       request("history/date", "POST", 
       {date: datesOfCurrentWeek[5] },
       {"bearer": `${localStorage.getItem("auth")}`, 
       "Content-Type":"application/json"})
    .then(res=>{
      setCurrFri(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }
    const getCurrSat =()=>{
       request("history/date", "POST", 
       {date: datesOfCurrentWeek[6] },
       {"bearer": `${localStorage.getItem("auth")}`, 
       "Content-Type":"application/json"})
    .then(res=>{
      setCurrSat(res.history.stock)
    })
    .catch(err=>console.log(err.message))
  }

  const data1 =[prevSun, prevMon, prevTue, prevWed, prevThu, prevFri, prevSat];
  const data2 = [currSun, currMon, currTue, currWed, currThu, currFri, currSat];
   const stockRetrieve = ()=> {
    getRequest("stock", {"bearer": `${localStorage.getItem("auth")}`})
     .then(res=>{
       if(res.error){
         toast.error(res.error)
       }
       setStock({
         ...stock,
         stock_id: res.stock.stock_id,
         quantity: res.stock.quantity
        })
     })
     .catch(err=>console.log(err.message))
   }

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
    stockRetrieve()
    retrievePrice();
    getStock();
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
   }, [])
    
   return (
      <Layout>
        <ToastContainer position='top-center' autoClose={3000}/>
        <Main>
          <Wrapper>
            <h2>Stock Analysis</h2>
            <FirstSection>
                <Card style={{width: 250}}>
                        <FormControl>
                        <Label>{name} </Label>
                     <p>{" "+stock?.quantity}</p>
                    </FormControl>
                    <ButtonDiv style={{marginLeft: 100}}>
                      <Link 
                      to={"/inventory/edit/"+stock.stock_id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                 <ArrowDefine>
                   <DoubleArrowOutlined className='icon desk'/>
                   <DoubleArrowOutlined className='icon desk'/>
                   <KeyboardDoubleArrowDown className="icon key"/>
                 </ArrowDefine>
                 <Card style={{display: "flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "bold"}}>Expected Amount</span>
                   <CurrencyFormat value={stock.quantity*price}  suffix=" Frw" 
                   thousandSeparator={true} displayType={"text"} />
                 </Card>                
            </FirstSection>
            <SecondSection>
               <ChartHolder>
                 <Chart Title={"Stock Production for this weeek"} dataArray={data2} 
                 labels={labels} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>
               <ChartHolder>
                 <Chart Title={"Stock production for last week"} dataArray={data1} 
                 labels={labels} background={"rgba(30, 140, 250, 0.9)"} dataSet={"Last Week"}/>
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
   display: flex;
   @media screen and (max-width: 768px){
     width: 100%;
     height: 93vh;
   }
   @media screen and (max-width: 540px){
     height: 130vh;
   }
    @media screen and (max-width: 380px){
     height: 150vh;
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
    @media screen and (max-width: 1024px){
      h2{
        width: 100%;
      }
   }
  @media screen and (max-width: 768px){
     width: 100%;
     height: 100%;
      h2{
        padding: 0px;
        text-align: center;
      }
   }
`
const FirstSection = styled.div`
      width: 60%;
      height: 10vh; 
      display: flex;
      justify-content: space-around;  
      flex-wrap: wrap;
      margin: 10px auto;
      @media screen and (min-width: 1025px){
        margin-top: -20px;
      }
      @media screen and (max-width: 1024px){
       width: 70%;
   }
      @media screen and (max-width: 768px){
        width: 90%;
        margin-top: 10px;
        margin-bottom: 20px;
        /* background: blue; */
   }
   @media screen and (max-width: 540px){
     width: 100%;
   }
  @media screen and (max-width: 450px){
    position: relative;
    .key{
        position: absolute;
        top: 110%;
        left: 40%;
      }
    margin-bottom: 200px;
  div:nth-child(3){
    position: absolute;
    left: 4%;
    top: 200%;
  }
  }
 @media screen and (max-width: 380px){
    .key{
        top: 140%;
        /* left: 40%; */
      }
    margin-bottom: 250px;
  div:nth-child(3){
    position: absolute;
    left: 4%;
    top: 250%;
  }
}
  @media screen and (max-width: 360px){
    div:nth-child(1){
      /* height: 140px !important; */
      height: auto;
    }   
    .key{
      top: 170%;
    }  
    div:nth-child(3){
    left: 4%;
    top: 270%;
  }
   }

`
const SecondSection = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  margin: 20px auto;
  justify-content: space-around;
  @media screen and (max-width: 1024px){
    width: 98%;
      flex-direction: column;
   }
    @media screen and (max-width: 540px){
     width: 100%;
   }
`
const ChartHolder = styled.div`
  width: 47%;
  height: 45vh;
  border-radius: 10px;
   background: #fff;
  padding: 10px;
  box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
  @media screen and (max-width: 1024px){
     width: 90%;
      height: 30vh;
      margin-bottom: 30px;
   }
  @media screen and (max-width: 768px){
       height: 32vh; 
   }
   @media screen and (max-width: 450px){
     width: 99%;
   }
  @media screen and (max-width: 360px){
    width: 100%;
  }
`
const Card = styled.div`
  width: 28%;
  height: 120px;
  background: #fff;
  border-radius: 7px;
  padding: 10px;
  position: relative;
  align-items: center;
  box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
  @media screen and (max-width: 1024px){
      width: 35%;
   }

   @media screen and (max-width: 450px){
      width: 80% !important;
      margin-bottom: 60px;
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
     .key{
       display: none;
     }
     @media screen and (max-width: 450px){
       .key{
         display: block;
       }
       .desk{
         display: none;
       }
   
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
