import React, { useState, useRef } from 'react';
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars"
import { Close } from "@material-ui/icons";
import { request } from '../apiHandler/Authapi';
import "../styles/modal.css";
import { toast } from 'react-toastify'
import { requirements } from '../shared/utils/data';
import { categories } from '../shared/utils/Categories';
import Tesseract from 'tesseract.js';
import ProgressBar from './ProgressBar'; 
import validate from '../shared/utils/ImageValidator';

const Modal = ({ showModal, setShowModal, setShowFound, setShowLost, showFoundForm, showLostForm }) => {

    const [complete,setCompleted] = useState(0)
    const [imageCheck,setImageCheck] = useState(false)
    const [product, setProduct] = useState({
        productName: "",
        category: "",
        date: "",
        whereLost: "",
        payment: "",
        description: "",
        productId:""
    })
   const [isLoading, setIsLoading ] = useState(false);
    let history=useHistory();
    const dateRef = new Date();
    const maxDate = new Date(dateRef.getFullYear(), dateRef.getMonth(), dateRef.getDate());

    const [itemPhoto, setItemPhoto] = useState('');
    const [itemPhotoPreview, setItemPhotoPreview] = useState('');

    const modalRef = useRef();
    const closeModal = e =>{
        if(modalRef.current === e.target){
            setShowModal(false);
            setShowLost(false);
            setShowFound(false);
        }
    }


    const closeAllStaff = () =>{
        setShowModal(false);
        setShowLost(false);
        setShowFound(false);
    }
    const closePreview = () =>{
        setItemPhoto("");
        setItemPhotoPreview("");
    }


    const onChange = e => {
        if(e.target.name === 'itemPhoto'){
             const reader = new FileReader();
             reader.onload = ()=>{
                 if(reader.readyState === 2){
                     //console.log(reader.result)
                     setItemPhoto(reader.result);
                     setItemPhotoPreview(reader.result);
                     Tesseract.recognize(
                        reader.result,
                         'eng',
                        { logger: m => {
                            setCompleted(Math.round(m.progress*100))

                      
                          
                            
                        }
                            }
                      ).then(({data:{text}}) => { 
                      
                       let matching = validate(text,category);
                       
                      
                      if(category === '60afc01c4aa4cb37fcf899cc'){
                          matching = 4;
                      }
                      if(matching < 3){
                          setImageCheck(false);

                      }else{
                          console.log("Succefully validated",matching)
                          setImageCheck(true)
                      }
                      })

                 }
             }
             reader.readAsDataURL(e.target.files[0])
        }else{
            
            setProduct({...product,[e.target.name]:e.target.value});
        }
    }
  

    const handleSubmit = async e =>{
     e.preventDefault();
     
     setIsLoading(true);
     const {
        category,
        date,
        whereLost,
        phone,
        productId
    } = product
    
    const productData = {category,date,whereLost,phone,productId,itemPhoto};
    console.log(category)
    //console.log(productData)
     if((/^07(8|2|9)\d{7}$/.test(phone))){
        request(`${ showLostForm ? "lostProducts/add-product" : "foundProducts/add-product"}`, "POST", productData, {"Access-Control-Allow-Origin": "*","Content-Type": "application/json","bearer":`${localStorage.getItem('auth')}`})
        .then(data=>{
            setIsLoading(false);
            if(data.error){
               toast.error(data.error, {style: {
                   fontSize: 12
               }});  
            }
            if(data.message){
               toast.success(data.message);
                if(showLostForm){
                   history.push("/lostproducts");                 
                }
                if(showFoundForm){
                   history.push("/foundproducts");
                }
              
            }
           
        })
        .catch(err=>{
            setIsLoading(false);
            toast.error("Unexpected error occurred!")})

     }else{
         setIsLoading(false);
         toast.info("Invalid telephone number");
     }


    } 

    const {category, date, whereLost, phone, productId } = product;
    return (
        showModal ? (
        <Background className={itemPhoto && showFoundForm ? "changeHeight" : ""} ref={modalRef} onClick = { closeModal } style={showFoundForm ? { height: 700} : {}}>
           <Wrapper className={`${ showModal ? "animate": "" } ${itemPhoto && showFoundForm ? "wrapperHeight" : ""}` } style={{height: 500, padding: 15}}>
           <h2>{ showFoundForm ? requirements.showFoundForm.header: requirements.showLostForm.header}</h2>
               <Form onSubmit = {handleSubmit} style={showFoundForm ? {width: 500} : {}} id="form" 
               className="form">
                   <Wrapp className={showFoundForm ? "d-flexs" : "" } 
                   style={showFoundForm ? {display: 'flex', flexDirection: 'row'} : {} }>
                       <Select value = {category}  name="category" onChange={onChange} 
                    className={`${showFoundForm ? "category" : ""} ${showLostForm ? "mtcategory": ""} `} required>
                        <Option value={""}>Choose Item Category</Option>
                        {categories.map(category =>{
                            return(
                                <option value={category._id} key={category._id}>{category.name}</option>
                            )
                        })}
                    </Select>
                    <Input type="text" name="productId" required onChange={onChange} 
                   className={` ${showFoundForm ? "name sm:mx-4" : "" } first`}
                   value={productId} minLength={category === '60a93cbb0df9723780b334b1' ? 16 : 0} maxLength={category === '60a93cbb0df9723780b334b1' ? 16 : 16} placeholder="Add Item Id"/>

                    
                   </Wrapp>
                      <DateTimePickerComponent name="date" value={date} onChange={onChange} placeholder={showLostForm ? requirements.showLostForm.label : requirements.showFoundForm.label} max={maxDate}/> 
                   <Input type="text" style={{marginTop: 20}} name="whereLost" required onChange={onChange} value={whereLost} placeholder={showLostForm ? "Enter where you think it was lost ": "Enter where it was found"} maxLength="15" />
                   <Input type="text" name="phone" onChange={onChange} value={phone} placeholder="Enter your Phone number" maxLength="13"/>
                   {showFoundForm ? (<Hold className="hold">
                      <label>Item Photo</label>
                     {!itemPhoto && <Input type="file" required name="itemPhoto" onChange={ onChange }/> }
                   </Hold>): null}
                   {itemPhoto&&showFoundForm ? (
                       <div>

                        <Preview>
                             
                            <img src = {itemPhotoPreview} alt="found item"/>
                            <ClosePreview onClick={closePreview}/>
                           
                        </Preview>
                            {/* checking image validity */}
                            <span className={imageCheck ? "text-green-700" : 'text-red-600'}>{imageCheck ? "The image is valid" : (complete === 100 ? "Please upload a valid image" : "Checking image validity")}</span>
                            <ProgressBar  bgcolor={"#6a1b9a"} completed={complete} />
                       </div>
                   ): null}
                   <Button type="submit" className="disabled:opacity-50" disabled={showFoundForm && (!imageCheck ? true : false)}>{ isLoading ? <Loader></Loader> : (showFoundForm&&!isLoading ? "Register An Item": "Find My Item")}</Button>
               </Form>
               <CloseModalButton onClick={closeAllStaff} />
           </Wrapper>
        </Background>
        ): null
    )
}
const Background = styled.div`
      position: absolute;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2000 !important;
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
`

