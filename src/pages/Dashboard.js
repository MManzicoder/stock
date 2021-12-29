import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { Link } from "react-router-dom"
import Chart from '../components/Chart';
import cam from '../assets/kill.png'
import lose from '../assets/lose.png'
import happy from '../assets/happy.png'
import mtni from '../assets/mtn.png'

function Dashboard() {
        const cards = [
        {
            category: "Found Items",
            amount: "28K",
            img: cam,
            increase:"+3%"
        },
        {
            category: "Lost Items",
            amount: "32K",
            img: lose,
            increase:"+2%"
        },
        {
            category: "People Helped",
            amount: "46K",
            img: happy,
            increase:"+1%"
        },
    ]

   function mtn(){
    window.open("https://www.mtn.co.rw/","_blank")
   }
   function bank(){
    window.open("https://bk.rw/personal","_blank")
   }

return (
           <Layout>
                    <Statistics>
        
            
             <div className="row">
                 <div className="left-card">
                     {/* <h2>Analytics overview</h2> */}
                     {/* <p className="p-in-stat">This is the application Shaka analytics about usage and traffic</p> */}
                     <div className="justify-around p-4 flex flex-col sm:flex-row items-center">                          
                       {
                           cards.map((card,index) => (
                            <div className="h-36 rounded-lg flex mx-2 my-2 flex-col justify-around  w-60 shadow-lg bg-white" key={index}>
                            <div className="flex justify-around items-center">
                            <p className="text-blue-500">{card.category}</p>
                              <img src={card.img} alt="eyes" className="h-12 w-12 border rounded-full"/> 
                            </div>
                           <div className="flex justify-around items-center">
                           <h2 className="text-4xl text-blue-900">{card.amount}</h2>
                           <p className="percent text-green-600 text-xl">{card.increase}</p>
                           </div>

                       </div>
                           )
                       )

                           }
                          
                     </div>
                 </div>




            <div className="chart-container my-2">
                <Chart 
                //  options={{ maintainAspectRatio: false }}
                />
             </div>
                
             </div> 

             <div className="right-card rounded-lg my-2">           
                   <Link to="" onClick={bank}>
                     <img src="https://res.cloudinary.com/find-yours/image/upload/v1634231607/Default-images/BK_cmnz5b.jpg" alt="adds"/>
                  </Link>
                   
                   <Link to="" onClick={mtn}>
                     <img src={mtni} className="w-full h-full" alt="mtn"/>
                   </Link> 
                     
                 </div>
         </Statistics>
           </Layout>
    )
}

export default Dashboard
const Main = styled.div`
   width: 101%;
   height: 90vh;
   background: dodgerblue;
   margin-top: 0px;
`
const Statistics=styled.div`
   width: 84.8%;
   margin-left: 14%;
   display: flex;
   flex-direction: row;
   div.row{
       display: flex;
       flex-direction: column;
       margin-left: 3.5%;
       width: 70%;
       margin-top: 1%;
   }
   div.row p.p-in-stat{
       color: grey;
   }
   div.left-card{
       padding: 10px;
       width: 100%;
       background-color: white;
       border-radius: 5px;
       min-height: 250px;
   }
  
   div.left-card div.card-row div.sub-card{
       /* width: 32%;
       padding: 15px;
       margin: 5px;
       border-radius: 5px;
       height: 120px; */
   }
   div.left-card div.card-row div.sub-card p{
       font-size: 12px;
       padding-top: 10px;
   }
   div.left-card div.card-row div.sub-card p:nth-child(3){
       color: grey;
   }
   div.One{
       background-color: #92B7FF;
   }
   div.Two{
       background-color: #eda4b4;
       
   }
   div.Three{
       background-color: #92B7FF;
   }
   div.right-card{
       background-color: white;
       /* border-radius: 5px; */
       margin-left: 3%;
       
       width: 30%;
       margin-top: 1%;   
   }
   .right-card img{
       width: 100%;
       height: 50%;
   }
  div.right-card p:nth-child(1){
      color: gray;
  }
  div.right-card p:nth-child(2){
      text-align: center;
  }

  div.chart-container{
      width:100%;
      margin-top: 15px;
      /* min-height: 40rem; */
      
  }
  @media only screen and (max-width:620px){
   width: 90%;
   margin-left: 9%;
   flex-direction: column;

   div.row{
       display: block;
       width: 100%;
   }
   div.left-card{
       padding: 7px;
       width: 95%;
       min-height: 100px;
   }
   div.row p.p-in-stat{
       font-size: 13px;
   }
   div.left-card div.card-row div.sub-card{
       width: 32%;
       padding: 5px;
       margin: 2px;
       height: auto;
   }
   div.right-card{
       margin-left: 3.5%;
       margin-top: 10px;
       width: 95%;
   }
   div.chart-container{
    width:95%;
    margin-top: 15px;
}
   
  }

  @media only screen and (min-width:768px) and (max-width:1000px) and (-webkit-min-device-pixel-ratio: 1){
   width: 91.5%;
   margin-left: 7%;
   div.left-card div.card-row div.sub-card{
       width: 32%;
       padding: 5px;
       margin: 2px;
       height: auto;
   }

   div.chart-container{
    z-index: 0;
}
  }
`