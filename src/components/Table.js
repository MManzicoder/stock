import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getRequest} from "../apiHandler/Authapi";
import OrderView from './OrderView';
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
    <div style={{ height: window.screen.width ===1024 ? 650 : 250, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        onCellClick = {handleCellClick}
        pageSize={window.screen.width === 1024 ? 10 : 2}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={fetching}
        disableSelectionOnClick
      />
     {showModal && <OrderView data = {currentRow} show={true} />}
    </div>
  );
}

