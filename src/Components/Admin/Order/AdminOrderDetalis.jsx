import {useMemo} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import useChangeOrderStatus from '../../../hook/admin/useChangeOrderStatus';
import useGetOrderDetails from '../../../hook/admin/useGetOrderDetails';
import OrderCard from '../../User/Order/OrderCard';

const AdminOrderDetails = () => {
    const {id} = useParams();

    const {orderData} = useGetOrderDetails(id);
    const {onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder} =
        useChangeOrderStatus(id);

    const clientDetails = useMemo(() => {
        const user = orderData?.user || {};

        return [
            {label: 'Name', value: user.name || ''},
            {label: 'Phone', value: user.phone || ''},
            {label: 'Email', value: user.email || ''},
        ];
    }, [orderData]);

    return (
        <div>
            <OrderCard orderItem={orderData}/>

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                    <div className="admin-content-text py-2">Client details</div>
                </Col>

                {clientDetails.map(({label, value}) => (
                    <Col xs="12" className="d-flex" key={label}>
                        <div style={{color: '#555550', fontSize: '16px'}}>{label}:</div>

                        <div style={{color: '#979797', fontSize: '16px'}} className="mx-2">
                            {value}
                        </div>
                    </Col>
                ))}

                <div className="d-flex mt-2 justify-content-center">
                    <div>
                        <select
                            name="pay"
                            id="paid"
                            onChange={onChangePaid}
                            className="select input-form-area mt-1  text-center w-50"
                        >
                            <option value="">Payment status</option>
                            <option value="true">Paid</option>
                            <option value="false">Not paid</option>
                        </select>
                        <button onClick={changePayOrder} className="btn-a px-2 d-inline mx-1 ">
                            Save
                        </button>
                    </div>
                    <div>
                        <select
                            onChange={onChangeDeliver}
                            name="deliver"
                            id="deliver"
                            className="select input-form-area mt-1  text-center  w-50"
                        >
                            <option value="">Delivery status</option>
                            <option value="true">Delivered</option>
                            <option value="false">Not Delivered</option>
                        </select>
                        <button onClick={changeDeliverOrder} className="btn-a px-2 d-inline mx-1 ">
                            Save
                        </button>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default AdminOrderDetails;