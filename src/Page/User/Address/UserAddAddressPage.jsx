import {Container, Row, Col} from 'react-bootstrap'
import UserSideBar from '../../../Components/User/UserSideBar'
import AddAddress from '../../../Components/User/Address/AddAddress';

const UserAddAddressPage = () => {
    return (
        <Container style={{minHeight: "80vh"}}>
            <Row className='d-flex flex-row align-items-start products-page-space-between'>
                <Col xs="1" sm="1" md="1">
                    <UserSideBar/>
                </Col>

                <Col sm="11" xs="10" md="8" lg="9">
                    <AddAddress/>
                </Col>
            </Row>
        </Container>
    )
}
export default UserAddAddressPage
