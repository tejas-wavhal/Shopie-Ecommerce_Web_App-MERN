import Footer from "./components/Layouts/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import NotFound from "./components/Layouts/NotFound";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Profile from "./components/Users/Profile";
import ChangePassword from "./components/Users/ChangePassword";
import UpdateProfile from "./components/Users/UpdateProfile";
import Cart from "./components/Cart/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from "./redux/actions/userAction";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment.jsx";
import PaymentSuccess from "./components/Cart/PaymentSuccess.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import MyOrders from './components/Order/MyOrders'
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Loader from "./components/Layouts/Loader";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import CreateProduct from './components/Admin/CreateProduct'
import Orders from './components/Admin/Orders'
import Reviews from './components/Admin/Reviews'
import Users from './components/Admin/Users'
import AllProducts from './components/Admin/AllProducts'
import UserUpdate from "./components/Admin/UserUpdate";
import ProductUpdate from "./components/Admin/ProductUpdate";
import OrderUpdate from "./components/Admin/OrderUpdate";
import About from "./components/About/About";

export default function App() {
  const { isAuthenticated, error, message, loading, user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })  //so that the state will be empty
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })  //so that the state will be empty
    }
  }, [dispatch, error, message])

  //Strip
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser())
    getStripeApiKey()
  }, [])

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Toaster />
        {loading ? (<Loader />) : (
          <Routes>


            <Route exact path='/' element={<Home isAuthenticated={isAuthenticated} />} />
            <Route exact path='/products' element={<Products />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/login' element={<Login getStripeApiKey={getStripeApiKey} />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/resetpassword/:token' element={<ResetPassword />} />
            <Route exact path='/forgotpassword' element={<ForgotPassword />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/about' element={<About />} />


            {/* Login Routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              {isAuthenticated &&
                <>
                  {stripeApiKey && (<Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />)}
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/changepassword' element={<ChangePassword />} />
                  <Route exact path='/updateprofile' element={<UpdateProfile />} />
                  <Route exact path='/shipping' element={<Shipping />} />
                  <Route exact path='/order/confirm' element={<ConfirmOrder />} />
                  <Route exact path='/payment/success' element={<PaymentSuccess />} />
                  <Route exact path='/orders' element={<MyOrders />} />
                  <Route exact path='/order/:id' element={<OrderDetails />} />
                </>
              }
            </Route>


            {/* Admin Routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin' ? true : false} />}>
              {isAuthenticated &&
                <>
                  <Route exact path='/admin/dashboard' element={<Dashboard />} />
                  <Route exact path='/admin/createproduct' element={<CreateProduct />} />
                  <Route exact path='/admin/products' element={<AllProducts />} />
                  <Route exact path='/admin/orders' element={<Orders />} />
                  <Route exact path='/admin/reviews' element={<Reviews />} />
                  <Route exact path='/admin/users' element={<Users />} />
                  <Route exact path='/admin/user/:id' element={<UserUpdate />} />
                  <Route exact path='/admin/product/:id' element={<ProductUpdate />} />
                  <Route exact path='/admin/order/:id' element={<OrderUpdate />} />
                </>
              }
            </Route>
            <Route exact path='*' element={<NotFound />} />
          </Routes>


        )}
        <Footer />
      </Router>
    </>
  )
}