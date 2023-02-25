import React from 'react'
import {Row, Col} from 'react-bootstrap'
import ChangeOrderStatusHook from "../../hook/admin/changeOrderStatusHook";
import GetOrderDetailsHook from "../../hook/admin/getOrderDetailsHook";
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import UserAllOrderItem from "../User/UserAllOrderItem";

const AdminOrderDetails = () => {
    const { id } = useParams()
    const [orderData] = GetOrderDetailsHook(id)

    const [, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder] = ChangeOrderStatusHook(id)

    return (
        <div>

            <UserAllOrderItem orderItem={orderData} />

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                    <div className="admin-content-text py-2">Client details</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontSize: "16px",
                        }}>
                        Name:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData?.user ? orderData?.user?.name : '' : ''}
                    </div>
                </Col>

                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontSize: "16px",
                        }}>
                        Phone:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData?.user ? orderData?.user?.phone : '' : ''}
                    </div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontSize: "16px",
                        }}>
                        Email:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData?.user ? orderData?.user?.email : '' : ''}
                    </div>
                </Col>
                <div className="d-flex mt-2 justify-content-center">
                    <div>
                        <select
                            name="pay"
                            id="paid"
                            onChange={onChangePaid}
                            className="select input-form-area mt-1  text-center w-50">
                            <option value="">Payment status</option>
                            <option value="true">Paid</option>
                            <option value="false">Not paid</option>
                        </select>
                        <button onClick={changePayOrder} className="btn-a px-2 d-inline mx-1 ">Save</button>
                    </div>
                    <div>
                        <select
                            onChange={onChangeDeliver}
                            name="deliver"
                            id="deliver"
                            className="select input-form-area mt-1  text-center  w-50">
                            <option value="">Delivery status</option>
                            <option value="true">Delivered</option>
                            <option value="false">Not Delivered</option>
                        </select>
                        <button onClick={changeDeliverOrder} className="btn-a px-2 d-inline mx-1 ">Save</button>
                    </div>
                </div>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default AdminOrderDetails
