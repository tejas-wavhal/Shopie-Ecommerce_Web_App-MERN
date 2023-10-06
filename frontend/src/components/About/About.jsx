import React from 'react'
import MetaData from '../Layouts/MetaData'
import { AiFillInstagram, AiFillTwitterCircle, AiFillFacebook, AiFillGithub } from 'react-icons/ai'

const About = () => {

  return (
    <>
      <MetaData title={"Shopie - About"} />
      <section className='min-h-[80vh] '>
        <h1 className='text-4xl font-semibold my-10 text-center' >About</h1>
        <div className='mx-4 space-y-5 text-center text-gray-600 text-xl md:w-1/2 md:mx-auto leading-relaxed  '>
          <p>
            Shopie is a dynamic and user-friendly ecommerce website designed to provide an exceptional shopping experience for its customers. The website offers a vast collection of products across various categories, including clothing, electronics, beauty, home and kitchen, and many more. With its intuitive and sleek interface, Shopie makes it easy for customers to find and purchase the products they need, all from the comfort of their own home.
          </p>
        </div>
        <div className='mx-auto bg-orange-100 p-5 my-10 rounded-2xl border-2 border-orange-400 shadow-md w-80'>
          <h1 className='text-xl font-semibold text-center'>Contact Me:</h1>
          <p className='text-lg font-semibold text-center text-gray-700'>tejas.wavhal01@gmail.com</p>
        </div>
        <div className='md:flex md:items-center my-10  md:mx-52'>
          <img className="w-32 h-w-32 rounded-full mx-auto md:ml-32" src="https://i.postimg.cc/G2BXVQkP/Profile.jpg" alt="image_description" />
          <p className='my-3 text-center text-gray-700 md:mx-24 md:text-start'>I am Tejas Wavhal from Pune. I code React js beautifully simple, and i love what i do.</p>
        </div>
        <div className="flex text-3xl space-x-9 mb-9 justify-center mt-12">
          <a href=" https://www.instagram.com/tejas_7514/?__coig_restricted=1" target="_blank" rel="noreferrer">< AiFillInstagram className='hover:text-blue-800 text-gray-700' /></a>
          <a href="https://twitter.com/WavhalTejas" target="_blank" rel="noreferrer">< AiFillTwitterCircle className='hover:text-blue-800 text-gray-700' /></a>
          <a href="https://www.facebook.com/tejas.wavhal.9" target="_blank" rel="noreferrer">< AiFillFacebook className='hover:text-blue-800 text-gray-700' /></a>
          <a href="https://github.com/tejas-wavhal" target="_blank" rel="noreferrer">< AiFillGithub className='hover:text-blue-800 text-gray-700' /></a>
        </div>
      </section>
    </>
  )
}

export default About