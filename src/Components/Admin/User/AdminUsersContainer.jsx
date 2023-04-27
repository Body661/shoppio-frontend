import {Button, Col, Container, FormCheck, FormControl, FormLabel, Row} from "react-bootstrap";
import AdminUserCard from "./AdminUserCard";
import Pagination from "../../Utility/Pagination";
import {useAllUsers} from "../../../hook/admin/user/useAllUsers";
import {Person} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";

const AdminUsersContainer = () => {
    const {
        users,
        pageCount,
        handleChangePage,
        loading,
        handleSearchByMail,
        handleChooseRole
    } = useAllUsers();

    return (
        <Container>
            <Backdrop
                xs={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row className="d-flex justify-content-between align-items-center">
                <Col className="page-header mt-4" xs={12} md={6}>
                    <Person style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Users </span>
                </Col>

                <Col sm={12} md={6}>
                    <Link to='/admin/user-management/add-user'
                          className="mt-3 d-flex justify-content-center">
                        <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                                style={{transition: "0.5s"}}>
                            Add user
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="d-flex align-items-center justify-content-end">
                <Col xs={12} md={3} className="d-flex gap-2 align-items-center justify-content-center mt-2">
                    <FormLabel className="d-flex gap-2 align-items-center m-0">
                        All <FormCheck type="radio" value="" name="role" onChange={handleChooseRole}/>
                    </FormLabel>
                    <FormLabel className="d-flex gap-2 align-items-center m-0">
                        User <FormCheck type="radio" value="user" name="role" onChange={handleChooseRole}/>
                    </FormLabel>
                    <FormLabel className="d-flex gap-2 align-items-center m-0">
                        Admin <FormCheck type="radio" value="admin" name="role" onChange={handleChooseRole}/>
                    </FormLabel>
                </Col>
                <Col xs={12} md={3} className="mt-2">
                    <FormControl placeholder="Search by email" type="text" className="b-radius-10" onKeyPress={handleSearchByMail}/>
                </Col>
            </Row>

            <Row className="my-1 d-flex gap-lg-4 justify-content-center">
                {users?.map((user) => <AdminUserCard key={user?._id} user={user}/>)}
            </Row>

            {pageCount > 1 && <Pagination pageCount={pageCount} handleChangePage={handleChangePage}/>}
        </Container>
    );
};

export default AdminUsersContainer;