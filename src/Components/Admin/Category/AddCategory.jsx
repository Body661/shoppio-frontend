import {Col, Row, Spinner} from "react-bootstrap";
import useAddCategory from "../../../hook/admin/Category/useAddCategory";
import React from "react";

const AddCategory = () => {
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
        <>
            <Col>
                <div className="admin-content-text pb-4">Add new category</div>
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
                        disabled={loading && isPress}
                    >
                        Save changes
                    </button>
                </div>
            </Col>

            {isPress && (
                <div className="mt-3">
                    {loading ? <Spinner animation="border" variant="primary"/> : null}
                </div>
            )}
        </>
    );
};

export default AddCategory;
