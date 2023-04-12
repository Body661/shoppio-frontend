import {useParams} from 'react-router-dom';
import {Row, Col, Spinner} from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import add from '../../../images/add.png'
import MultiImageInput from 'react-multiple-image-input';

import {CompactPicker} from 'react-color'
import useEditProduct from '../../../hook/admin/Product/useEditProduct';
import React from "react";

const AdminEditProducts = () => {
    const {id} = useParams();

    const {
        CatID,
        BrandID,
        onChangeDesName,
        onChangeQty,
        onChangeColor,
        onChangePriceAfter,
        onChangePriceBefore,
        onChangeProdName,
        showColor,
        category,
        brand,
        priceAfter,
        images,
        setImages,
        onSelect,
        onRemove,
        options,
        handleAddColor,
        removeColor,
        onSelectCategory,
        handleSubmit,
        onSelectBrand,
        colors,
        priceBefore,
        qty,
        prodDescription,
        prodName,
        loading,
        isPress
    } =
        useEditProduct(id);

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4"> Update product - {prodName}</div>
                <Col sm="8">
                    <div className="text-form pb-2"> Product images</div>

                    <MultiImageInput
                        images={images}
                        setImages={setImages}
                        theme={"light"}
                        allowCrop={false}
                        max={4}
                    />

                    <input
                        value={prodName}
                        onChange={onChangeProdName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Product name"
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="Product description"
                        value={prodDescription}
                        onChange={onChangeDesName}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Price before discount"
                        value={priceBefore}
                        onChange={onChangePriceBefore}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Price after discount"
                        value={priceAfter}
                        onChange={onChangePriceAfter}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Available quantity"
                        value={qty}
                        onChange={onChangeQty}
                    />
                    <select
                        name="cat"
                        value={CatID}
                        onChange={onSelectCategory}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">Select category</option>
                        {
                            category?.data?.data ? (category?.data?.data?.map((item) => {
                                return (
                                    <option value={item?._id}>{item?.name}</option>
                                )
                            })) : null

                        }
                    </select>

                    <Multiselect
                        className="mt-2 text-end"
                        placeholder="Subcategory"
                        options={options}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        style={{color: "red"}}
                    />
                    <select
                        name="brand"
                        value={BrandID}
                        onChange={onSelectBrand}
                        className="select input-form-area mt-3 px-2 ">
                        <option>Select Brand</option>
                        {
                            brand?.data?.data ? (brand?.data?.data?.map((item) => {
                                return (
                                    <option value={item?._id}>{item?.name}</option>
                                )
                            })) : null

                        }
                    </select>
                    <div className="text-form mt-3 ">Available Colors</div>
                    <div className="mt-1 d-flex">
                        {
                            colors.length >= 1 ? (
                                colors.map((color, index) => {
                                    return (
                                        <div key={index}
                                             onClick={() => removeColor(color)}
                                             className="color ms-2 border  mt-1"
                                             style={{backgroundColor: color}}></div>
                                    )
                                })

                            ) : null
                        }

                        <img onClick={onChangeColor} src={add} alt="" width="30px" height="35px"
                             style={{cursor: 'pointer'}}/>
                        {
                            showColor === true ? <CompactPicker onChangeComplete={handleAddColor}/> : null
                        }

                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handleSubmit} className="btn-save d-inline mt-2 " disabled={loading && isPress}>Save Changes</button>
                </Col>
            </Row>
            {isPress && (
                <div className="d-flex justify-content-center">
                    {loading && <Spinner animation="border" role="status"/>}
                </div>
            )}
        </div>
    )
}

export default AdminEditProducts