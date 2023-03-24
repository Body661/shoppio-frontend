import {Row, Col} from 'react-bootstrap';
import EditCouponHook from '../../hook/coupon/useEditCoupon';
import {useParams} from 'react-router-dom';

const AdminEditCoupon = () => {

    const {id} = useParams();
    const {couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit} = EditCouponHook(id)

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Editing coupon details</div>
                <Col sm="8">
                    <input
                        value={couponName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Coupon name"

                    />
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Expiration date"
                        onChange={onChangeDate}
                        value={couponDate}
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
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">Save changes</button>
                </Col>
            </Row>
        </div>
    )
}

export default AdminEditCoupon