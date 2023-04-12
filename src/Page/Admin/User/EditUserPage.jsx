import {Col, Container, Row} from "react-bootstrap";
import AdminSideBar from "../../../Components/Admin/AdminSideBar";
import AdminEditUser from "../../../Components/Admin/User/AdminEditUser";

const EditUserPage = () => {
    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminEditUser/>
                </Col>
            </Row>
        </Container>
    );
};

export default EditUserPage;