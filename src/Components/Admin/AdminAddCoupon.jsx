import {useRef} from 'react'
import {Row, Col} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify';
import AddCouponHook from '../../hook/coupon/addCouponHook';
import AdminCouponCard from './AdminCouponCard';

const AdminAddCoupon = () => {
    const dateRef = useRef();
    const [couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons] = AddCouponHook()
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
                        onFocus={() => dateRef.current.type = "date"}
                        onBlur={() => dateRef.current.type = "text"}
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
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">Add coupon</button>
                </Col>
            </Row>

            <Row>
                <Col sm="8" className="">
                    {
                        coupons ? (coupons.map((item, index) => {
                            return <AdminCouponCard key={index} coupon={item}/>
                        })) : <h6>No coupons found</h6>
                    }

                </Col>
            </Row>

            <ToastContainer/>
        </div>
    )
}

export default AdminAddCoupon