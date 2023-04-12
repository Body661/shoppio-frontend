import {Container, Row, Col, Spinner} from 'react-bootstrap'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import AdminUsersContainer from "../../../Components/Admin/User/AdminUsersContainer";
import {useAllUsers} from "../../../hook/admin/user/useAllUsers";
import Pagination from "../../../Components/Utility/Pagination";
import React from "react";

const UsersManagementPage = () => {
    const {users, pageCount, getPage, loading, error} = useAllUsers();

    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    {
                        loading && !error && !users && <Spinner animation="border" variant="primary"/>
                    }

                    {
                        !loading && !error && users &&
                        (
                            users?.length > 0 ? <AdminUsersContainer users={users}/> :
                                <h4 className="notFound">No users found</h4>
                        )
                    }

                    {
                        !loading && error && !users && <h4 className="error">Something went wrong</h4>
                    }

                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null
                    }

                </Col>
            </Row>
        </Container>
    )
}

export default UsersManagementPage
