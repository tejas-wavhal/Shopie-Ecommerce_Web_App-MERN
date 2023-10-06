import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../../redux/actions/productAction';
import MetaData from '../Layouts/MetaData';
import Sidebar from './Sidebar'

const ProductUpdate = () => {

  const dispatch = useDispatch();
  const params = useParams()
  const navigate = useNavigate()

  const { error, productDetails } = useSelector((state) => state.productDetails);

  const { loading, isUpdated, error: updateError } = useSelector((state) => state.updateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Mobile',
    'Laptop',
    'Shoes',
    'T-Shirt',
    'Other Gadgets'
  ]

  const productId = params.id;

  useEffect(() => {
    if (productDetails && productDetails._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(productDetails.name);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setCategory(productDetails.category);
      setStock(productDetails.Stock);
      setOldImages(productDetails.images);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (updateError) {
      toast.error(updateError);
      dispatch({ type: 'clearError' });
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: 'updateProductReset' });
    }
  }, [
    dispatch,
    error,
    history,
    isUpdated,
    productId,
    productDetails,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={"Shopie - Update Product"} />
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto mb-10 min-h-[60vh] w-full'>

          <div className='mx-auto my-10 w-[80%]'>
            <form className="mx-auto lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col my-20" onSubmit={updateProductSubmitHandler}>
              <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Update Product</h1>
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input required type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="relative mb-4">
                <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                <input required type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="relative mb-4">
                <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                <input required type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="relative mb-4">
                <label htmlFor="category" className="leading-7 text-sm text-gray-600">Select Category</label>
                <select required id="category" onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400">
                  <option value={category}>{category}</option>
                  {
                    categories.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))
                  }
                </select>
              </div>
              <div className="relative mb-4">
                <label htmlFor="stock" className="leading-7 text-sm text-gray-600">Stock</label>
                <input required type="number" id="stock" name="stock" value={Stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600" htmlFor="file_input">Upload Images</label>
                <input accept='image/*' multiple className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={updateProductImagesChange} />
              </div>
              <div className='flex mb-5 overflow-scroll space-x-2'>
                {oldImages && oldImages.map((image, index) => (
                  <img key={index} className='h-24' src={image.url} alt="Product Images" />
                ))}
              </div>
              <div className='flex mb-5 overflow-scroll space-x-2'>
                {imagesPreview && imagesPreview.map((image, index) => (
                  <img key={index} className='h-24' src={image} alt="Product Images" />
                ))}
              </div>
              <button className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg" type='submit' disabled={loading ? true : false}>
                {loading ? (<>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </>) : (
                  <>
                    Update Product
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default ProductUpdate