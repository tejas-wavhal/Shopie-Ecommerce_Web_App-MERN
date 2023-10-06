import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails, newReview } from '../../redux/actions/productAction'
import StarRatings from 'react-star-ratings'
import { Carousel } from 'flowbite-react'
import { BiCart } from 'react-icons/bi'
import Loader from '../Layouts/Loader'
import ProfilePng from '../../images/Profile.png'
import MetaData from '../Layouts/MetaData'
import { addItemsToCart } from '../../redux/actions/cartAction'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material'
import './product.css'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { loading = true, productDetails, error } = useSelector(state => state.productDetails)

  const { success, error: reviewError } = useSelector(state => state.newReview)

  const { name, description, images, category, ratings, price, numOfReviews, _id, Stock, reviews } = productDetails;

  const [count, setCount] = useState(1)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addItemsToCartHandler = () => {
    dispatch(addItemsToCart(params.id, count))
    toast.success('Item Added to Cart')
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch({ type: "clearError" })
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: 'newReviewReset' });
    }

    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error, reviewError, success]);

  return (
    <>
      {!loading ? (
        <>
          <MetaData title={`Shopie - ${name}`} />
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pt-16 pb-5 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded md:mt-10'>
                  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel className='' slideInterval={5000}>
                      {
                        images && images.map((item, i) => (
                          <img
                            src={images[i].url}
                            alt={`${i + 1} Slide`}
                            key={i}
                          />
                        ))
                      }
                    </Carousel>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{category}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                  <p className='text-gray-400 text-sm'>{`product id: ${_id}`}</p>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <StarRatings rating={ratings}
                        starDimension="25px"
                        starSpacing="1px"
                        starRatedColor="orange"
                      />
                      <span className="text-gray-600 ml-3">{`(${numOfReviews} Reviews)`}</span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                      <a className="text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                      </a>
                    </span>
                  </div>
                  <hr className='my-3' />
                  <span className="title-font font-medium text-3xl text-gray-900">{`₹${price}`}</span>
                  <div className="flex mt-2 items-center">
                    <div className='space-x-3'>
                      <button onClick={() => { count == 1 ? null : setCount(count - 1) }} className='px-2 font-semibold bg-black text-white rounded-sm'>-</button>
                      <span className='text-orange-500 font-bold text-lg'>{count}</span>
                      <button onClick={() => { count == Stock ? null : setCount(count + 1) }} className='px-2 font-semibold bg-black text-white rounded-sm'>+</button>
                    </div>
                    <button onClick={addItemsToCartHandler} disabled={Stock < 1 ? true : false} className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded-full shadow-md">Add to Cart <BiCart className='mt-1 text-xl ml-1' /> </button>
                  </div>
                  <hr className='my-3' />
                  <span className="leading-relaxed font-semibold">Status : </span><span className={`leading-relaxed font-bold  ${Stock >= 1 ? ('text-green-500') : ('text-red-500')}`}>{Stock >= 1 ? ('In Stock') : ('Out of Stock')}</span>
                  <hr className='my-3' />
                  <p className="leading-relaxed font-semibold">Description: <span className='leading-relaxed font-normal'>{description}</span></p>
                  <button onClick={submitReviewToggle} className="text-white bg-orange-500 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded-full text-sm mt-4 shadow-md">Add Review</button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h1 className='text-center font-semibold text-3xl'>Reviews</h1>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle className='text-center'>Submit Review</DialogTitle>
              <DialogContent className="flex flex-col justify-center items-center space-y-5">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="border-orange-400 rounded-xl h-28"
                  placeholder='Coment....'
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions className='mx-auto space-x-20 mb-3'>
                <Button onClick={submitReviewToggle} color="error" variant='contained'>
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="warning" variant='contained'>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <div className='my-2 mb-5 flex justify-center flex-wrap'>
              {
                reviews[0] ? (reviews.map((item, i) => (
                  <div key={i} className='border-2 w-72 p-2 text-gray-600 flex justify-center flex-col items-center rounded-2xl shadow-md border-gray-300 m-5 md:hover:-translate-y-2 transition-transform ease-out'>
                    <img src={ProfilePng} alt="profile" className='h-16 w-1h-16' />
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <StarRatings rating={item.rating}
                      starDimension="15px"
                      starSpacing="1px"
                      starRatedColor="orange"
                    />
                    <p className='text-center'>{item.comment}</p>
                  </div>
                ))
                ) : (
                  <p className='text-gray-600'>No reviews</p>
                )
              }
            </div>
          </section>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  )
}

export default ProductDetails