import {Col} from 'react-bootstrap'
import {Link} from "react-router-dom";

const HomeBrandCard = ({img, id, title}) => (
    <Col xs={12} sm={8} md={6} lg={3} className="my-2">
        <Link to={`/brands/${id}`} className="home-brand-card d-flex align-items-center justify-content-around gap-2 p-2 b-radius-10">
            <img src={img} alt={title} className="home-brand-card-img b-radius-100p"/>

            <div>
                <p className="fw-bold">{title}</p>
                <span>Delivery with in 24 hours</span>
            </div>
        </Link>
    </Col>
)


export default HomeBrandCard
