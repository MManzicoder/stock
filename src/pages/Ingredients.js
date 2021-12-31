import React, { useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import Modal  from "../components/Modal"
function Ingredients() {
  const [ showModal , setShowModal ] = useState(false);
  const data  = [
  {
    id: 1,
    name: "Honey",
    amount: "100"
  },
  {
    id: 2,
    name: "Sugar",
    amount: "150"
  },
  {
    id: 3,    
    name: "Salt",
    amount: "200",
  },
    {
    id: 4,      
    name: "Salt",
    amount: "200"
  }
]
return (
<Holder>
        <Layout>
        <Main>
          <Wrapper>
             <StockSettings>
                 <h2>Ingredients that are currently in stock</h2>
                 <IngredientSection>
                      {data.map((ing, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{ing.name} </Label>
                     <p>{" "+ing.amount+"KG"}</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/ingredients/edit/"+ing.id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                        );
                      })}                    
                 </IngredientSection>
                <NewIngredient>
                   <AddIngredient onClick={()=>setShowModal(true)}>Add New</AddIngredient>
                 </NewIngredient>
              </StockSettings>
              <OtherSettings>
                  <h2>Used ingredients</h2>
                  <IngredientSection>
                      {data.map((ing, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{ing.name} </Label>
                     <p>{" "+ing.amount+"KG"}</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/ingredients/editused/"+ing.id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                        );
                      })}
                    
                 </IngredientSection>
              </OtherSettings>
          </Wrapper>
        </Main>
      </Layout>
      {showModal && (<Modal showModal={showModal} setShowModal={setShowModal} />)}
</Holder>
    )
}

export default Ingredients
const Holder= styled.div`
width: 100%;
height: 100vh;
position: relative;
`
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
  height: 100px;
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