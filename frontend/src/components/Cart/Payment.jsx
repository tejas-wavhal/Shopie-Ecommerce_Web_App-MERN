import React, { useEffect, useRef, useState } from 'react'
import { BsFillCreditCardFill } from 'react-icons/bs'
import { RiKeyFill } from 'react-icons/ri'
import { MdDateRange } from 'react-icons/md'
import CheckoutSteps from "../Cart/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder } from "../../redux/actions/orderAction";
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { removeItemsFromCart } from '../../redux/actions/cartAction';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const [loading, setLoading] = useState(false)

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  // console.log(order)s
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setLoading(false)

        toast.error(result.error.message);
        dispatch({ type: "clearError" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = await {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          await dispatch(createOrder(order));

          navigate("/payment/success");
          // localStorage.removeItem('cartItems')


          let cartItems = JSON.parse(localStorage.getItem("cartItems"))
          for (let index = 0; index < cartItems.length; index++) {
            dispatch(removeItemsFromCart(cartItems[index].product))
          }

        } else {
          toast.error("There's some issue while processing payment ");
          dispatch({ type: "clearError" });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
      dispatch({ type: "clearError" });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={"Shopie - Payment"} />
      <section className='min-h-[80vh]'>
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="lg:w-1/3 md:w-1/3 md:mx-auto p-5 md:shadow-xl md:shadow-orange-300 space-y-5 md:mt-6'" onSubmit={(e) => submitHandler(e)}>
            <h1 className='text-2xl text-center my-4 font-medium text-gray-900
          '>Card Info</h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsFillCreditCardFill className="w-5 h-5 text-gray-500" />
              </div>
              <CardNumberElement className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Address" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdDateRange className="w-5 h-5 text-gray-500" />
              </div>
              <CardExpiryElement className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Address" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiKeyFill className="w-5 h-5 text-gray-500" />
              </div>
              <CardCvcElement className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Address" />
            </div>

            <button ref={payBtn} type='submit' className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg w-full font-semibold">
              {loading ? (<>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              </>) : (
                <>
                  {`Pay ₹${orderInfo && orderInfo.totalPrice}`}
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Payment