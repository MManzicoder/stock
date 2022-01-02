import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
export default function Table({fetching}) {

  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'recipientphone',
    headerName: 'Recipient Phone',
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
    width: 150,
    editable: false,
  },
  {
    field: 'amount',
    headerName: 'Amount (RWF)',
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

const rows = [
  { id: 1, recipientphone: '0780756824', address: 'Cyangungu', quantity: 50,amount: 35000,status: "Paid"},
  { id: 2, recipientphone: '0780756824', address: 'Kabuga', quantity: 55,amount: 42000,status: "Not paid" },
  { id: 3, recipientphone: '0780756824', address: 'Nyanza', quantity: 57,amount: 45000,status: "Paid" },
  { id: 4, recipientphone: '0780756824', address: 'Nyamata', quantity:30,amount: 16000,status: "Paid" },
  { id: 5, recipientphone: '0780756824', address: 'Gatsata', quantity: 35,amount: 24000,status: "Not paid" },
  { id: 6, recipientphone: '0780756824', address: 'Kabarondo', quantity: 29,amount: 15000,status: "Paid" },
  { id: 7, recipientphone: '0780756824', address: 'Gicumbi', quantity: 56,amount: 44000,status: "Paid" },
  { id: 8, recipientphone: '0780756824', address: 'Mukamira', quantity: 51,amount: 36000,status: "Not paid" },
  { id: 9, recipientphone: '0780756824', address: 'Gakenke', quantity: 63,amount: 65000,status: "Paid" },
];

//  <Table
//       height={400}
//       data={fakeData}
//       onRowClick={data => {
//         console.log(data);
//       }}
//     >
//       <Column width={70} align="center" fixed>
//         <HeaderCell>Id</HeaderCell>
//         <Cell dataKey="id" />
//       </Column>

//       <Column width={200} fixed>
//         <HeaderCell>First Name</HeaderCell>
//         <Cell dataKey="firstName" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>Last Name</HeaderCell>
//         <Cell dataKey="lastName" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>City</HeaderCell>
//         <Cell dataKey="city" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>Street</HeaderCell>
//         <Cell dataKey="street" />
//       </Column>

//       <Column width={300}>
//         <HeaderCell>Company Name</HeaderCell>
//         <Cell dataKey="companyName" />
//       </Column>

//       <Column width={300}>
//         <HeaderCell>Email</HeaderCell>
//         <Cell dataKey="email" />
//       </Column>
//       <Column width={120} fixed="right">
//         <HeaderCell>Action</HeaderCell>

//         <Cell>
//           {rowData => {
//             function handleAction() {
//               alert(`id:${rowData.id}`);
//             }
//             return (
//               <span>
//                 <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
//               </span>
//             );
//           }}
//         </Cell>
//       </Column>
//     </Table>


    {/* import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';

const rows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, 'name');
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};

export default function FullFeaturedCrudGrid() {
  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'edit');
  };

  const handleSaveClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.commitRowChange(id);
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', editable: true },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </Box>
  );
} */}

  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={2}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={fetching}
        disableSelectionOnClick
      />
    </div>
  );
}
