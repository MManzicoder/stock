import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { getRequest, request } from '../apiHandler/Authapi'
import { Loader } from "../components/AdminLogin"
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "@material-ui/icons"
import "../styles/pagination.css";
import AddMaterial from '../components/AddMaterial'
function Packaging() {
  const [ showModal , setShowModal ] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [usedMaterials, setUsedMaterials] = useState([]);
  const [ loading, setLoading ] = useState(false); 
  const [pageNumber, setPageNumber]= useState(0);
  const materialsPerPage = window.screen.width > 1000 ? 4 : (window.screen.width >500 && window.screen.width < 800 ? 2:  2);
const getMaterials =()=>{
    setLoading(true);
       getRequest("materials",{"bearer": `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setMaterials(res.materials);
        })

}
const getUsedMaterials =()=>{
      setLoading(true);
       getRequest("usedmaterials",{"bearer": `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            console.log(res);
            if(res.error){
                toast.error(res.error);
            }
            setUsedMaterials(res.materials);
        })

}
  useEffect(()=>{
    getMaterials();
    getUsedMaterials();
  },[])
  const pagesVisited = pageNumber * materialsPerPage;
  const displayPageMaterials = materials.slice(pagesVisited, pagesVisited + materialsPerPage);
  const displayPageUsedMaterials = usedMaterials.slice(pagesVisited, pagesVisited + materialsPerPage);
   const pageCount1 = Math.ceil(materials.length / materialsPerPage);
    const changePage = ({ selected })=>{
          setPageNumber(selected);
    }
return (
<Holder>
        <Layout>
        <ToastContainer position="top-center" autoClose={3000} />
        <Main>
          <Wrapper>
             <StockSettings>
                 <h2>Packaging materials in the stock</h2>
                 {loading ? <Loader style={{height: 100, width:100,marginBottom: 50, marginTop: 100, border: "3px solid dodgerblue", borderTop: "3px solid transparent"}}></Loader>: (<IngredientSection>
                      {displayPageMaterials && displayPageMaterials.map((mat, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{mat.name} </Label>
                     <p>{" "+mat.quantity }</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/materials/edit/"+mat._id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                        );
                      })}                    
                 </IngredientSection>)}
                 {materials.length > 4 && <ReactPaginate
                      previousLabel= { <ArrowLeft />}
                      nextLabel ={ <ArrowRight /> }
                      pageCount = { pageCount1 }
                      onPageChange ={changePage}
                      containerClassName = { "pagination"}
                      previousLinkClassName = {"previousLink"}
                      nextLinkClassName = {"nextLink"}
                      disabledClassName = {"paginationDisabled"}
                      activeClassName = {"paginationActive"}
                      activeLinkClassName = { "activeLink"}

                  />}
                <NewIngredient>
                   <AddIngredient onClick={()=>setShowModal(true)}>Add New</AddIngredient>
                 </NewIngredient>
              </StockSettings>
              <OtherSettings>
                  <h2>Materials out of the stock</h2>
                 {loading ? <Loader style={{height: 100, width:100,marginBottom: 50, marginTop: 100, border: "3px solid dodgerblue", borderTop: "3px solid transparent"}}></Loader>: 
                 ( <IngredientSection>
                      {displayPageUsedMaterials && displayPageUsedMaterials.map((matr, i)=>{
                        return(
                          <Card>
                        <FormControl>
                        <Label>{matr.name} </Label>
                     <p>{" "+matr.quantity}</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/materials/editused/"+matr._id}>
                          Edit
                        </Link>
                    </ButtonDiv>
                   </Card>
                        );
                      })}
                    
                 </IngredientSection>
                 )
                    }
                    
              </OtherSettings>
          </Wrapper>
        </Main>
      </Layout>
      {showModal && (<AddMaterial showModal={showModal} setShowModal={setShowModal} setMaterials={setMaterials} setUsedMaterials={setUsedMaterials}/>)}
</Holder>
    )
}

export default Packaging;
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: auto;
  margin: 40px auto;
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