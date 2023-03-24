import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import HomeProducts from '../../Components/Home/HomeProducts';
import Slider from '../../Components/Home/Slider';
import DiscountSection from '../../Components/Home/DiscountSection';
import HomeBrands from "../../Components/Home/HomeBrands";
import useHomeProducts from "../../hook/products/useHomeProducts";

const HomePage = () => {
    const {
        bestSeller,
        categoryProducts,
        loadingAllProducts,
        errorAllProducts,
        loadingCatProducts,
        errorCatProducts
    } = useHomeProducts();

    return (
        <div className='font' style={{minHeight: '670px'}}>

            <Slider/>
            <HomeCategory title="Categories" btnTitle="More" path="/allCategory"/>
            <HomeProducts products={bestSeller} loading={loadingAllProducts} error={errorAllProducts} title="Best seller"
                          btnTitle="More"
                          pathText="/products"/>
            <DiscountSection/>
            <HomeProducts products={categoryProducts} loading={loadingCatProducts} error={errorCatProducts}
                          title="Newest clothes"
                          btnTitle="More" pathText="/products"/>
            <HomeBrands title="Brands" btnTitle="More" path="/allBrands"/>
        </div>
    )
}

export default HomePage
