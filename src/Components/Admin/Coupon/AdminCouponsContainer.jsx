import Pagination from "../../Utility/Pagination";
import {Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import AdminCouponCard from "./AdminCouponCard";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {useGetCoupons} from "../../../hook/admin/Coupon/useGetCoupons";

const AdminCouponsContainer = () => {
    const {coupons, pageCount, error, handleChangePage, loading, handleSearch} = useGetCoupons();

    let content = null;

    if (!loading && !error && coupons && coupons?.length > 0) {
        content = coupons?.map((coupon) => <AdminCouponCard key={coupon?._id} coupon={coupon}/>)
    } else if (!loading && !error && !coupons) {
        content = <h4 className="notFound">No coupons found</h4>;
    } else if (!loading && error && !coupons) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row className="d-flex justify-content-between align-items-center">
                <Col className="page-header mt-4" xs={12} md={6}>
                    <LocalOfferIcon style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> coupons </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/coupons/add-coupon'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add new coupon
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="d-flex align-items-center justify-content-end">
                <Col xs={12} md={6} className="mt-2">
                    <FormControl placeholder="Search by name" type="text" className="b-radius-10"
                                 onKeyPress={handleSearch}/>
                </Col>
            </Row>

            <Row className="mt-4">
                {content}
            </Row>

            <Row>
                {pageCount > 1 && <Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>}
            </Row>
        </Container>
    );
};

export default AdminCouponsContainer;