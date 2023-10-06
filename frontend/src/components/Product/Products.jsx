import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import MetaData from '../Layouts/MetaData'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/productAction'
import Loader from '../Layouts/Loader'
import Pagination from 'react-js-pagination'
import './Products.css'
import { Slider } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'

const categories = [
  'Mobile',
  'Laptop',
  'Shoes',
  'T-Shirt',
  'Other Gadgets'
]

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products)

  const dispatch = useDispatch()


  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [ratings, setratings] = useState([0])

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const handleOnPriceChange = (event, newPrice) => {
    setPrice(newPrice)
  }

  // let count = filteredProductsCount;

  const handleOnSearch = (e) => {
    e.preventDefault()
    dispatch(getAllProducts(keyword))
  }

  useEffect(() => {

    dispatch(getAllProducts(keyword, category, currentPage, price, ratings))
  }, [dispatch, category, currentPage, price, ratings])
  return (
    <>
      <MetaData title={"Shopie - Products"} />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                        <li className='block px-2 py-3 hover:translate-x-1 transition-transform ease-in-out cursor-pointer' onClick={() => setCategory('')}>
                          All
                        </li>
                        {categories.map((category) => (
                          <li key={category} className='block px-2 py-3 hover:translate-x-1 transition-transform ease-in-out cursor-pointer' onClick={() => setCategory(category)}>
                            {category}
                          </li>
                        ))}
                      </ul>
                      <div className='mx-8'>
                        <h1 className='font-medium text-gray-900 text-center'>Price:</h1>
                        <p className='text-gray-500 text-center'>{`From ₹${price[0]} to ₹${price[1]}`}</p>
                        <Slider
                          getAriaLabel={() => 'Temperature range'}
                          value={price}
                          onChange={handleOnPriceChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          min={0}
                          max={25000}
                          sx={{
                            color: '#ff5a1f',
                          }}
                        />
                      </div>

                      <div className='mx-8'>
                        <h1 className='mt-5 font-medium text-gray-900 text-center'>{`Ratings Above: ${ratings}`}</h1>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={0}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={5}
                          value={ratings}
                          onChange={(e, newRating) => {
                            setratings(newRating)
                          }}
                          sx={{
                            color: '#ff5a1f',
                          }}
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">Products</h1>

              <div className="flex items-center">

                <button className="lg:hidden text-white bg-orange-500 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded-full text-sm mt-4 shadow-md flex"
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                >Add Filters
                  <BsFilter className='text-lg mt-[0.17rem] ml-1' />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:flex m-4">
                {/* Filters */}
                <form className="hidden lg:block lg:w-[15vw] pr-1">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    <li className='block px-2 py-3 hover:translate-x-1 transition-transform ease-in-out cursor-pointer' onClick={() => setCategory('')}>
                      All
                    </li>
                    {categories.map((category) => (
                      <li key={category} className='block px-2 py-3 hover:translate-x-1 transition-transform ease-in-out cursor-pointer' onClick={() => setCategory(category)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <h1 className='font-medium text-gray-900 text-center'>Price:</h1>
                    <p className='text-gray-500 text-center'>{`From ₹${price[0]} to ₹${price[1]}`}</p>
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={price}
                      onChange={handleOnPriceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={25000}
                      sx={{
                        color: '#ff5a1f',
                      }}
                    />
                  </div>

                  <div>
                    <h1 className='mt-5 font-medium text-gray-900 text-center'>{`Ratings Above: ${ratings}`}</h1>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={5}
                      value={ratings}
                      onChange={(e, newRating) => {
                        setratings(newRating)
                      }}
                      sx={{
                        color: '#ff5a1f',
                      }}
                    />
                  </div>
                </form>

                <div className="lg:w-[85vw]">
                  <form className='lg:w-1/2 mx-auto -mt-6 mb-7' onSubmit={handleOnSearch}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </div>
                      <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="block w-full px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500    " placeholder="Search for Products..." />
                      <button type="submit" className="text-white absolute right-2.5 bottom-[0.300rem] bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-1">Search</button>
                    </div>
                  </form>

                  {
                    loading ? (<Loader />) : (
                      <div className="flex flex-wrap -m-4">
                        {
                          products.length > 0 ? (
                            products.map((products) => <ProductCard products={products} key={products._id} />)
                          ) : (
                            <p className='text-red-500 mx-auto my-20 font-bold'>No Products Available</p>
                          )
                        }
                      </div>
                    )
                  }

                  {resultPerPage < productsCount && (
                    <div className="text-xs font-semibold mt-10">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      />
                    </div>
                  )}

                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default Products