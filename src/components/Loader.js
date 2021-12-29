import React from "react";
import styled from "styled-components";

const Loader = ({isLoading}) =>{
   
    return (
        <Container>
       
        <div className="loader-container" style={ isLoading ? {display:"block"} : {display:"none"}}>
        <div className="loader" >
            <div className="circle" id="circle1"></div>
            <div className="circle" id="circle2"></div>
            <div className="circle" id="circle3"></div>
        </div>   
        </div>
        </Container>
    )
}

const Container=styled.div`

.loader-container{
   margin-left: 20px;
   margin-top: 35%;
}
.loader{
    display: flex;
    flex-direction: row;
    justify-content: center;
    }
    .loader  .circle{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0px 15px;
        background-color: dodgerblue;
        animation: bounce 2s infinite ease-in-out both;
    }
    
    #circle1{
    animation-delay: -0.3s;
    }
    
    #circle2{
    animation-delay: -0.15s;
    }
    
    @keyframes bounce{
       0%,80%,100%{
          transform:scale(0);
       }
       
       40%{
       transform:scale(1);
       }
    }
`

export default Loader;