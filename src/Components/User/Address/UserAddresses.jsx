import {Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import useViewAddresses from '../../../hook/user/useViewAddresses';
import ProfileAddressCard from "./ProfileAddressCard";
import {Backdrop, CircularProgress} from "@mui/material";

const UserAddresses = () => {
    const {addresses, loading} = useViewAddresses();

    const renderAddresses = () => {
        if (addresses?.data?.data?.length > 0) {
            return addresses.data.data.map((address, index) => (
                <ProfileAddressCard key={index} address={address}/>
            ));
        }

        return <h6>No addresses</h6>;
    };

    return (
        <Row style={{backgroundColor: "var(--main-gray)"}} className="b-radius-10 mt-4 p-4">
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            {renderAddresses()}

            <Col sm="12" className="d-flex justify-content-center mt-4">
                <Link to="/user/add-address" style={{textDecoration: 'none'}}>
                    <button className="btn-save">Add new address</button>
                </Link>
            </Col>
        </Row>
    );
};

export default UserAddresses;