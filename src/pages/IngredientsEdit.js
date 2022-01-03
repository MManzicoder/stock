import React, { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'
import { Link, useParams, useHistory} from "react-router-dom"
import styled from "styled-components"
import { Loader } from "../components/AdminLogin"
import Modal from '../components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { getRequest, request } from  "../apiHandler/Authapi";
function IngredientsEdit() {
    const history = useHistory();
    const [ showModal , setShowModal ] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [usedIngredients, setUsedIngredients] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const { ingId } = useParams()

    const getIngredients =()=>{
     setLoading(true);
       getRequest("ingredients",{"bearer": `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setIngredients(res.ingredients);
        })

}
const getUsedIngredients =()=>{
      setLoading(true);
       getRequest("usedingredients",{"bearer": `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setUsedIngredients(res.ingredients);
        })

}
const getIngredient = ()=>{
     getRequest(`ingredients/${ingId}`,{"bearer": `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setQuantity(res.ingredient.quantity);
        })

}

  const [loading, setLoading] = useState(false);
  const saveIng = ()=>{
      setLoading(true);
      request(`ingredients/${ingId}`, "PUT", {quantity}, {"bearer": `${localStorage.getItem("auth")}`, "Content-Type":"application/json"})
      .then(data=>{
        setLoading(false);
        if(data.error) {
          toast.error(data.error);
        }
        toast.success(data.message);
        history.push("/ingredients");
      })
    };
  
  useEffect(()=>{
    getIngredient();
    getIngredients();
    getUsedIngredients();
  },[ingId])
    return (
     <Holder>
        <Layout>
                <ToastContainer position="top-center" autoClose={3000} />
        <Main>
          <Wrapper>
             <StockSettings>
                 <h2>Ingredients that are currently in stock</h2>
                 {loading ?<Loader style={{height: 100, width:100,marginBottom: 50, marginTop: 100, border: "3px solid dodgerblue", borderTop: "3px solid transparent"}}></Loader>: (<IngredientSection>
                      {ingredients && ingredients.map((ing, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{ing.name} </Label>
                   {ingId == ing._id ? <Input type='number' name="price" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>: " "+ing.quantity+"Kg" }    
                    </FormControl>
                    <ButtonDiv>
                        {ingId == ing._id ?(<Button type="button" style={loading ? {padding: "9px 20px"}: {}} 
                      onClick={saveIng}>
                        { ingId == ing._id ? (!loading  ?  "Save": <Loader style={{margin: "0px", marginLeft: "25%"}}></Loader>) : "Edit"}
                        </Button>): <Link to={"/ingredients/edit/"+ing._id}>Edit</Link> }
                      
                    </ButtonDiv>
                   </Card>
                        );
                      })}
                    
                 </IngredientSection>) }
               <NewIngredient>
                   <AddIngredient onClick={()=>setShowModal(true)}>Add New</AddIngredient>
                 </NewIngredient>   
              </StockSettings>
              <OtherSettings>
                  <h2>Used ingredients</h2>
                 {loading ? <Loader style={{height: 100, width:100, marginTop: 100, border: "3px solid dodgerblue",borderTop: "3px solid transparent"}}></Loader>: 
                 (<IngredientSection>
                      {usedIngredients && usedIngredients.map((ing, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{ing.name} </Label>
                     <p>{" "+ing.quantity+"KG"}</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/ingredients/editused/"+ing._id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                        );
                      })}
                    
                 </IngredientSection>)}
              </OtherSettings>
          </Wrapper>
        </Main>
      </Layout>
      {showModal && (<Modal showModal={showModal} setShowModal ={setShowModal}/>)}
     </Holder>
    )
}

export default IngredientsEdit
const Main = styled.div`
   width: 101%;
   height: 90vh;
    background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
`
const Holder= styled.div`
width: 100%;
height: 100vh;
position: relative;
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
           color: rgba(30, 140, 250, 0.9);
           opacity: 0.8;
       }
`
const OtherSettings = styled.div`
    width: 49%;
    height: 100%;
    padding-left: 20px;
       h2{
           text-align: center;
           color: rgba(30, 140, 250, 0.9);
           opacity: 0.8;
       }    
`

const Card = styled.div`
  width: 35%;
  height: auto;
  background: #fff;
  border-radius: 7px;
  padding: 10px;
  position: relative;
  align-items: center;
  box-shadow: 0px 5px 5px 5px rgba(0,0,0,0.2);
  margin-bottom: 30px; 
`
const IngredientSection = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: auto;
  margin: 30px auto;
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
export const Button = styled.button`
  padding: 7px 15px;
  height: 100%;
  width: 100%;
  background: dodgerblue;
  /* margin-left: 40%; */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  text-align: center;
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
const NewIngredient = styled.div`
  width: 20%;
  margin: 10px auto;
`

const AddIngredient = styled.button`
    width: 100%;
    height: 100%;
    background: dodgerblue;
    padding: 10px 15px;
    border: none;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    outline: none;
`