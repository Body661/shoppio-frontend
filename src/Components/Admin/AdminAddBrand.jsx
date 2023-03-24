import React from 'react'
import {Row, Col, Spinner} from 'react-bootstrap'
import useAddBrand from "../../hook/brand/useAddBrand";

const AdminAddBrand = () => {
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
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Add new brand</div>
                <Col sm="8">
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
                    <input
                        type="text"
                        value={name}
                        className="input-form d-block mt-3 px-3"
                        placeholder="Brand name"
                        onChange={handleNameChange}
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
}

export default AdminAddBrand
