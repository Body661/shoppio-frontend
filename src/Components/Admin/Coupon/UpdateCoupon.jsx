import {Row, Col, Container, Form, FormControl, Button} from 'react-bootstrap';
import useEditCoupon from '../../../hook/admin/Coupon/useEditCoupon';
import {useParams} from 'react-router-dom';
import {Backdrop, CircularProgress} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const UpdateCoupon = () => {

    const {id} = useParams();
    const {
        couponName,
        couponDate,
        couponValue,
        onChangeName,
        onChangeDate,
        onChangeValue,
        onSubmit,
        loadingUpdate,
        isPress
    } = useEditCoupon(id)

    return (

        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loadingUpdate && isPress}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <LocalOfferIcon style={{fontSize: "45px"}}/>
                <span className="page-header-text"> Editing coupon</span>
            </Col>

            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">
                <Row>
                    <Col>
                        <FormControl
                            value={couponName}
                            onChange={onChangeName}
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Coupon name"
                        />
                        <FormControl
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Expiration date"
                            onChange={onChangeDate}
                            value={couponDate}
                        />
                        <FormControl
                            value={couponValue}
                            onChange={onChangeValue}
                            type="number"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Discount"
                        />
                    </Col>
                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={onSubmit} className="btn-dark w-100 b-radius-10">Save changes</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default UpdateCoupon