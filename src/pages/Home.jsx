import React from 'react'
import Header from '../component/Header'
import Banner from '../component/HomePage/Banner'
import Features from '../component/HomePage/Features'
import Footer from '../component/Footer'
import SubBanner from '../component/HomePage/SubBanner'

const Home = () => {
  return (
    <div>
      <Header />
     <div className="flex flex-col md:flex-row h-[500px] gap-4 mx-4 my-6">
      {/* Banner - takes 70% width */}
      <div className="w-full md:w-[70%] h-full">
        <Banner />
      </div>
      
      {/* ProductDisplay - takes 30% width */}
      <div className="w-full md:w-[30%] h-full">
        <SubBanner />
      </div>
    </div>
      <Features />
      <Footer />
    </div>
  )
}

export default Home