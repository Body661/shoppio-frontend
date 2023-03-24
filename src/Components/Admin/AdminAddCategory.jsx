import {Col, Row, Spinner} from "react-bootstrap";
import useAddCategory from "../../hook/category/useAddCategory";
import React from "react";

const AdminAddCategory = () => {
    const {
        img,
        name,
        loading,
        isPress,
        handleNameChange,
        handleImageChange,
        handleSubmit
    } = useAddCategory();

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Add new category</div>
                <Col sm="8">
                    <div className="text-form pb-2">Category image</div>
                    <div>
                        <label htmlFor="upload-photo">
                            <img src={img} alt="category" height="100px" width="120px" style={{cursor: "pointer"}}/>
                        </label>
                        <input style={{display: "none"}} type="file" name="photo" onChange={handleImageChange}
                               id="upload-photo"/>
                    </div>

                    <input
                        onChange={handleNameChange}
                        value={name}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Category Name"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button
                        onClick={handleSubmit}
                        className="btn-save d-inline mt-2"
                        disabled={!img || !name || loading}
                    >
                        Save changes
                    </button>
                </Col>
            </Row>

            {isPress && (
                <div className="mt-3">
                    {loading ? <Spinner animation="border" variant="primary"/> : null}
                </div>
            )}
        </div>
    );
};

export default AdminAddCategory;
