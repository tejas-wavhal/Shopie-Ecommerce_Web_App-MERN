import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom"
import MetaData from '../Layouts/MetaData';
import { toast } from 'react-hot-toast';
import { getOrderDetails, updateOrder } from '../../redux/actions/orderAction';
import Loader from '../Layouts/Loader';
import Sidebar from './Sidebar';

export default function OrderUpdate() {

  const { order, error, loading, updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const params = useParams()
  const navigate = useNavigate()

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: 'clearError' });
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: 'UpdateOrderReset' });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, isUpdated, updateError]);

  return (
    <>
      {
        !loading ? (
          <>
            <MetaData title={"Shopie - Order Details"} />
            <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
              <div className='mx-auto my-10 w-full min-h-[60vh]'>
                <section className="flex min-h-[80vh] flex-col md:flex-row bg-white">
                  <div className="flex-1 py-6 px-4 sm:px-6 md:w-2/3 md:border-r-[1px] md:border-gray-100">

                    <div className="flex items-start justify-between">
                      <h1 className="text-2xl font-medium text-gray-900 underline decoration-orange-500 my-5">{`Order #${order._id}`}</h1>
                    </div>

                    <hr />

                    <div className='space-y-2 my-10'>
                      <h1 className="text-2xl font-medium text-gray-900">Order Status</h1>
                      <p className={order.orderStatus && order.orderStatus === "Delivered"
                        ? 'text-lg font-semibold text-green-500'
                        : 'text-lg font-semibold text-red-500'
                      }>{order.orderStatus && order.orderStatus}</p>
                    </div>

                    <div className='space-y-2 my-10'>
                      <h1 className="text-2xl font-medium text-gray-900">Shipping Info</h1>
                      <p className='text-lg text-gray-800'><b>Name:</b> {order.user && order.user.name}</p>
                      <p className='text-lg text-gray-800'><b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                      <p className='text-lg text-gray-800'><b>Address:</b> {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                    </div>

                    <hr />

                    <div className="mt-8">
                      <div className="flow-root">
                        <div className="flex items-start justify-between">
                          <h1 className="text-2xl font-medium text-gray-900 mb-5">Order Items</h1>
                        </div>
                        <ul role="list" className="divide-y divide-gray-200 space-y-2 my-1">
                          {order.orderItems && order.orderItems.map((item, i) => (
                            <li key={i} className="flex py-5 bg-gray-100 p-3 rounded-lg">
                              <div className="h-24 w-24 flex-shrink-0  rounded-md border border-gray-200">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h1 className='text-lg'>
                                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </h1>
                                    <span>
                                      {item.quantity} X ₹{item.price} ={" "}
                                      <b className='font-semibold'>₹{item.price * item.quantity}</b>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6 md:w-1/3 md:mt-16 md:border-none"
                    style={{
                      display: order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <h1 className='text-2xl font-medium text-gray-900 mb-5 text-center mt-8 lg:mt-0' >Process Order</h1>

                    <hr />

                    <div className="flex flex-col justify-between font-medium my-5">
                      <select required id="category" onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400">
                        <option value="">Choose to Update</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                      <button className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg mt-3"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                        onClick={updateOrderSubmitHandler}
                      >
                        {loading ? (<>
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                          Loading...
                        </>) : (
                          <>
                            Process
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </section>
              </div>
              <Sidebar />
            </div>
          </>
        ) : (
          <>
            <Loader />
          </>
        )
      }
    </>
  )
}
