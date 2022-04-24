import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { Loader } from "../components/AdminLogin"
import { Close } from "@material-ui/icons";
import "../styles/modal.css";
import { toast, ToastContainer } from 'react-toastify';
import { request } from '../apiHandler/Authapi';


const AddMaterial = ({ showModal, setShowModal, setMaterials, setUsedMaterials}) => {
    const [loading, setLoading] = useState(false);
    const [material, setMaterial] = useState({
        name: "",
        quantity: 0
    })
    const modalRef = useRef();
    const closeModal = e =>{
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }
    const closeAllStaff = () =>{
        setShowModal(false);

    }
const saveMaterial = () =>{
    if(material.name =="" || material.quantity == 0){
        toast.error("All fields are required!")
        return;
    }else if(material.name !== "" && material.quantity !==0 ) setLoading(true);
     request("materials", "POST", 
      material, {"bearer": `${localStorage.getItem("auth")}`, 
      "Content-Type":"application/json"})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            if(res.message){
                toast.success(res.message);
                window.location ="/packaging";
            }
        })
}
const handleChange = e =>{
    setMaterial({
        ...material,
        [e.target.name]: e.target.value
    })
}
    return (
        showModal ? (
        <Background ref={modalRef} onClick = { closeModal }>
            <ToastContainer position="top-center" autoClose={3000} />
           <Wrapper className={`${ showModal ? "animate": "" }`} 
           style={{height: 250, padding: 15}}>
               <h3>New Material</h3>
               <Form>
                  <FormControl>
                    <Label>Name</Label>
                   <Input type='text' name='name' 
                   value={material.name} onChange={handleChange} 
                   required placeholder='Enter name'/>
                  </FormControl>
                    <FormControl>
                      <Label>Quantity</Label>
                      <Input type='text' name='quantity' 
                      placeholder='Enter quantity' disabled={loading} 
                      value={material.quantity} onChange={handleChange} 
                      required/>
                    </FormControl>                  
               </Form>
               <AddButton>
                   <Button onClick={saveMaterial}>{!loading ? "Add": 
                    <Loader 
                    style={{marginLeft: "40%", 
                    marginTop: 0, height: 20, width: 20}}
                    ></Loader>}
                   </Button>
               </AddButton>
            <CloseModalButton onClick={closeAllStaff} />
           </Wrapper>
        </Background>
        ): null
    )
}
const Background = styled.div`
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 5000 !important;
    @media screen and (max-width: 1024px){
        height: 100vh !important;
    }
    @media screen and (max-width: 768px){
    .wrapperHeight{
        height: 80vh !important;
    }
    @media screen and (max-width: 540px){
        height: 120vh !important;
            .wrapperHeight{
                height: 100% !important;
            }
}
}
  @media screen and (max-width: 400px){
      height: 140vh !important;
  }
  @media screen and (max-width: 320px){
      height: 152vh !important;

}
@media screen and (max-width: 280px){
       height: 132vh !important;
   }
}
  @media screen and (max-width: 400px){
      height: 140vh !important;
  }
  @media screen and (max-width: 320px){
      height: 152vh !important;

}
@media screen and (max-width: 280px){
       height: 132vh !important;
   }
`


const Wrapper = styled.div`
         font-family: 'Roboto';
      width: 30%;
      height: 80vh;
      position: relative;
      top: -100%;
      background: #fff;
      z-index: 5000 !important;
      background: #fff;
      border-radius: 5px;
      padding-top: 20px;
      h3{
          text-align: center;
          font-size: 20px;
      }
      @media screen and (max-width: 1024px){
          width: 60% !important;
          height: 25vh !important;
            .form{
              width: 80% !important;
              input{
                  margin-top: 30px !important;
              }
              .hold input{
                  margin-top: 10px !important;
              }
              .first{
                  margin-top: 10px !important;
              }
              .mtcategory{
                  margin-top: 30px !important;
              }
              button{
                  margin-top: 30px !important;
              }
          }
      }
      @media screen and (max-width: 768px){
          height: 28vh !important;
      }
      @media screen and (max-width: 540px){
           top: 20vh !important;
            width: 80% !important;
            height: 40vh !important;
            
   }
   @media screen and (max-width: 450px){
       .d-flexs{
           display: flex;
           flex-direction: column !important;
          input{
              width: 100% !important;
          }
          select{
              margin-top: 20px !important;
              width: 100% !important;
          }

       }
      .form{
          input{
              margin-top: 20px !important;
          }
          .mtcategory{
              margin-top: 20px !important;
          }
      }
   }

   @media screen and (max-width: 280px){
       h2{
           font-size: 15px !important;
           font-weight: bold;
           opacity: 0.7;
       }
   }
`

const Input = styled.input`
 width: 60%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
 border-radius: 5px;
 outline: 1px solid rgba(30, 140, 250, 0.9);
`
 const CloseModalButton = styled(Close)`
   cursor: pointer;
   position: absolute;
   top: 10px;
   right: 10px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
   border: 1px solid dodgerblue;
   border-radius: 50%;
   :hover{
       border-color: #ff0066;
       color: dodgerblue;
   }
   @media screen and (max-width: 540px){
       right: 5%;
       height: 40px !important;
       width: 40px !important;
       border: 3px solid dodgerblue;
       border-radius: 50%;
   }
`
const Form = styled.form`
   width: 70%;
   margin: 10px auto;
   @media screen and (max-width: 540px){
          width: 80%;
       }
`
const AddButton = styled.div`
  width: 30%;
  height: 40px;
  margin: 25px auto;

`
const Button = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 7px;
  background:rgba(30, 140, 250, 0.9);
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
`
const FormControl = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
`
const Label = styled.label`
 width: 30% !important;
`
export default AddMaterial