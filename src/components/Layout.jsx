import React from 'react'

import Header from './Header';
import styled from "styled-components";
import Sidebar from './Sidebar';


// const drawerWidth = 240;



  



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  


const Layout = ({children}) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    return (
        <Main>
            <Sidebar open={open} handleClose={handleDrawerClose}/>
            <MainBox>
             <Header />
             {children}
            </MainBox>
        </Main>
    )
}

export default Layout

const Main = styled.div`
  display: flex;
  width: 100%;
`
const MainBox = styled.div`
  display: flex;
  width: 84%;
  margin-left: 15%;
  flex-direction: column;
  @media screen and (max-width: 768px){
    width: 100%;
    margin-left: 0% !important;
  }
`