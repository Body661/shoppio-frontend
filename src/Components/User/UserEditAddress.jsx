import React from 'react';
import { Row, Col } from 'react-bootstrap';
import useEditAddress from '../../hook/user/useEditAddress';
import { useParams } from 'react-router-dom';

const UserEditAddress = () => {
    const { id } = useParams();
    const { address, handleChange, handleSubmit } = useEditAddress(id);

    const renderInput = (name, placeholder) => (
        <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder={placeholder}
            value={address[name]}
            onChange={handleChange}
            name={name}
        />
    );

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-2">Edit address</div>
                <Col sm="8">
                    {renderInput('alias', 'Address alias')}
                    {renderInput('street', 'Street')}
                    {renderInput('postalCode', 'Postal code')}
                    {renderInput('phone', 'Phone number')}
                    {renderInput('city', 'City')}
                    {renderInput('country', 'Country')}
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2" onClick={handleSubmit}>
                        Save changes
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default UserEditAddress;
