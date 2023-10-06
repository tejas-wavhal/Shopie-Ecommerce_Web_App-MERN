import React from 'react'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'

const ProductCard = ({ products }) => {
  return (
    <>
      <Link to={`/product/${products._id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full transition-all hover:md:-translate-y-2 ease-linear rounded-3xl cursor-pointer">
        <div className="block relative h-48 rounded overflow-hidden">
          <img className="object-cover object-center w-full h-full block" src={products.images[0].url} alt={products.name} />
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium">{products.name}</h2>
          <StarRatings rating={products.ratings}
            starDimension="16px"
            starSpacing="1px"
            starRatedColor="orange"
          /> <span>({products.numOfReviews} Reviews)</span>
          <p className="mt-1 font-bold text-orange-500">{`₹${products.price}`}</p>
        </div>
      </Link>
    </>
  )
}

export default ProductCard