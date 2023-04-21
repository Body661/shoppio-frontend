import {Button, Col, Container, Form, FormControl, FormSelect, Row} from "react-bootstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import {CategoryOutlined} from "@mui/icons-material";
import useAddSubcategory from "../../../hook/admin/Subcategory/useAddSubcategory";

const AddCategory = () => {
    const {name, categories, handleChange, handleSubmit, onChangeName, loading, isPress} = useAddSubcategory();

    return (
        <Container>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isPress}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <CategoryOutlined style={{fontSize: "45px"}}/>
                <span className="page-header-text"> Add subcategory</span>
            </Col>

            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">
                <Row>
                    <Col>
                        <FormControl
                            value={name}
                            onChange={onChangeName}
                            type="text"
                            className="input-form d-block mt-3 px-3"
                            placeholder="Subcategory name"
                        />

                        <FormSelect name="category" id="cat" className="select mt-3 px-2" onChange={handleChange}>
                            <option value={0}>Select main category</option>
                            {categories?.data?.data?.map((category) => (
                                <option key={category?._id} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </FormSelect>
                    </Col>

                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Add subcategory</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default AddCategory;
