import {Container, Row} from "react-bootstrap";
import React from "react";
import AdminUserCard from "./AdminUserCard";

const AdminUsersContainer = ({users}) => {
    return (
        <div>
            <Container className="my-3">
                <Row className="my-1 d-flex gap-lg-4 justify-content-center">
                    {users?.map((user) => <AdminUserCard user={user}/>)}
                </Row>
            </Container>
        </div>
    );
};

export default AdminUsersContainer;