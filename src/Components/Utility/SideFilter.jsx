import useSidebarSearch from '../../hook/products/search/useSidebarSearch';
import {Sidebar, Menu, useProSidebar, sidebarClasses} from 'react-pro-sidebar';
import filter from "../../images/Icons/filter.png"
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Backdrop, CircularProgress} from "@mui/material";
import useSearch from "../../hook/products/useSearch";
import {useSelector} from "react-redux";

const SideFilter = () => {
    const {
        category,
        brand,
        handleClickCategory,
        handleClickBrand,
        loading
    } = useSidebarSearch();

    const searchParams = useSelector((state) => state.searchReducer.searchParams);

    const {toggleSidebar, broken} = useProSidebar();

    const {
        getSearchParams,
        handleChangePriceTo,
        handleChangePriceFrom,
    } = useSearch()

    const {priceFrom, priceTo} = getSearchParams()

    const renderCategoryOptions = () =>
        category.map((item, index) => (
            <div key={index} className="d-flex mt-3">
                <FormLabel>
                    <FormCheckInput onChange={handleClickCategory} type="checkbox" value={item._id}
                                    checked={searchParams?.checkedCategory?.includes(item?._id)}/> {item.name}
                </FormLabel>
            </div>
        ));

    const renderBrandOptions = () =>
        brand.map((item, index) => (
            <div key={index} className="d-flex mt-3">
                <FormLabel>
                    <FormCheckInput onChange={handleClickBrand} type="checkbox" value={item._id}
                                    checked={searchParams?.checkedBrand?.includes(item?._id)}/> {item.name}
                </FormLabel>
            </div>
        ));

    return (
        <div style={{display: 'flex', zIndex: "100"}}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Sidebar className="side-bar" customBreakPoint="768px" style={{overflow: "hidden"}}
                     rootStyles={{
                         [`.${sidebarClasses.container}`]: {
                             backgroundColor: 'white',
                             boxShadow: "none !important",
                         },
                         [`.${sidebarClasses.root}`]: {
                             boxShadow: "none !important",
                             border: "none"
                         }

                     }}>
                <Menu className="p-3">
                    <div className="d-flex flex-column mt-2">
                        <div className="filter-title">Categories</div>
                        <hr/>
                        <div className="d-flex mt-3">
                            <FormLabel>
                                <FormCheckInput onChange={handleClickCategory} type="checkbox" value={''}/> All
                            </FormLabel>
                        </div>
                        {category ? renderCategoryOptions() : <h6>No categories found</h6>}
                    </div>

                    <div className="d-flex flex-column mt-2">
                        <div className="filter-title mt-3">Brands</div>
                        <hr/>
                        <div className="d-flex mt-3">
                            <FormLabel>
                                <FormCheckInput onChange={handleClickBrand} type="checkbox" value={''}/> All
                            </FormLabel>
                        </div>
                        {brand ? renderBrandOptions() : <h6>No brands found</h6>}
                    </div>

                    <div className="filter-title my-3">Price</div>
                    <FormGroup className="d-flex">
                        <FormLabel className="d-flex align-items-center justify-content-between">
                            From: <FormControl
                            value={priceFrom}
                            onChange={handleChangePriceFrom}
                            className="m-2"
                            type="number"
                        />
                        </FormLabel>
                        <FormLabel className="d-flex align-items-center justify-content-between">
                            To: <FormControl
                            onChange={handleChangePriceTo}
                            value={priceTo}
                            className="m-2"
                            type="number"
                        />
                        </FormLabel>
                    </FormGroup>

                </Menu>
            </Sidebar>
            <main style={{padding: 10}}>
                {broken && (
                    <img src={filter} alt="Filter" style={{width: "25px", cursor: "pointer"}}
                         onClick={() => toggleSidebar()}/>
                )}
            </main>
        </div>
    );


};

export default SideFilter;
