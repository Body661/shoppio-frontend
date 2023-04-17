import {Container, Row, Spinner} from 'react-bootstrap';
import CubeCard from '../Utility/CubeCard';
import categoriesIcon from '../../imgs/Icons/categories.png';
import {Backdrop, CircularProgress} from "@mui/material";

const CategoryContainer = ({categories, loading, error, isAll}) => {
    let content = null;

    if (loading && !categories && !error && !isAll) {
        content = content = <Spinner animation="border" variant="primary"/>;

    } else if (!loading && !error && categories && categories?.length > 0) {
        content = categories.map((category) => (
            <CubeCard key={category._id} id={category._id} title={category.name} img={category.img} url="categories"/>
        ));
    } else if (!loading && !error && (!categories || categories?.length <= 0)) {
        content = <h4 className="notFound">No categories found</h4>;

    } else if (!loading && error && (!categories || categories?.length <= 0)) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isAll}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            {isAll &&
                <div className="page-header">
                    <img src={categoriesIcon} className="page-header-icon"/>
                    <span className="page-header-text">
                        All categories
                    </span>
                </div>
            }
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
};

export default CategoryContainer;
