import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom"
import MetaData from '../Layouts/MetaData';
import { toast } from 'react-hot-toast';
import { getOrderDetails } from '../../redux/actions/orderAction';
import Loader from '../Layouts/Loader';

export default function OrderDetails() {
  // const navigate = useNavigate()

  const { order, error, loading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const params = useParams()

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id]);

  return (
    <>
      {
        !loading ? (
          <>
            <MetaData title={"Shopie - Order Details"} />
            <section className="flex min-h-[80vh] flex-col md:flex-row bg-white shadow-xl">
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

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6 md:w-1/3 md:mt-16 md:border-none">
                <h1 className='text-2xl font-medium text-gray-900 mb-5 text-center mt-8 lg:mt-0' >Payment</h1>

                <hr />

                <div className="flex flex-col justify-between text-xl font-medium my-5 space-y-2">
                  <p className={
                    order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                    {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold mb-14">
                  <p>Amount:</p>
                  <p>₹{order.totalPrice && order.totalPrice}</p>
                </div>
              </div>
            </section>
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
