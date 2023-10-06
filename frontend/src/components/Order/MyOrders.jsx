import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { MdOutlineLaunch } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { myOrders } from '../../redux/actions/orderAction';
import Loader from '../Layouts/Loader';
import './MyOrders.css'
import MetaData from '../Layouts/MetaData';

export default function DataGridDemo({ height = 'min-h-[80vh]' }) {

  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.order);

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 300,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: 'itemsQty',
      headerName: 'ItemsQty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'number',
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <MdOutlineLaunch />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(myOrders());
  }, [dispatch, error]);


  return (
    <>
      <div className=''>
        {loading ? (
          <Loader />
        ) : (
          orders && orders.length > 0 && <div className={`${height} `}>
            <MetaData title={"Shopie - My Orders"} />
            <h1 className='text-2xl text-center my-4 font-medium text-gray-900
          '>My Orders</h1>
            <Box sx={{ minheight: 0, minWidth: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                disableSelectionOnClick
                autoHeight
              />
            </Box>
          </div>
        )}
      </div>
    </>
  );
}