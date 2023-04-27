import {useRef} from 'react';
import {Row, Col, Container, FormControl, Button, Form} from 'react-bootstrap';
import useAddCoupon from '../../../hook/admin/Coupon/useAddCoupon';
import {Backdrop, CircularProgress} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const AddCoupon = () => {
    const dateRef = useRef();
    const {
        couponName,
        couponDate,
        discount,
        handleChangeName,
        handleChangeExpireDate,
        handleChangeDiscount,
        handleSubmit,
        loading,
        isSubmitted
    } = useAddCoupon();

    const handleDateFocus = () => {
        dateRef.current.type = 'date';
    };

    const handleDateBlur = () => {
        dateRef.current.type = 'text';
    };

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isSubmitted}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <LocalOfferIcon style={{fontSize: "45px"}}/>
                <span className="page-header-text"> Add coupon</span>
            </Col>

            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">
                <Row>
                    <Col>
                        <FormControl
                            value={couponName}
                            onChange={handleChangeName}
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Coupon name"
                        />
                        <FormControl
                            ref={dateRef}
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Expiration date"
                            onChange={handleChangeExpireDate}
                            value={couponDate}
                            onFocus={handleDateFocus}
                            onBlur={handleDateBlur}
                        />
                        <FormControl
                            value={discount}
                            onChange={handleChangeDiscount}
                            type="number"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Discount"
                        />
                    </Col>
                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Add coupon</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

};

export default AddCoupon;
