import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MetaData from '../Layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/actions/orderAction'
import { getAdminProduct } from '../../redux/actions/productAction'
import { getAllUsers } from '../../redux/actions/userAction'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from 'react-router-dom'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Databox = ({ title, qty, link }) => (
  <Link to={`/admin/${link}`}>
    <div className='shadow-xl rounded-full text-center p-7 mx-5 bg-slate-100 w-fit hover:shadow-xl hover:shadow-orange-400 transition-all ease-linear border-2 border-orange-300 hover:-translate-y-1'>
      <h1 className='font-bold text-red-600'>{title}</h1>
      <h2 className='text-2xl foni-semibold'>{qty}</h2>
      <p className='text-gray-500 text-sm'>{`Total ${title}`}</p>
    </div>
  </Link>
)

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.order);

  const { users } = useSelector((state) => state.user);


  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["blue"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: 'Stocks',
        backgroundColor: ["red", "rgb(75 110 255)"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <MetaData title={"Shopie - Dashboard"} />
      <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
        <div className='mx-auto my-10 min-h-[60vh]'>
          <h1 className='text-2xl font-semibold mb-10 text-center' >Dashboard</h1>
          <div className='bg-orange-50 shadow-md py-5 space-y-2 mx-6 rounded-2xl border-2 border-orange-500 font-semibold text-center mb-10 md:w-1/3 md:mx-auto'>
            <h1>Total Amount</h1>
            <p className='font-bold text-xl text-green-600'>₹{(Math.round(totalAmount * 100) / 100).toFixed(2)}</p>
          </div>
          <div className='flex flex-row flex-wrap justify-center gap-y-5 mb-20'>
            <Databox link='products' title="Products" qty={products && products.length} />
            <Databox link='orders' title="Orders" qty={orders && orders.length} />
            <Databox link='users' title="Users" qty={users && users.length} />
            <div className='flex flex-col justify-center items-center space-y-10 '>

              <div>
                <Doughnut data={doughnutState} />
              </div>

              <div className="mx-auto w-[70vw] md:w-[70vw] lg:h-[60vh] flex flex-col justify-center items-center">
                <Line data={lineState} />
              </div>

            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Dashboard