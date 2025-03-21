import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonial/>
      <GenerateBtn/>
      <Footer/>
    </div>
  )
}

export default Home
