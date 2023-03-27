import React from 'react'
import {Card, Col} from 'react-bootstrap'
import rate from "../../images/rate.png";
import {Link} from 'react-router-dom';
import UseWishlist from "../../hook/products/useWishlist";

const ProductCard = ({item, favProd}) => {
    const {favImg, handleFav} = UseWishlist(item, favProd)

    return (
        <Col sm="6" md="4" lg="3" className="d-flex" key={item?._id}>

            <Card
                className="my-2"
                style={{
                    width: "100%",
                    height: "345px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                }}>
                <Link to={`/products/${item?._id}`} style={{
                    textDecoration: 'none',
                    overflow: "hidden",
                    width: "100%",
                    height: "100%"
                }}>
                    <Card.Img src={item?.cover} style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}/>
                </Link>
                <div className="d-flex justify-content-end mx-2">
                    <img
                        src={favImg}
                        onClick={handleFav}
                        alt=""
                        className="text-center"
                        style={{
                            height: "24px",
                            width: "26px",
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Title>
                        <div className="card-title">
                            {item?.title}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <div className="d-flex justify-content-between ">
                            <div className="d-flex">
                                <img
                                    className=""
                                    src={rate}
                                    alt=""
                                    height="16px"
                                    width="16px"
                                />
                                <div className="card-rate mx-2">{item?.ratingsAvg || 0}</div>
                            </div>
                            <div className="d-flex">
                                <div className="card-price">
                                    {item.priceAfterDiscount >= 1 ?
                                        (<div><span
                                            style={{textDecorationLine: 'line-through'}}>{item.price}</span> {item.priceAfterDiscount}
                                        </div>)
                                        : item.price}
                                </div>
                                <div className="card-currency mx-1">euro</div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
