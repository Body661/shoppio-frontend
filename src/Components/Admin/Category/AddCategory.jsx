import {Button, Col, Container, Form, FormControl, FormLabel, Row} from "react-bootstrap";
import useAddCategory from "../../../hook/admin/Category/useAddCategory";
import {Backdrop, CircularProgress} from "@mui/material";
import {CategoryOutlined} from "@mui/icons-material";

const AddCategory = () => {
    const {
        img,
        name,
        loading,
        isSubmitted,
        handleNameChange,
        handleImageChange,
        handleSubmit
    } = useAddCategory();

    return (
        <Container>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isSubmitted}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <CategoryOutlined style={{fontSize: "45px"}}/>
                <span className="page-header-text"> Add category</span>
            </Col>

            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">
                <Row>
                    <Col style={{backgroundColor: "var(--main-white)"}} className="p-2 b-radius-10">
                        <FormLabel htmlFor="upload-photo" style={{width: "100px", height: "100px"}}>
                            <img
                                src={img}
                                alt="category logo"
                                className="mw-100 mh-100"
                                style={{cursor: "pointer"}}
                            />
                        </FormLabel>

                        <FormControl
                            style={{display: "none"}}
                            type="file"
                            name="photo"
                            onChange={handleImageChange}
                            id="upload-photo"
                        />
                    </Col>

                    <Col sm={12}>
                        <FormControl
                            onChange={handleNameChange}
                            value={name}
                            type="text"
                            className="mt-3 px-2 b-radius-10"
                            placeholder="Category Name"
                        />
                    </Col>

                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Add category</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default AddCategory;
