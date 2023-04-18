import {Button, Col, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const AdminUserCard = ({user}) => {

    return (
        <Link to={`/admin/user-management/${user?._id}`}>
            <Row style={{backgroundColor: "var(--main-gray)"}} className="p-2 b-radius-20 mt-2">
                <Col xs={12}>
                    <span className="fs-5 fw-bold">{user?.name}</span>
                </Col>

                <Col xs={12} className="mt-1">
                    <span>{user?.email}</span>
                </Col>

                <Col xs={12} className="mt-1">
                    <span>{user?.phone}</span>
                </Col>

                <Col xs={12} className="mt-1">
                    <span>{user?.role}</span>
                </Col>
            </Row>
        </Link>
    );
};

export default AdminUserCard;