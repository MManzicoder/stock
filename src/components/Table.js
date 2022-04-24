import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getRequest} from "../apiHandler/Authapi";
import OrderView from './OrderView';
import styled from 'styled-components';
export default function Table() {
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({
    id: "",
    recipientphone:"",
    address: "",
    quantity: "",
    price: "",
    amount: "",
    status:"",
    createdAt:""
  })
  const pageSize = window.screen.width >=1366 ? 2 : window.screen.width === 1024 ? 10 : window.screen.width === 768 ? 7 : 4;
   const getOrders = ()=>{
     setFetching(true);
     getRequest("orders", {"bearer": `${localStorage.getItem("auth")}`})
     .then(res=>{
       setFetching(false);
       if(res.error){
           return;
       }
       setOrders(res.orders);
     })
     .catch(err=>console.log(err.message))
   }

   useEffect(()=>{
      getOrders();
   }, [])
   const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'recipientphone',
    headerName: 'Client Phone',
    width: 150,
    editable: false,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 150,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 120,
    editable: false,
  },
    {
    field: 'price',
    headerName: 'Price (RWF)',
    sortable: false,
    width: 120
  },
  {
    field: 'amount',
    headerName: 'Amount (RWF)',
    sortable: false,
    width: 160
  },
    {
    field: 'createdAt',
    headerName: 'Date',
    sortable: false,
    width: 160
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 160,
    editable: true
  }
];
const handleCellClick = (params)=>{
  setCurrentRow(params.row);
  setShowModal((prev)=>!prev);
}
  return (
    <Hold style={{ height: window.screen.width ===1024 ? 650 : 250, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        onCellClick = {handleCellClick}
        pageSize={pageSize}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={fetching}
        disableSelectionOnClick
      />
     {showModal && <OrderView data = {currentRow} show={true} />}
    </Hold>
  );
}


const Hold = styled.div`
   @media screen and (min-width: 768px){
     height: 500px !important;
   }
   @media screen and (max-width: 540px){
     height: 330px !important;
   }

`