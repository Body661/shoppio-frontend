import {Button, Card, CardImg} from 'react-bootstrap'
import rate from "../../imgs/Icons/star-filled.png";
import {Link} from 'react-router-dom';
import UseWishlist from "../../hook/products/useWishlist";
import UseAddToCart from "../../hook/user/cart/useAddToCart";

const HomeProductCard = ({item, favProd}) => {
    const {favImg, handleFav} = UseWishlist(item, favProd)

    const {addToCartHandle} = UseAddToCart(item?._id, item);

    return (
        <Card className="my-2 product-card">
            <div className="product-card-img-holder b-radius-20">
                <img
                    src={favImg}
                    onClick={handleFav}
                    alt="favorite"
                    className="favorite-icon"
                />

                <Link to={`/products/${item?._id}`}>
                    <CardImg src={item?.cover} className="product-cover"/>
                </Link>
            </div>

            <Card.Body>
                <Card.Title>
                    <div className="product-card-title text-center">
                        {item?.title}
                    </div>
                </Card.Title>
                <Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img
                                alt="rating start"
                                src={rate}
                                className="product-card-rate-star"
                            />
                            <div className="product-card-rate-text mx-2">{item?.ratingsAvg.toFixed(1) || 0}</div>
                        </div>
                        <div className="d-flex">
                            <div className="product-card-price">
                                {item.priceAfterDiscount >= 1 ?
                                    (<div>
                                            <span
                                                style={{
                                                    textDecorationLine: 'line-through',
                                                    color: "gray"
                                                }}> €{item.price} </span> {" "} €{item.priceAfterDiscount}
                                    </div>) : ` € ${item.price}`}
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
