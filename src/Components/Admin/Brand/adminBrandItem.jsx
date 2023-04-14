import React from 'react';
import {Button, Col, Modal, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import deleteIcon from "../../../images/delete.png";
import editIcon from "../../../images/edit.png";
import useDeleteBrand from "../../../hook/admin/Brand/useDeleteBrand";

function AdminBrandItem({brand}) {

    const {
        isModalOpen,
        handleModalClose,
        handleModalOpen,
        deleteHandler,
        loading,
        isPress
    } = useDeleteBrand(brand?._id)

    return (
        <>
            <Modal show={loading && isPress}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Deleting brand, please wait</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Spinner animation="border" variant="primary"/>
                </Modal.Body>
            </Modal>

            <Modal show={isModalOpen} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="font">Delete confirmation</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Are you sure you want to delete this brand?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" className="font" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="font" onClick={deleteHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col xs={8} sm={6} md={4} lg={2}
                 className="mb-3 admin-category-card-holder d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between">
                    <Link to={`/admin/update-brand/${brand?._id}`} className="d-flex">
                        <img alt="" className="ms-1 mt-2" src={editIcon} height="17px" width="15px"/>
                        <p className="item-delete-edit"> Edit </p>
                    </Link>

                    <div onClick={handleModalOpen} className="d-flex">
                        <img alt="" className="ms-1 mt-2" src={deleteIcon} height="17px" width="15px"/>
                        <p className="item-delete-edit"> Delete </p>
                    </div>
                </div>

                <Link to={`/brands/${brand?._id}`} style={{textDecoration: 'none'}}>
                    <div
                        className="category-card"
                        style={{backgroundImage: `URL(${brand?.img})`}}
                    />
                    <p className="category-card-text my-2">{brand?.name}</p>
                </Link>
            </Col>
        </>
    );
}

export default AdminBrandItem;