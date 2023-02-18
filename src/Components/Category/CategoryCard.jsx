import React from 'react'
import {Col} from 'react-bootstrap'
import {Link} from "react-router-dom";

const CategoryCard = ({img, title, id}) => {
    return (
        <Col
            key={id}
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-4 d-flex justify-content-around ">
            <div className="allCard mb-3 ">
                <Link to={`/category/${id}`} style={{textDecoration: 'none'}}>
                    <div
                        className="category-card "
                        style={{backgroundImage: `URL(${img})`}}></div>
                    <p className="category-card-text my-2">{title}</p>
                </Link>
            </div>
        </Col>
    )
}

export default CategoryCard
