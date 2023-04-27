import {Button, Card, CardImg} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import UseWishlist from "../../hook/products/useWishlist";
import UseAddToCart from "../../hook/user/cart/useAddToCart";
import {Star} from "@mui/icons-material";

const HomeProductCard = ({product, isFavProduct}) => {
    const {favImg, handleFav} = UseWishlist(product, isFavProduct)

    const {addToCartHandle} = UseAddToCart(product);

    return (
        <Card className="my-2 product-card">
            <div className="product-card-img-holder b-radius-20">
                <img
                    src={favImg}
                    onClick={handleFav}
                    alt="favorite"
                    className="favorite-icon-right"
                />

                <Link to={`/products/${product?._id}`}>
                    <CardImg src={product?.cover} className="product-cover"/>
                </Link>
            </div>

            <Card.Body>
                <Card.Title>
                    <div className="product-card-title text-center">
                        {product?.title}
                    </div>
                </Card.Title>
                <Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <Star style={{fontSize: "17px"}}/>
                            <div className="product-card-rate-text mx-2">{product?.ratingsAvg?.toFixed(1) || 0}</div>
                        </div>
                        <div className="d-flex">
                            <div className="product-card-price">
                                {product.priceAfterDiscount >= 1 ?
                                    (<div>
                                            <span
                                                style={{
                                                    textDecorationLine: 'line-through',
                                                    color: "gray"
                                                }}> €{product.price} </span> {" "} €{product.priceAfterDiscount}
                                    </div>) : ` € ${product.price}`}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <Button className="section-header-btn" onClick={addToCartHandle}>Add to cart</Button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default HomeProductCard
