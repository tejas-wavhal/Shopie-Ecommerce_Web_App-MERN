import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import MetaData from '../Layouts/MetaData';
import Sidebar from './Sidebar';
import { deleteReviews, getAllReviews } from '../../redux/actions/productAction';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const Reviews = () => {
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted, loading: loadingDelete } = useSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.allReview
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: 'clearError' });
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      dispatch({ type: 'deleteReviewReset' });
    }
  }, [dispatch, deleteError, isDeleted]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [error])


  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
            {
              !loadingDelete ? (
                <button
                  className='text-red-500 hover:text-red-700 text-lg'
                  onClick={() =>
                    deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={"Shopie - Reviews"} />
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto my-10 w-full min-h-[60vh]'>

          <div className="flex flex-col justify-center items-center">
            <h1 className='text-2xl text-center mb-4 font-medium text-gray-900
        '>Reviews</h1>
            <form
              className="my-5"
              onSubmit={productReviewsSubmitHandler}
            >
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" required value={productId} onChange={(e) => setProductId(e.target.value)} className="block w-80 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500    " placeholder=" product id..." />
                <button type="submit" className="text-white absolute right-2.5 bottom-[0.300rem] bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-1"
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                >Search</button>
              </div>
            </form>

            {reviews && reviews.length > 0 ? (
              <Box sx={{ minheight: 0, minWidth: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="w-full"
                  autoHeight
                />
              </Box>
            ) : (
              <h1 className="text-red-500">No Reviews Found</h1>
            )}
          </div>

        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Reviews