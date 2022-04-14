import React from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"

function Profile() {
    return (
      <Layout>
        <Main>
          <Wrapper>
            
          </Wrapper>          
        </Main>
      </Layout>
    )
}

export default Profile
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
