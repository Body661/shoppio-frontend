import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddressCard from './AddressCard';
import useViewAddresses from '../../../hook/user/useViewAddresses';

const UserAddresses = () => {
    const { addresses, loading } = useViewAddresses();

    const renderAddresses = () => {
        if (loading) {
            return <h6>Loading...</h6>;
        }

        if (addresses?.data?.data?.length > 0) {
            return addresses.data.data.map((item, index) => (
                <AddressCard key={index} item={item} />
            ));
        }

        return <h6>No addresses</h6>;
    };

    return (
        <div>
            <div className="admin-content-text pb-4">Addresses</div>
            {renderAddresses()}
            <Row className="justify-content-center">
                <Col sm="5" className="d-flex justify-content-center">
                    <Link to="/user/add-address" style={{ textDecoration: 'none' }}>
                        <button className="btn-save">Add new address</button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default UserAddresses;