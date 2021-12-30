import React from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"
import Table from '../components/Table'

function OutGoing() {
    return (
      <Layout>
        <Main>
          {/* <Table /> */}
        </Main>
      </Layout>
    )
}

export default OutGoing
const Main = styled.div`
   width: 101%;
   height: 90vh;
    background:rgba(30, 140, 250, 0.3);
   margin-top: 0px;
   padding: 10px;
`