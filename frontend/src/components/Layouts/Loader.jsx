import React from 'react'

const Loader = () => {
  return (
    <>
      <div role="status" className='flex justify-center mt-[35vh] min-h-[50vh] lg:min-h-[60vh]'>
      <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-orange-500 md:ml-5"></div>
      </div>
    </>
  )
}

export default Loader