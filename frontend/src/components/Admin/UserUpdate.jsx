import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../redux/actions/userAction';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import Sidebar from './Sidebar';

const UserUpdate = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const userId = params.id
  const navigate = useNavigate()
  const { loading, error, userDetail, updateLoading, updateError, isUpdated } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userDetail && userDetail._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
      setRole(userDetail.role);
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
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: 'updateUserReset' });
    }
  }, [dispatch, error, isUpdated, updateError, userDetail, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };



  return (
    <div className='lg:min-h-[80vh] flex flex-col-reverse lg:flex-row'>
      <div className='mx-auto my-10 w-full min-h-[60vh]'>
        <MetaData title={"Shopie - Update User"} />
        {
          loading ? (<Loader />) : (
            <>
              <form className="mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full my-20" onSubmit={updateUserSubmitHandler}>
                <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Update User</h1>
                <div className="relative mb-4">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input required type="name" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input required type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="role" className="leading-7 text-sm text-gray-600">Select Role</label>
                  <select required id="role" onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400">
                    <option value={''}>Choose Role</option>
                    <option value={'user'}>User</option>
                    <option value={'admin'}>Admin</option>
                  </select>
                </div>
                <button className="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  {updateLoading ? (<>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Updating...
                  </>) : (
                    <>
                      Update User
                    </>
                  )}
                </button>
              </form>
            </>
          )
        }
      </div>
      <Sidebar />
    </div>
  )
}

export default UserUpdate