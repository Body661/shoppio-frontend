import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Slider from '../../Components/Home/Slider';
import DiscountSection from '../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';

const HomePage = () => {
    return (
        <div className='font' style={{minHeight: '670px'}}>

            <Slider/>
            <HomeCategory/>
            <CardProductsContainer title="Best seller" btnTitle="More" pathText="/products"/>
            <DiscountSection/>
            <CardProductsContainer title="Newest clothes" btnTitle="More" pathText="/products"/>
            <BrandFeatured title="Famous brands" btnTitle="More" pathText="/allBrand"/>

        </div>
    )
}

export default HomePage
