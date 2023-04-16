import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../../Components/User/UserSideBar'
import UserOrders from '../../../Components/User/Order/UserOrders'
const UserOrdersPage = () => {
    return (
        <Container >
            <Row className='d-flex flex-row align-items-start products-page-space-between'>
                <Col xs="1" sm="1" md="1">
                    <UserSideBar />
                </Col>

                <Col sm="11" xs="10" md="8" lg="9">
                  <UserOrders />
                </Col>
            </Row>
        </Container>
    )
}


export default UserOrdersPage
