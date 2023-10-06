import React, { useState } from 'react'
import { Country, State } from 'country-state-city'
import CheckOutSteps from './CheckOutSteps'
import { AiFillHome, AiFillPhone } from 'react-icons/ai'
import { BiBuildings, BiRightArrow } from 'react-icons/bi'
import { useSelector, useDispatch } from "react-redux";
import { MdPinDrop } from 'react-icons/md'
import { saveShippingInfo } from '../../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import MetaData from '../Layouts/MetaData'

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo ? shippingInfo.address : '');
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : '');
  const [state, setState] = useState(shippingInfo ? shippingInfo.state : '');
  const [country, setCountry] = useState(shippingInfo ? shippingInfo.country : '');
  const [pinCode, setPinCode] = useState(shippingInfo ? shippingInfo.pinCode : '');
  const [phoneNo, setPhoneNo] = useState(shippingInfo ? shippingInfo.phoneNo : '');
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number must be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title={"Shopie - Shipping"} />
      <section className='min-h-[80vh]'>
        <CheckOutSteps activeStep={0} />
        <form onSubmit={shippingSubmit} className='lg:w-1/3 md:w-2/3 md:mx-auto p-5 shadow-xl md:shadow-orange-300 space-y-5 md:mt-6'>
          <h1 className='text-2xl text-center my-4 font-medium text-gray-900
          '>Shipping Details</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiFillHome className="w-5 h-5 text-gray-500" />
            </div>
            <input value={address} onChange={(e) => setAddress(e.target.value)} required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Address" />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiBuildings className="w-5 h-5 text-gray-500" />
            </div>
            <input value={city} onChange={(e) => setCity(e.target.value)} required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="City" />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdPinDrop className="w-5 h-5 text-gray-500" />
            </div>
            <input value={pinCode} onChange={(e) => setPinCode(e.target.value)} required type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Pin Code" />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiFillPhone className="w-5 h-5 text-gray-500" />
            </div>
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" placeholder="Phone Number" />
          </div>
          <div>
            <select required value={country} onChange={(e) => setCountry(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 h-11">
              <option value=''>Select Country</option>
              {
                Country && Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <select required value={state} onChange={(e) => setState(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2 h-11">
              <option value=''>Select State</option>
              {
                State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <button type='submit' disabled={state ? false : true} className="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 mx-auto focus:outline-none hover:bg-orange-600 rounded-full">Continue
            <BiRightArrow className='w-4 h-4 ml-2' />
          </button>
        </form>
      </section>
    </>
  )
}

export default Shipping