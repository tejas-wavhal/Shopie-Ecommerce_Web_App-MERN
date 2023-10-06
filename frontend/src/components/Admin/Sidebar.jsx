import React from 'react'
import { MdSpaceDashboard, MdAddCircle, MdRateReview } from 'react-icons/md'
import { FaList } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { HiArrowsUpDown } from 'react-icons/hi2'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <>
      <aside className='sm:w-full lg:w-fit shadow-xl lg:border-l-2 lg:shadow-none'>
        <div className='flex lg:flex-col justify-center items-center p-2 space-x-1 space-y-1   lg:space-y-10 lg:p-5 flex-wrap '>
          <LinkButton text='Dashboard' url={'dashboard'} Icon={MdSpaceDashboard} active={window.location.pathname === '/admin/dashboard'} />
          <LinkButton text='Products' url={'products'} Icon={HiArrowsUpDown} active={window.location.pathname === '/admin/products'} />
          <LinkButton text='Users' url={'users'} Icon={FiUsers} active={window.location.pathname === '/admin/users'} />
          <LinkButton text='Orders' url={'orders'} Icon={FaList} active={window.location.pathname === '/admin/orders'} />
          <LinkButton text='Reviews' url={'reviews'} Icon={MdRateReview} active={window.location.pathname === '/admin/reviews'} />
          <LinkButton text='Create Product' url={'createproduct'} Icon={MdAddCircle} active={window.location.pathname === '/admin/createproduct'} />
        </div>
      </aside>
    </>
  )
}
export default Sidebar

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`} className='w-fit'>
      <button className={`flex text-base bg-gray-300 rounded-md p-1 hover:bg-gray-600 px-3 hover:text-gray-100 transition-all ease-in-out`} style={{ backgroundColor: `${active ? '#fe5a1f' : null}` }} >
        <Icon className='relative top-1 text-xl mr-2' />
        {text}
      </button>
    </Link>
  )
}