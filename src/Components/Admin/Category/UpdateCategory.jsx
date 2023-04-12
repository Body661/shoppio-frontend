import {Col, Container, Row, Spinner} from "react-bootstrap";
import React from "react";
import useUpdateCategory from "../../../hook/admin/Category/useUpdateCategory";
import {useParams} from "react-router-dom";

const UpdateCategory = () => {
    const {id} = useParams();
    const {
        name,
        img,
        handleImageChange,
        handleSubmit,
        handleNameChange,
        loadingUpdate,
        isPress
    } = useUpdateCategory(id);

    return (
        <>
            <Col>
                <div className="admin-content-text pb-4">Update category: {id}</div>
                <div className="text-form pb-2">Category image</div>
                <div>
                    <label htmlFor="upload-photo">
                        <img src={img} alt="category" width="120px" style={{cursor: "pointer"}}/>
                    </label>
                    <input style={{display: "none"}} type="file" name="photo" onChange={handleImageChange}
                           id="upload-photo"/>
                </div>

                <div className="d-flex gap-2 align-items-center mt-3">
                    <input
                        onChange={handleNameChange}
                        value={name}
                        type="text"
                        className="input-form  px-3"
                        placeholder="Category Name"
                    />

                    <button
                        onClick={handleSubmit}
                        className="btn-save"
                        disabled={loadingUpdate && isPress}
                    >
                        Save changes
                    </button>
                </div>
            </Col>


            {isPress && (
                <div className="mt-3">
                    {loadingUpdate ? <Spinner animation="border" variant="primary"/> : null}
                </div>
            )}
        </>
    )
};

export default UpdateCategory;
