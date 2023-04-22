import {useParams} from 'react-router-dom';
import {Row, Col, Container, Button, Form, FormControl, FormSelect} from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import add from '../../../images/add.png'
import MultiImageInput from 'react-multiple-image-input';

import {CompactPicker} from 'react-color'
import useEditProduct from '../../../hook/admin/Product/useEditProduct';
import {Backdrop, CircularProgress} from "@mui/material";
import {Inventory} from "@mui/icons-material";

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
        isPress,
        loadingFetchData,
        selectedSubID,
        currentProductName
    } =
        useEditProduct(id);

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={(loading && isPress) || loadingFetchData}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <Inventory style={{fontSize: "45px"}}/>
                <span className="page-header-text">Edit product: {currentProductName}</span>
            </Col>

            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">

                <Row>
                    <Col>
                        <MultiImageInput
                            images={images}
                            setImages={setImages}
                            theme={"light"}
                            allowCrop={false}
                            max={5}
                        />

                        <FormControl
                            value={prodName}
                            onChange={onChangeProdName}
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Product name"
                        />
                        <FormControl
                            className="p-2 mt-3"
                            rows="4"
                            cols="50"
                            placeholder="Product description"
                            value={prodDescription}
                            onChange={onChangeDesName}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Price before discount"
                            value={priceBefore}
                            onChange={onChangePriceBefore}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Price after discount"
                            value={priceAfter}
                            onChange={onChangePriceAfter}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Available quantity"
                            value={qty}
                            onChange={onChangeQty}
                        />

                        <FormSelect
                            name="cat"
                            value={CatID}
                            onChange={onSelectCategory}
                            className="mt-3 px-2 ">
                            <option value="0">Select category</option>
                            {
                                category?.data?.data ? (category?.data?.data?.map((item) => {
                                    return (
                                        <option value={item?._id}>{item?.name}</option>
                                    )
                                })) : null

                            }
                        </FormSelect>

                        <Multiselect
                            className="mt-3"
                            placeholder="Subcategory"
                            options={options}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                            selectedValues={selectedSubID}
                        />

                        <FormSelect
                            name="brand"
                            value={BrandID}
                            onChange={onSelectBrand}
                            className="mt-3 px-2 ">
                            <option>Select Brand</option>
                            {
                                brand?.data?.data ? (brand?.data?.data?.map((item) => {
                                    return (
                                        <option value={item?._id}>{item?.name}</option>
                                    )
                                })) : null

                            }
                        </FormSelect>

                        <div style={{backgroundColor: "var(--main-white)"}}
                             className="p-2 b-radius-10 mt-3 d-flex flex-column border border-1">
                            <div className="text-form">Available Colors</div>
                            <div className="d-flex">
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
                        </div>
                    </Col>

                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Save changes</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AdminEditProducts