import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartAction';
import { MdRemoveShoppingCart } from 'react-icons/md'
import MetaData from '../Layouts/MetaData';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate('/shipping')
    } else {
      navigate('/login')
    }
  };

  return (
    <>
      {
        !cartItems.length == 0 ? (
          <>
            <MetaData title={"Shopie - Cart"} />
            <div className="flex min-h-[80vh] flex-col md:flex-row bg-white shadow-xl">
              <div className="flex-1 py-6 px-4 sm:px-6 md:w-2/3 md:border-r-[1px] md:border-gray-100">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl font-medium text-gray-900">Shopping cart</h1>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200 space-y-2">
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
                                <h1>
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </h1>
                                <p className="ml-4">{`₹${item.price * item.quantity}`}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className='space-x-3'>
                                <button onClick={() => decreaseQuantity(item.product, item.quantity)} className='px-2 font-semibold bg-black text-white rounded-sm'>-</button>
                                <span className='text-orange-500 font-medium text-lg'>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className='px-2 font-semibold bg-black text-white rounded-sm'>+</button>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => deleteCartItems(item.product)}
                                  className="font-medium text-red-500 hover:text-red-600 hover:underline"
                                >
                                  Remove
                                </button>
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal:</p>
                  <p>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    onClick={checkoutHandler}
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-600 mb-24 md:mb-0"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    <Link to={'/products'}><button
                      type="button"
                      className="font-medium hover:text-orange-600 text-orange-500"
                    >
                      <span aria-hidden="true" className='text-lg'> &larr; </span>
                      Continue Shopping
                    </button></Link>
                  </p>
                </div>
              </div>
            </div>
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
