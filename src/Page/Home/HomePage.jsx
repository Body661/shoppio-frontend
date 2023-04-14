import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import HomeProducts from '../../Components/Home/HomeProducts';
import Slider from '../../Components/Home/Slider';
import AdSection from '../../Components/Home/AdSection';
import HomeBrands from "../../Components/Home/HomeBrands";
import useHomeProducts from "../../hook/products/useHomeProducts";
import cashBack from "../../imgs/Icons/money-back.png"
import amazon from "../../imgs/Ads/amazon.png"
import {Button} from "react-bootstrap";

const HomePage = () => {
    const {
        bestSeller,
        loadingAllProducts,
        errorAllProducts,
    } = useHomeProducts();

    return (
        <div className='font' style={{minHeight: '670px'}}>

            <Slider/>
            <HomeCategory title="Shop our top categories" btnTitle="More" path="/categories"/>

            <AdSection text={
                <>
                    <p>
                        Shop now! The newest amazon products
                    </p>
                    <Button to="/products" className="btn bg-white text-black border-0">Learn more</Button>
                </>
            } img={amazon} imgStyles="ad-img-lg" textStyles="ad-text-sm"/>

            <HomeProducts products={bestSeller} loading={loadingAllProducts} error={errorAllProducts}
                          title="Items you might like"
                          btnTitle="More"
                          pathText="/products"/>
            <AdSection text={
                <>
                    <p>
                        Get 10% cash back
                    </p>
                    <Button to="/products" className="btn bg-white text-black border-0">Learn more</Button>
                </>
            } img={cashBack} imgStyles="ad-img" textStyles="ad-text"/>

            <HomeBrands title="Choose by brand" btnTitle="More" path="/brands"/>
        </div>
    )
}

export default HomePage
