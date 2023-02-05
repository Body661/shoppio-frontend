import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserAddressCard from './UserAddressCard'
import ViewAddressesHook from "../../hook/user/viewAddressesHook";

const UserAllAddress = () => {
    const [res] = ViewAddressesHook()

    return (
        <div>
            <div className="admin-content-text pb-4">Addresses</div>

            {
                res.data ? (res.data.map((item, index) => {
                    return <UserAddressCard key={index} item={item} />
                })) : <h6>No addresses</h6>
            }

            <Row className="justify-content-center">
                <Col sm="5" className="d-flex justify-content-center">
                    <Link to="/user/add-address" style={{ textDecoration: "none" }}>
                        <button className="btn-add-address">Add new address</button>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllAddress
