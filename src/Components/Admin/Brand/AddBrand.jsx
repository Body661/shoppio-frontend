import React from 'react'
import {Row, Col, Spinner} from 'react-bootstrap'
import useAddBrand from "../../../hook/admin/Brand/useAddBrand";

const AddBrand = () => {
    const {
        img,
        name,
        loading,
        isPress,
        handleNameChange,
        handleImageChange,
        handleSubmit,
    } = useAddBrand();


    return (
        <>
            <div className="admin-content-text pb-4">Add new brand</div>
            <Col>
                <div className="text-form pb-2">Brand logo</div>
                <div>
                    <label htmlFor="upload-photo">
                        <img
                            src={img}
                            alt="brand logo"
                            height="100px"
                            width="120px"
                            style={{cursor: "pointer"}}
                        />
                    </label>
                    <input
                        style={{display: "none"}}
                        type="file"
                        name="photo"
                        onChange={handleImageChange}
                        id="upload-photo"
                    />
                </div>

                <div className="d-flex gap-2 align-items-center mt-3">
                    <input
                        onChange={handleNameChange}
                        value={name}
                        type="text"
                        className="input-form  px-3"
                        placeholder="Brand Name"
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
}

export default AddBrand
