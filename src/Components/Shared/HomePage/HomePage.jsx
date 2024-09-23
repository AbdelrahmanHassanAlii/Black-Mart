import React from 'react'
import Signupoffer from '../Signupoffer/Signupoffer'
import Contentphoto from '../Contentphoto/Contentphoto'
import BrandsBar from './BrandsBar/BrandsBar'
import Header from '../Header/Header'
import NewArrivals from './NewArrivals/NewArrivals'
import TopSelling from './TopSelling/Topselling'
import Footer from '../Footer/Footer'
export default function HomePage() {
  return (
    <div>
        <Signupoffer/>
        <Header/>
        <Contentphoto/>
        <BrandsBar/>
        <NewArrivals/>
        <TopSelling/>
        <Footer/>
      
    </div>
  )
}
