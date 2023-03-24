import React from 'react';
import {Row, Col} from 'react-bootstrap';
import useAddAddress from '../../hook/user/useAddAddress';

const UserAddAddress = () => {
    const {address, handleChange, handleSubmit} = useAddAddress();

    const renderInputField = (name, placeholder) => (
        <input
            name={name}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder={placeholder}
            value={address[name]}
            onChange={handleChange}
        />
    );

    return (
        <div>
            <Row className="justify-content-start">
                <div className="admin-content-text pb-2">Add new address</div>
                <Col sm="8">
                    {renderInputField('alias', 'Address alias')}
                    {renderInputField('street', 'Street')}
                    {renderInputField('postalCode', 'Postal code')}
                    {renderInputField('phone', 'Phone number')}
                    {renderInputField('city', 'City')}
                    {renderInputField('country', 'Country')}
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end">
                    <button className="btn-save d-inline mt-2" onClick={handleSubmit}>
                        Add address
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default UserAddAddress;