const Preview = styled.div`
      width: 200px;
      height: 250px;
      position: relative;
      padding: 7px;
      img{
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          border-radius: 5px;
      }
`
const ClosePreview = styled(Close)`
      position: absolute;
      top: 0px;
      right: 0px;
      border-radius: 50%;
      background: #fff;
      font-size: 20px !important;
      color: red;
      cursor: pointer;
`

const Wrapp = styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
`
const Wrapper = styled.div`
      font-family: 'Roboto';
      width: 50%;
      height: 80vh;
      position: relative;
      top: -100%;
      z-index: 5000 !important;
      background: #fff;
      border-radius: 5px;
      padding-top: 20px;
      h2{
          text-align: center;
          font-size: 20px;
      }
      @media screen and (max-width: 1024px){
          width: 70% !important;
          height: 60vh !important;
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
          height: 70vh !important;
      }
      @media screen and (max-width: 540px){
            width: 100% !important;
            height: 100% !important;
            .form{
                width: 85% !important;
            }
            h2{
                margin-top: 50px !important;
            }  
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
const Hold = styled.div`
      display: flex;
      flex-direction: column;
      label{
          margin-top: 10px;
          padding-bottom: 0%;
      }
` 
const Select = styled.select`
 width: 100%;
 padding: 10px 10px;
 border: 1px solid grey;
 border-radius: 5px;
 margin-top: 10px;
 outline: none;
 /* margin:0 1rem; */
 
`
const Option = styled.option`

`

const Form = styled.form`
   width: 50%;
   margin: 5% auto;
   height: auto;
   font-size: 13px;
   input{
       border-radius: 5px;
   }
   input::placeholder{
       text-align: left;
   }
   input:focus{
    outline: dodgerblue; 
    border: 1px solid dodgerblue;
   }
`
const Input = styled.input`
 width: 100%;
 margin-top: 10px;
 padding: 7px 10px;
 border: 1px solid gray;
`
const Button = styled.button`
   width: 100%;
   background: #0055ff;
   color: #ffffff;
   margin-top: 10px;
   padding: 10px 10px;
   font-weight: bold;
   cursor: pointer;
   outline: none;
   border: none;
   
   border-radius: 3px;
   ${props =>
            props.disabled ?
            `
            opacity: .5;
            cursor: default;
            `:  `
            opacity:1;
            cursor:pointer;
            `}
           
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
   @media screen and (max-width: 540px){
       left: 46%;
       height: 40px !important;
       width: 40px !important;
       border: 3px solid dodgerblue;
       border-radius: 50%;
   }
`
export const Loader = styled.div`
     height: 25px;
     width: 25px;
     border-radius: 50%;
     background: transparent;
     border: 3px solid lightgray;
     border-top: 3px solid #5e93ff;
     margin-left: 48%;
     animation: spin 1s linear infinite;
     @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (max-width: 760px){
      margin-left: 200px !important;
      margin-top: 1px !important;
      height: 15px !important;
      width: 15px !important;
  }
  @media screen and (max-width: 450px){
      margin-left: 150px !important;
  }
  @media screen and (max-width: 390px){
      margin-left: 130px !important;
  }
@media screen and (max-width: 360px){
      margin-left: 120px !important;
  }
  @media screen and (max-width: 300px){
      margin-left: 90px !important;
  }
`
export default Modal