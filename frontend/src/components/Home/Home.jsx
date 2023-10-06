import React, { useEffect } from 'react'
import MetaData from '../Layouts/MetaData'
import ProductCard from '../Product/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/productAction'
import Loader from '../Layouts/Loader'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/userAction'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { MdOutlineAppRegistration } from 'react-icons/md'
import './Home.css'
import { Carousel } from 'flowbite-react'
import { toast } from 'react-hot-toast'

const Home = ({ isAuthenticated = false }) => {

  const { loading, error, products } = useSelector((state) => state.products)

  const dispatch = useDispatch()


  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }

    dispatch(getAllProducts())
  }, [dispatch, error])


  return (
    <>
      <MetaData title={"Shopie - Home"} />
      {
        !loading ? (
          <>
            <section className="custom-bg bg-change bg-blur text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h1 className=" title-font sm:text-4xl text-3xl mb-4 text-orange-500 gradient font-extrabold">Welcome to SHOPIE
                  </h1>
                  <p className="mb-8 leading-relaxed text-2xl ">Shopie makes it easy for customers to find and purchase the products they need, all from the comfort of their own home.</p>
                  <div className="flex justify-center">
                    {
                      !isAuthenticated == true ? (
                        <>
                          <Link to={'/login'}><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-full mx-2 text-lg shadow-md">Login<FiLogIn className='mt-1 text-lg ml-1' /></button></Link>
                          <Link to={'/register'}><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-full mx-2 text-lg shadow-md">Sign Up<MdOutlineAppRegistration className='mt-[0.25rem] text-lg ml-1' /></button></Link>
                        </>
                      ) : (
                        <>
                          <Link to={'/products'}><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-full mx-2 text-lg shadow-md">View Products</button></Link>
                          <button onClick={logoutHandler} className="inline-flex text-white bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded-full mx-2 text-lg shadow-md">Logout<FiLogOut className='mt-1 text-lg ml-1' /></button>
                        </>
                      )
                    }

                  </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full">
                  <div className='h-56 sm:h-64 xl:h-80 2xl:h-96 '>
                    <Carousel slideInterval={5000}>
                      <Link to='/product/63ff36a99273195c058e6344'><img src="https://res.cloudinary.com/dmjxbvcz2/image/upload/v1677671612/Picsart_23-03-01_17-14-28-625_c0js86.jpg" /></Link>
                      <Link to='/product/63ff12b38f882b8cfe71e563'><img src="https://res.cloudinary.com/dmjxbvcz2/image/upload/v1677671611/Picsart_23-03-01_17-17-42-183_llhdzr.jpg" /></Link>
                      <Link to='/product/63ff350a9273195c058e6307'><img src="https://res.cloudinary.com/dmjxbvcz2/image/upload/v1677671611/Picsart_23-03-01_17-12-37-999_l4te1g.jpg" /></Link>
                    </Carousel>
                  </div>
                </div>
              </div>
            </section>

            <section className="text-gray-600 body-font mb-8">
              <div className="container px-5 mx-auto">
                <h1 className='text-3xl mb-6 text-black text-center font-semibold'>Feature Products</h1>
                <div className="flex flex-wrap -m-4">
                  {
                    products && products.map((products) => <ProductCard products={products} key={products._id} />)
                  }
                </div>

                <Link to='/products' className='flex justify-center'><button className="inline-flex text-white bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded-md text-base shadow-md my-6">View All Products</button></Link>

              </div>
            </section>
          </>
        ) : (
          <Loader />
        )
      }
    </>
  )
}

export default Home