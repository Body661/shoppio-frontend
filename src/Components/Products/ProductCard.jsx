import React from 'react'
import {Card, Col} from 'react-bootstrap'
import rate from "../../images/rate.png";
import {Link} from 'react-router-dom';
import ProductWishlistHook from "../../hook/products/productWishlistHook";
import {ToastContainer} from "react-toastify";

const ProductCard = ({item, favProd}) => {
    const [, , handelFav, favImg] = ProductWishlistHook(item, favProd)

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
                <Link to={`/products/${item?._id}`} style={{textDecoration: 'none'}}>
                    <Card.Img style={{height: "228px", width: "100%"}} src={item?.cover}/>
                </Link>
                <div className="d-flex justify-content-end mx-2">
                    <img
                        src={favImg}
                        onClick={handelFav}
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
                                <div className="card-price">{item?.price}</div>
                                <div className="card-currency mx-1">euro</div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <ToastContainer/>
        </Col>
    )
}

export default ProductCard
