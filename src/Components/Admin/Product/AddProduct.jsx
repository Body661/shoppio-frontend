import {Row, Col, Container, FormControl, FormSelect, Form, Button} from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown';
import add from '../../../images/add.png'
import {CompactPicker} from "react-color";
import MultiImageInput from "react-multiple-image-input";
import useAddProduct from "../../../hook/admin/Product/useAddProduct";
import {Backdrop, CircularProgress} from "@mui/material";
import {Colorize, Inventory} from "@mui/icons-material";

const AddProduct = () => {

    const {
        onChangeDescription,
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
        loadingFetchData,
        isPress
    } = useAddProduct();

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
                <span className="page-header-text"> Add product</span>
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
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Product name"
                        />

                        <FormControl
                            as="textArea"
                            className="p-2 mt-3 b-radius-10"
                            rows="4"
                            cols="50"
                            placeholder="Product description"
                            value={prodDescription}
                            onChange={onChangeDescription}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Price before discount"
                            value={priceBefore}
                            onChange={onChangePriceBefore}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Price after discount"
                            value={priceAfter}
                            onChange={onChangePriceAfter}
                        />
                        <FormControl
                            type="number"
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Available quantity"
                            value={qty}
                            onChange={onChangeQty}
                        />

                        <FormSelect
                            type="select"
                            name="cat"
                            onChange={onSelectCategory}
                            className="mt-3 px-2 b-radius-10">
                            <option value={0}>Choose category</option>
                            {
                                category?.data?.data ? (category?.data?.data?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?._id}>{item?.name}</option>
                                    )
                                })) : null

                            }
                        </FormSelect>

                        <Multiselect
                            className="mt-3 b-radius-10"
                            placeholder="Subcategory"
                            options={options}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                        />

                        <FormSelect
                            name="brand"
                            onChange={onSelectBrand}
                            className="mt-3 px-2 b-radius-10">
                            <option value={0}>Choose brand</option>
                            {
                                brand?.data?.data ? (brand?.data?.data?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?._id}>{item?.name}</option>
                                    )
                                })) : null

                            }
                        </FormSelect>

                        <div style={{backgroundColor: "var(--main-white)"}} className="p-2 b-radius-10 mt-3 d-flex flex-column border border-1">
                            <div className="text-form">Colors</div>

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

                                <img onClick={onChangeColor} src={add} width="30px" height="35px"
                                     style={{cursor: 'pointer'}}/>
                                {
                                    showColor === true ? <CompactPicker onChangeComplete={handleAddColor}/> : null
                                }
                            </div>
                        </div>
                    </Col>

                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Add product</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddProduct
