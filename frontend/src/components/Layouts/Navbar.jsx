import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiDashboardLine } from 'react-icons/ri'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { FiLogIn } from 'react-icons/fi'

const Navbar = ({ isAuthenticated, user }) => {
  const [nav, setNav] = useState(true)
  const { cartItems } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);
  return (
    <>
      <nav id="header" className="w-full z-30 top-0 py-1 bg-orange-500 text-white">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>
          <input onClick={() => setNav(!nav)} className="hidden" type="checkbox" id="menu-toggle" />
          <div className={`${nav ? 'hidden' : 'block'} md:flex md:items-center md:w-auto w-full order-3 md:order-1 font-semibold`} id="menu">
            <nav>
              <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
                <li><NavLink onClick={() => setNav(!nav)} className="inline-block no-underline hover:text-black py-2 px-4" to="/">Home</NavLink></li>
                <li><NavLink onClick={() => setNav(!nav)} className="inline-block no-underline hover:text-black py-2 px-4" to="/products">Products</NavLink></li>
                {
                  isAuthenticated && orders && orders.length > 0 && <li><NavLink onClick={() => setNav(!nav)} className="inline-block no-underline hover:text-black py-2 px-4" to="/orders">My Orders</NavLink></li>
                }
                <li><NavLink onClick={() => setNav(!nav)} className="inline-block no-underline hover:text-black py-2 px-4" to="/about">About</NavLink></li>
              </ul>
            </nav>
          </div>
          <div className="order-1 md:order-2 lg:mr-28">
            <Link className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-xl " to="/">
              <svg className="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
              </svg>
              SHOPIE
            </Link>
          </div>
          <div className="order-2 md:order-3 flex items-center" id="nav-content">
            {
              isAuthenticated ? (
                <>
                  <NavLink className="inline-block no-underline hover:text-black" to="/profile">
                    <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <circle fill="none" cx={12} cy={7} r={3} />
                      <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                    </svg>
                  </NavLink>
                </>
              ) : (
                <>
                  <Link to={'/login'}><button className="inline-flex text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded-full mx-2 text-base shadow-md">Login<FiLogIn className='mt-1 text-lg ml-1' /></button></Link>
                </>
              )
            }
            <NavLink className="pl-3 flex no-underline hover:text-black" to="/cart">
              <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
              </svg>
              {cartItems.length > 0 && <span className='bg-red-600 rounded-full border-2 border-red-400 px-[0.37rem] text-xs pt-[0.15rem] relative bottom-4 right-3 font-bold text-white'>{cartItems.length}</span>}
            </NavLink>
            {user && user.role === 'admin' && <NavLink to={'/admin/dashboard'} className={`text-2xl hover:text-black ${cartItems.length > 0 ? '-ml-2' : 'pl-3 '}`}>
              <RiDashboardLine />
            </NavLink>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar