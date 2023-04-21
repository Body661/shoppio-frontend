import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormSelect,
    Row
} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {Category} from "@mui/icons-material";
import useUpdateSubcategory from "../../../hook/admin/Subcategory/useUpdateSubcategory";

const UpdateSubcategory = () => {
    const {id} = useParams();

    const {
        categoryId,
        name,
        loading,
        categories,
        handleChange,
        handleSubmit,
        onChangeName,
        isPress,
        loadingUpdate
    } = useUpdateSubcategory(id);

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
                <span className="xs-black-text"> Subcategory ID: {id}</span>
            </Row>

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
                            <option value="">Select main category</option>
                            {categories?.data?.data?.map((category) => (
                                <option selected={categoryId === category?._id} key={category?._id}
                                        value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </FormSelect>
                    </Col>

                    <Col sm="12" className="d-flex mt-3">
                        <Button onClick={handleSubmit} className="btn-dark w-100 b-radius-10">Save changes</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
};

export default UpdateSubcategory;
