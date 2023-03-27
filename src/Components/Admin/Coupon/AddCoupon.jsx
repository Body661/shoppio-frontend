import React, {useRef} from 'react';
import {Row, Col, Spinner} from 'react-bootstrap';
import useAddCoupon from '../../../hook/admin/Coupon/useAddCoupon';
import AdminCouponCard from '../AdminCouponCard';

const AddCoupon = () => {
    const dateRef = useRef();
    const {
        couponName,
        couponDate,
        couponValue,
        onChangeName,
        onChangeDate,
        onChangeValue,
        onSubmit,
        coupons,
        loading,
        isPress
    } = useAddCoupon();

    const handleDateFocus = () => {
        dateRef.current.type = 'date';
    };

    const handleDateBlur = () => {
        dateRef.current.type = 'text';
    };

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Add new coupon</div>
                <Col sm="8">
                    <input
                        value={couponName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Coupon name"
                    />
                    <input
                        ref={dateRef}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Expiration date"
                        onChange={onChangeDate}
                        value={couponDate}
                        onFocus={handleDateFocus}
                        onBlur={handleDateBlur}
                    />
                    <input
                        value={couponValue}
                        onChange={onChangeValue}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Discount"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">
                        Add coupon
                    </button>
                </Col>

                {isPress && <div>
                    {loading && <Spinner animation="border" role="status"/>}
                </div>}
            </Row>

            <Row>
                <Col sm="8" className="">
                    {coupons.length > 0 ? (
                        coupons.map((item, index) => <AdminCouponCard key={index} coupon={item}/>)
                    ) : (
                        <h6>No coupons found</h6>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default AddCoupon;
