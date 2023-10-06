import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { MdRemoveShoppingCart } from 'react-icons/md'
import CheckOutSteps from './CheckOutSteps'
import MetaData from '../Layouts/MetaData';

export default function confirmOrder() {
  const navigate = useNavigate()

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    if (isAuthenticated && cartItems.length > 0) {
      navigate('/process/payment')
    } else {
      navigate('/')
    }
  };


  return (
    <>
      {
        !cartItems.length == 0 ? (
          <>
            <MetaData title={"Shopie - Confirm Order"} />
            <CheckOutSteps activeStep={1} />
            <section className="flex min-h-[80vh] flex-col md:flex-row bg-white shadow-xl">
              <div className="flex-1 py-6 px-4 sm:px-6 md:w-2/3 md:border-r-[1px] md:border-gray-100">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-medium text-gray-900">Shipping Info</h1>
                </div>

                <div className='space-y-2 my-10'>
                  <h1 className='text-lg text-gray-800'><b>Name:</b> {user.name}</h1>
                  <h2 className='text-lg text-gray-800'><b>Phone:</b> {shippingInfo.phoneNo}</h2>
                  <h3 className='text-lg text-gray-800'><b>Address:</b> {address}</h3>
                </div>

                <hr />

                <div className="mt-8">
                  <div className="flow-root">
                    <div className="flex items-start justify-between">
                      <h1 className="text-2xl font-medium text-gray-900 mb-5">Your Cart Items</h1>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200 space-y-2 my-1">
                      {cartItems && cartItems.map((item, i) => (
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
                                  <b className='text-green-500 font-semibold'>₹{item.price * item.quantity}</b>
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
                <h1 className='text-2xl font-medium text-gray-900 mb-5 text-center mt-8 lg:mt-0' >Order Summary</h1>

                <hr />

                <div className="flex flex-col justify-between text-base font-medium text-gray-900 my-5 space-y-2">
                  <p>Subtotal: <span className='float-right'>₹{subtotal}</span></p>
                  <p>Shipping Charges: <span className='float-right'>₹{shippingCharges}</span></p>
                  <p>GST: <span className='float-right'>₹{tax}</span></p>
                </div>

                <hr />

                <div className="flex justify-between text-base font-bold text-green-500">
                  <p>Total:</p>
                  <p>{`₹${totalPrice}`}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={proceedToPayment}
                    disabled={isAuthenticated == true && cartItems.length > 0 ? false : true}
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-600 mb-24 md:mb-0"
                  >
                    Proceed To Payment
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className='flex flex-col space-x-2 justify-center items-center h-[80vh]' >
              <MdRemoveShoppingCart className='text-orange-500 text-5xl' />
              <p className='text-gray-800 text-xl font-medium'>Cart Empty</p>
              <Link to='/products' className='mx-auto'><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-full text-sm shadow-md my-6">View All Products</button></Link>
            </div>
          </>
        )
      }
    </>
  )
}
