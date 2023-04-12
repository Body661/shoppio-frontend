import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../Components/User/UserSideBar'
import FavouriteProducts from '../../Components/User/FavouriteProducts'
const UserWishListPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <FavouriteProducts />
                </Col>
            </Row>
        </Container>
    )
}

export default UserWishListPage