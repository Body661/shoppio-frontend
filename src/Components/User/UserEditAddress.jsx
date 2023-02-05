import React from 'react'
import {Row, Col} from 'react-bootstrap'
import EditAddressHook from "../../hook/user/editAddressHook";
import {useParams} from "react-router-dom";

const UserEditAddress = () => {
    const { id } = useParams()
    const [handelEdit, alias, street, postalCode, phone, city, country, onChangeAlias, onChangeStreet, onChangePostalCode, onChangePhone, onChangeCity, onChangeCounty] = EditAddressHook(id)

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-2">Edit address</div>
                <Col sm="8">
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Address alias"
                        value={alias}
                        onChange={onChangeAlias}
                    />

                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Street"
                        value={street}
                        onChange={onChangeStreet}
                    />

                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Postal code"
                        value={postalCode}
                        onChange={onChangePostalCode}
                    />

                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Phone number"
                        value={phone}
                        onChange={onChangePhone}
                    />

                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="City"
                        value={city}
                        onChange={onChangeCity}
                    />

                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Country"
                        value={country}
                        onChange={onChangeCounty}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 " onClick={handelEdit}>Save changes</button>
                </Col>
            </Row>
        </div>
    )
}

export default UserEditAddress
