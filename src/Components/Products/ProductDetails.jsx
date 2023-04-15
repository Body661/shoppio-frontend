import {Row, Col, Button} from 'react-bootstrap'
import ImageGallery from "react-image-gallery";
import RightButton from "./Gallery/RightButton";
import LeftButton from "./Gallery/LeftButton";
import {Link, useParams} from "react-router-dom";
import UseAddToCart from "../../hook/user/cart/useAddToCart";
import {Rating} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UseWishlist from "../../hook/products/useWishlist";
import useProductsContainer from "../../hook/products/useProductsContainer";
import StarIcon from "@mui/icons-material/Star";

const ProductDetails = ({product, images}) => {
    const {favProd} = useProductsContainer()

    const {isFav, favImg, handleFav} = UseWishlist(product, favProd)

    const {id} = useParams();
    const {colorClick, indexColor, addToCartHandle} = UseAddToCart(id, product);

    return (<div className="product-details">
        <Row>
            <Col className="product-gallery mt-2">
                <div className="product-gallery-card">
                    <ImageGallery items={images}
                                  showFullscreenButton={false}
                                  showPlayButton={false}
                                  showThumbnails={false}
                                  renderRightNav={RightButton}
                                  renderLeftNav={LeftButton}
                                  lazyLoad={true}
                                  showBullets={true}
                                  infinite={false}
                    />
                </div>
            </Col>

            <Col className="mt-2">
                <Link to={`/categories/${product?.category?._id}`}
                      className="xs-black-text"> Category: {product?.category?.name} </Link>

                <h4 className="fw-bold mt-2">
                    {product?.title}
                </h4>

                <Link to={`/brands/${product?.brand?._id}`} className="xs-black-text d-block mt-2"> Brand: {product?.brand?.name ?? 'unknown'}</Link>

                <div>
                    {product?.priceAfterDiscount >= 1 ? (<>
                        <span style={{textDecorationLine: 'line-through'}}>
                            €{product?.price}
                        </span>

                        <span
                            className="fw-bold fs-2"> € {product?.priceAfterDiscount}
                        </span>
                    </>) : (<span className="fw-bold fs-2"> €{product?.price} </span>)}
                </div>

                <div className="xs-black-text mt-2">
                    Available quantity : {product?.quantity}
                </div>

                <div className="d-flex flex-row gap-2 align-items-center mt-2">
                    <Rating
                        name="simple-controlled"
                        value={product?.ratingsAvg}
                        readOnly
                        icon={<StarIcon style={{color: "black"}} fontSize="20px" color="black"/>}
                        emptyIcon={<StarIcon style={{opacity: 1}} fontSize="20px"/>}
                        precision={0.5}
                    />
                    <span>({product?.ratingsQuantity})</span>
                </div>

                <div className="product-description mt-2">
                    {product?.description}
                </div>

                <div className="mt-2">
                    <span className="fw-bold m-0">Choose color</span>

                    <div className="d-flex">
                        {product?.colors && product.colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => colorClick(index, color)}
                                className={`color ms-2 border mt-2 ${indexColor === index ? 'active' : ''}`}
                                style={{backgroundColor: color}}
                            />))}
                    </div>
                </div>


                <Row className="mt-4 d-flex justify-content-around">
                    <Col md="5" className="fav-cart-btn d-flex justify-content-center mt-2">
                        <Button onClick={handleFav}
                                className="btn-outline-dark btn-light b-radius-20 fw-bold flex-grow-1"
                                style={{transition: "0.5s"}}>
                            <img src={favImg} width="25px"/> {!isFav ? "Add to wishlist" : "Remove from wishlist"}
                        </Button>
                    </Col>

                    <Col md="5" className="fav-cart-btn d-flex justify-content-center mt-2">
                        <Button onClick={addToCartHandle}
                                className="btn-outline-light btn-dark b-radius-20 fw-bold flex-grow-1"
                                style={{transition: "0.5s"}}>
                            <ShoppingCart/> Add to cart
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-4 d-flex justify-content-around p-2">
                    <Col md={5} className="returns p-3 b-radius-10 mt-2">
                        <Row>
                            <span className="d-flex align-items-center justify-content-start fw-bold gap-2">
                                <CalendarMonthIcon/> Return Free Delivery
                            </span>
                        </Row>

                        <Row>
                            <span>
                                Free 30 days returns. Details
                            </span>
                        </Row>
                    </Col>

                    <Col md={5} className="returns p-3 b-radius-10 mt-2">
                        <Row>
                            <span className="d-flex align-items-center justify-content-start fw-bold gap-2">
                                <CalendarMonthIcon/> Return Free Delivery
                            </span>
                        </Row>

                        <Row>
                            <span>
                                Free 30 days returns. Details
                            </span>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>)
}

export default ProductDetails
