import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CubeCard = ({img, title, id, url}) => (
    <Col xs={6} sm={6} md={4} lg={2} className="my-4 d-flex justify-content-center">
        <Link to={`/${url}/${id}`}
              className="cube-card d-flex flex-column align-items-center justify-content-center b-radius-10">
            <img src={img} alt={title} className="b-radius-10 w-100"/>
            <p className="my-2 fw-bold">{title}</p>
        </Link>
    </Col>
);

export default CubeCard;
