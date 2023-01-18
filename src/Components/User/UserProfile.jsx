import React from 'react'
import {Row, Col} from 'react-bootstrap'
import deleteIcon from '../../images/delete.png'

const UserProfile = () => {
    return (
        <div>
            <div className="admin-content-text">Profile</div>
            <div className="user-address-card my-3 px-2">
                <Row className="d-flex justify-content-between pt-2">
                    <Col xs="6" className="d-flex">
                        <div className="p-2">Name:</div>
                        <div className="p-1 item-delete-edit">Abdolrahman Saleh</div>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                        <div className="d-flex mx-2">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteIcon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> Edit</p>
                        </div>
                    </Col>
                </Row>

                <Row className="">
                    <Col xs="12" className="d-flex">
                        <div className="p-2">Phone:</div>
                        <div className="p-1 item-delete-edit">0122314324</div>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs="12" className="d-flex">
                        <div className="p-2">Email:</div>
                        <div className="p-1 item-delete-edit">abdolrahman@gmail.com</div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs="10" sm="8" md="6" className="">
                        <div className="admin-content-text">Change password</div>
                        <input
                            type="password"
                            className="input-form d-block mt-1 px-3"
                            placeholder="Old password"
                        />
                        <input
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="New password"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs="10" sm="8" md="6" className="d-flex justify-content-end ">
                        <button className="btn-save d-inline mt-2 ">Save password</button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default UserProfile
