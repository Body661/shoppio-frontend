import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../../Components/User/UserSideBar'
import UserOrders from '../../../Components/User/Order/UserOrders'
const UserOrdersPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                  <UserOrders />
                </Col>
            </Row>
        </Container>
    )
}


export default UserOrdersPage
