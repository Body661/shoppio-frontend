import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import ViewAddressesHook from '../../hook/user/viewAddressesHook';
import useCashOrder from '../../hook/checkout/useCashOrder';
import {ToastContainer} from 'react-toastify';
import GetUserCartHook from '../../hook/cart/useUserCart';
import OrderPayOnlineHook from '../../hook/checkout/useOnlinePay';
import notify from '../../hook/useNotification';

const ChoosePayMethod = () => {
    const [res] = ViewAddressesHook();
    const [type, setType] = useState('');

    const [handleChooseAddress, addressDetails, handleCreateOrderCash] = useCashOrder();

    const [handelCreateOrderOnline] = OrderPayOnlineHook(addressDetails);

    const {
        totalCartPrice,
        totalCartPriceAfterDiscount
    } = GetUserCartHook();

    const changeMethod = (e) => {
        setType(e.target.value);
    };

    const handelPay = () => {
        if (type === 'online') {
            handelCreateOrderOnline();
        } else if (type === 'cash') {
            handleCreateOrderCash();
        } else {
            notify('Please select pay method', 'warn');
        }
    };

    return (
        <div>
            <div className='admin-content-text pt-5'>Choose pay method</div>
            <div className='user-address-card my-3 px-3'>
                <Row className='d-flex justify-content-between '>
                    <Col xs='12' className='my-2'>
                        <input
                            onChange={changeMethod}
                            style={{cursor: 'pointer'}}
                            name='pay'
                            id='pay1'
                            type='radio'
                            value='online'
                            className='mt-2'
                        />
                        <label style={{cursor: 'pointer'}} className='mx-2' htmlFor='pay1'>
                            Online pay
                        </label>
                    </Col>
                </Row>

                <Row className='mt-2'>
                    <Col xs='12' className='d-flex'>
                        <input
                            style={{cursor: 'pointer'}}
                            onChange={changeMethod}
                            name='pay'
                            id='pay2'
                            type='radio'
                            value='cash'
                            className='mt-2'
                        />
                        <label style={{cursor: 'pointer'}} className='mx-2' htmlFor='pay2'>
                            Cash
                        </label>
                    </Col>
                </Row>

                <Row className='mt-2'>
                    <Col xs='4' className='d-flex'>
                        <select
                            name='address'
                            id='address'
                            className='select mt-1 px-2 '
                            onChange={handleChooseAddress}
                        >
                            <option value=''>Please select delivery address</option>
                            {res ? (
                                res?.data?.data?.map((item, index) => {
                                    return (
                                        <option key={item?._id} value={item?._id}>
                                            {item?.alias}
                                        </option>
                                    );
                                })
                            ) : (
                                <option key={0} value={0}>
                                    No addresses added
                                </option>
                            )}
                        </select>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col xs="12" className="d-flex justify-content-end">
                    <div className="product-price d-inline   border">

                        {
                            totalCartPriceAfterDiscount >= 1 ?
                                `${totalCartPrice} Euro ... After discount ${totalCartPriceAfterDiscount} ` :
                                `${totalCartPrice} Euro`
                        }

                    </div>
                    <div onClick={handelPay} className="product-cart-add px-3 pt-2 d-inline me-2">Complete order</div>
                </Col>
            </Row>
            <ToastContainer/>
        </div>
    )
}

export default ChoosePayMethod


