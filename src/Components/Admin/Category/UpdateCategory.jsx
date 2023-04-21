import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import useUpdateCategory from "../../../hook/admin/Category/useUpdateCategory";
import {useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {Category} from "@mui/icons-material";

const UpdateCategory = () => {
    const {id} = useParams();
    const {
        name,
        img,
        handleImageChange,
        handleSubmit,
        handleNameChange,
        loadingUpdate,
        isPress,
        loading
    } = useUpdateCategory(id);

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={(loadingUpdate && isPress) || loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Col className="page-header mt-4" xs={12} md={6}>
                <Category style={{fontSize: "45px"}}/>
                <span className="page-header-text">Edit category</span>
            </Col>

            <Row className="mt-4">
                <span className="xs-black-text"> Category ID: {id}</span>
            </Row>
            <Form style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 b-radius-20">
                <Row>
                    <Col style={{backgroundColor: "var(--main-white)"}} className="p-2 b-radius-10">
                        <FormGroup>
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
                        </FormGroup>

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
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Save changes</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
};

export default UpdateCategory;
