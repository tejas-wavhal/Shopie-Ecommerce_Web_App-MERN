import React from 'react'
import MetaData from '../Layouts/MetaData'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { deleteOrder, getAllOrders } from '../../redux/actions/orderAction';

const Orders = () => {

  const dispatch = useDispatch();

  const { error, orders, deleteError, isDeleted, loading } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: 'clearError' });
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch({ type: 'deleteOrderReset' });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} className='text-yellow-400 hover:text-yellow-600 text-lg mr-4'>
              <AiFillEdit />
            </Link>

            {
              !loading ? (
                <button
                  className='text-red-500 hover:text-red-700 text-lg'
                  onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
                  }
                >
                  <AiFillDelete />
                </button>
              ) : (
                <svg aria-hidden="true" role="status" className="inline w-5 h-5  text-red-600 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              )
            }
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });


  return (
    <>
      <MetaData title={"Shopie - Orders List"} />
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto my-10 w-full min-h-[60vh]'>
          <h1 className='text-2xl text-center mb-4 font-medium text-gray-900
          '>Orders List</h1>
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
        <Sidebar />
      </div>
    </>
  )
}

export default Orders