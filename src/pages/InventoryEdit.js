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
  const name = "Crates in stock(Beer)";
  const dObj = new Date();
  const today = new Date(dObj.setDate(dObj.getDate()));
  const { id } = useParams();
     const [stock, setStock] = useState({
     name: "Cazier in stock",
     _id: "",
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
  const history = useHistory();
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
  var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1))
    { a.push(new Date(d));}return a;}
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
    {date: datesOfCurrentWeek[4] },
    {"bearer": `${localStorage.getItem("auth")}`, 
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

   const stockRetrieve = ()=>{
     getRequest(`stock/${id}`, 
     {"bearer": `${localStorage.getItem("auth")}`})
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
        request(`stock/${id}`, "PUT", 
        {quantity: stock.quantity}, 
        {"bearer": `${localStorage.getItem("auth")}`, 
        "Content-Type":"application/json"})
        .then(res=>{
          setLoading(false);
          if(res.error){
            toast.error(res.error)
          }
          if(res.message){
            request("history", "POST", 
            { quantity: stock.quantity, prevQuantity: res.prevQuantity, date: today}, 
            {"bearer":`${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
            .then()
            .catch(err=>console.log(err.message));
            toast.success(res.message);
            history.push("/inventory");
          }
        })

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

    return (
      <Layout>
        <ToastContainer position="top-center" autoClose={3000} />
        <Main>
          <Wrapper>
            <h2>Stock Analysis</h2>
            <FirstSection>
                <Card style={{width: "230px"}}>
                        <FormControl>
                        <Label>{name} </Label>
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
                   <p style={{marginTop: "20px"}}>{(stock.quantity * price)+" FRW"}</p>
                 </Card>
                 
            </FirstSection>
            <SecondSection>
               <ChartHolder>
                 <Chart Title={"Stock Production for this weeek"} 
                 dataArray={data2} labels={labels} background={"rgb(50, 40, 230)"} dataSet={"This Week"}/>
               </ChartHolder>
               <ChartHolder>
                 <Chart Title={"Stock production for last week"} dataArray={data1} 
                 labels={labels} background={"rgba(30, 140, 250, 0.9)"} dataSet={"This Week"}/>
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