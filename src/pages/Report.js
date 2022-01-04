import React from 'react'
import Layout from '../components/Layout'
import styled from "styled-components"

function Report() {
    return (
      <Layout>
        <Main>
          <Wrapper>
            <h2>Report for the stock</h2>
            <ReportDiv>
               <ReportIssueSection><p>Ingredients used</p><p>3000KG</p></ReportIssueSection>
               <ReportIssueSection><p>Stock Left </p><p>200</p></ReportIssueSection>
               <ReportIssueSection><p>Registered orders</p><p>130</p></ReportIssueSection>
               <ReportIssueSection><p>Paid orders</p><p>100</p></ReportIssueSection>
               <ReportIssueSection><p>Pending orders</p><p>30</p></ReportIssueSection>
               <ReportIssueSection><p>Gained Amount</p><p>150000RWF</p></ReportIssueSection>
               <ReportIssueSection><p>Expected Amount</p><p>250000RWF</p></ReportIssueSection>
               <DownloadReport>
                  <DownloadButton >Download</DownloadButton>
               </DownloadReport>
            </ReportDiv>
          </Wrapper>          
        </Main>
      </Layout>
    )
}

export default Report
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
    flex-direction: column;
    align-items: center;
    padding: 20px;
`
const ReportDiv = styled.div`
 width: 60%;
 margin: auto;
 height: 60vh;
 border: 3px dashed rgba(30, 140, 250, 0.5);
 border-radius: 7px;
`
const ReportIssueSection = styled.div`
   width: 100%;
   margin: 30px auto;
   justify-content: space-around;
   display: flex;
   p{
     width: 40%;
     font-size: 20px;
     height: 7px;
     margin-left: 40px !important;
   }
`
const DownloadReport = styled.div`
   width: 20%;
   margin: 45px auto;
   height: 40px;
   border-radius: 35px;
`
const DownloadButton = styled.button`
    width: 100%;
    height: 100%;
    background: rgba(30, 140, 250, 0.9);
    text-align: center;
    border-radius: 7px;
    color: #fff;
    justify-content: center;
    cursor: pointer;
    place-items: center;  
    font-size: 20px;
    border: none;
`