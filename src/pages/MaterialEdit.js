import React, { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'
import { Link, useParams, useHistory} from "react-router-dom"
import styled from "styled-components"
import { Loader } from "../components/AdminLogin"
import { toast, ToastContainer } from 'react-toastify';
import { getRequest, request } from  "../apiHandler/Authapi";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "@material-ui/icons"
import AddMaterial from '../components/AddMaterial'
function MaterialsEdit() {
    const history = useHistory();
    const [ showModal , setShowModal ] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [usedMaterials, setUsedMaterials] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const { mId } = useParams()
  const [pageNumber, setPageNumber]= useState(0);
  const materialsPerPage = window.screen.width > 1000 ? 4 : 
  (window.screen.width >500 && window.screen.width < 800 ? 2:  2);
    const getMaterials =()=>{
     setLoading(true);
       getRequest("materials",{"bearer": 
       `${localStorage.getItem("auth")}`})
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
       getRequest("usedmaterials",{"bearer": 
       `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setUsedMaterials(res.materials);
        })

}
const getMaterial = ()=>{
     getRequest(`materials/${mId}`,{"bearer": 
     `${localStorage.getItem("auth")}`})
        .then(res=>{
            setLoading(false);
            if(res.error){
                toast.error(res.error);
            }
            setQuantity(res.material.quantity);
        })

}

  const [loading, setLoading] = useState(false);
  const saveMat = ()=>{
      setLoading(true);
      request(`materials/${mId}`, "PUT", 
      {quantity}, {"bearer": `${localStorage.getItem("auth")}`,
      "Content-Type":"application/json"})
      .then(data=>{
        setLoading(false);
        if(data.error) {
          toast.error(data.error);
        }
        toast.success(data.message);
        history.push("/packaging");
      })
    };
  
  useEffect(()=>{
    getMaterial();
    getMaterials();
    getUsedMaterials();
  },[mId])
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
                 <h2>Packaging materials the stock in stock</h2>
                 {loading ?<Loader 
                 style={{height: 100, width:100,marginBottom: 50, marginTop: 100, border: "3px solid dodgerblue", 
                 borderTop: "3px solid transparent"}}></Loader>: (<IngredientSection>
                      {displayPageMaterials && displayPageMaterials.map((mat, i)=>{
                        return(
                          <Card key={i} className="card">
                        <FormControl>
                        <Label>{mat.name} </Label>
                   {mId == mat._id ? <Input type='number' name="price" value={quantity} 
                   onChange={(e)=>setQuantity(e.target.value)}/>: " "+mat.quantity }    
                    </FormControl>
                    <ButtonDiv>
                        {mId == mat._id ?(<Button type="button" style={loading ? {padding: "9px 20px"}: {}} 
                      onClick={saveMat}>
                        { mId == mat._id ? (!loading  ?  "Save": <Loader 
                        style={{margin: "0px", marginLeft: "25%"}}></Loader>) : "Edit"}
                        </Button>): <Link to={"/materials/edit/"+mat._id}>Edit</Link> }
                      
                    </ButtonDiv>
                   </Card>
                        );
                      })}
                    
                 </IngredientSection>) }
                  {materials.length > 0 && <ReactPaginate
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
                 {loading ? <Loader 
                 style={{height: 100, width:100, marginTop: 100, border: "3px solid dodgerblue",
                 borderTop: "3px solid transparent"}}></Loader>: 
                 (<IngredientSection style={{marginTop: window.screen.width <=768 && 70}}>
                      {displayPageUsedMaterials && displayPageUsedMaterials.map((mat, i)=>{
                        return(
                          <Card key={i} className="card">
                        <FormControl>
                        <Label>{mat.name} </Label>
                     <p>{" "+mat.quantity }</p>
                    </FormControl>
                    <ButtonDiv>
                      <Link 
                      to={"/materials/editused/"+mat._id}>
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
      {showModal && (<AddMaterial showModal={showModal} setShowModal ={setShowModal}/>)}
     </Holder>
    )
}

export default MaterialsEdit
const Main = styled.div`
   width: 101%;
   height: 90vh;
    background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
   @media screen and (max-width: 768px){
         width: 100%;
         height: 93vh;
    }
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
    @media screen and (max-width: 540px){
        height: 90vh;
    }
    @media screen and (max-width: 360px){
         width: 100% !important;
    }
`
const StockSettings = styled.div`
      width: 49%;
       height: 100%;
       border-right: 3px dashed rgba(30, 140, 250, 0.5);
       h2{
           text-align: center;
           color: rgba(30, 140, 250, 0.9);
           opacity: 0.8;
           font-size: 18px;
       }
      @media screen and (max-width: 450px){
                 .card{
           margin-left: -30px !important;
         }

      @media screen and (max-width: 360px){
         width: 53% !important;
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
           font-size: 18px;           
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
  @media screen and (max-width: 1024px){
    width: 40% !important;
  }  
   @media screen and (max-width: 768px){
         width: 45% !important;
    }
    @media screen and (max-width: 540px){
         width: 90% !important;
    }
    @media screen and (max-width: 450px){
         width: 98% !important;
    }
`
const IngredientSection = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: auto;
  margin: 40px auto;
  @media screen and (max-width: 1024px){
     width: 100%;        
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
       color: #fff;

     }
    @media screen and (max-width: 1024px){
          margin-left: 30px;  
       }

`
const NewIngredient = styled.div`
  width: 20%;
  margin: 10px auto;
  @media screen and (min-width: 1036px){
    margin-top: -8% !important;
  }
  @media screen and (max-width: 1024px){
          width: 30% !important;
       }
  @media screen and (max-width: 540px){
         width: 50% !important;
    }
  @media screen and (max-width: 450px){
    margin-top: -40px !important;
    width: 80% !important;
    }
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