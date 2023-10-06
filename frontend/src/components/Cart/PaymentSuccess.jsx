import React, { useEffect } from 'react'
import CheckoutSteps from "../Cart/CheckOutSteps";
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MetaData from '../Layouts/MetaData';

const PaymentSuccess = () => {
  useEffect(() => {
    toast.success('Payment Successfull')
  }, [])

  return (
    <>
      <MetaData title={"Shopie - Payment Success"} />
      <CheckoutSteps activeStep={3} />
      <div className='flex justify-center items-center flex-col h-[70vh]'>
        <AiFillCheckCircle className='text-9xl text-green-500' />
        <h1 className='text-3xl font-bold text-gray-700'>Payment Success</h1>
        <Link to='/orders' className='mx-auto'><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-full text-base shadow-md my-6">My Orders</button></Link>
      </div>
    </>
  )
}

export default PaymentSuccess