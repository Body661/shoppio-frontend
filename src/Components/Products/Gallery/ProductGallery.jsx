import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import useProductDetails from "../../../hook/products/useProductDetails";
import {useParams} from "react-router-dom";

const ProductGallery = () => {
    const {id} = useParams();
    const {images} = useProductDetails(id);

    return (
        <div className="product-gallery-card d-flex justify-content-center  align-items-center pt-2">
            <ImageGallery items={images}
                          showFullscreenButton={true}
                          showPlayButton={false}
                          showThumbnails={false}
                          renderRightNav={RightButton}
                          renderLeftNav={LeftButton}
                          lazyLoad={true}
                          showBullets={true}
                          infinite={false}
            />
        </div>
    )
}

export default ProductGallery
