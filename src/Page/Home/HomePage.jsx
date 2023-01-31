import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import HomeProducts from '../../Components/Home/HomeProducts';
import Slider from '../../Components/Home/Slider';
import DiscountSection from '../../Components/Home/DiscountSection';
import HomeBrands from "../../Components/Home/HomeBrands";
import ViewHomeProductsHook from "../../hook/products/homeProductsHook";

const HomePage = () => {
    const [products, allProductsByCategory, loading, error] = ViewHomeProductsHook();

    return (
        <div className='font' style={{minHeight: '670px'}}>

            <Slider/>
            <HomeCategory title="Categories" btnTitle="More" path="/allCategory"/>
            <HomeProducts products={products} loading={loading} error={error} title="Best seller" btnTitle="More"
                          pathText="/products"/>
            <DiscountSection/>
            <HomeProducts products={allProductsByCategory} loading={loading} error={error} title="Newest clothes"
                          btnTitle="More" pathText="/products"/>
            <HomeBrands title="Brands" btnTitle="More" path="/allBrands"/>
        </div>
    )
}

export default HomePage
