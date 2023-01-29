import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Slider from '../../Components/Home/Slider';
import DiscountSection from '../../Components/Home/DiscountSection';
import HomeBrands from "../../Components/Home/HomeBrands";

const HomePage = () => {
    return (
        <div className='font' style={{minHeight: '670px'}}>

            <Slider/>
            <HomeCategory/>
            <CardProductsContainer title="Best seller" btnTitle="More" pathText="/products"/>
            <DiscountSection/>
            <CardProductsContainer title="Newest clothes" btnTitle="More" pathText="/products"/>
            <HomeBrands title="Brands" btnTitle="More" path="/allBrands"/>
        </div>
    )
}

export default HomePage
