import {Button} from 'react-bootstrap';
import useSidebarSearch from '../../hook/products/search/useSidebarSearch';
import {Sidebar, Menu, useProSidebar} from 'react-pro-sidebar';
import filter from "../../imgs/Icons/filter.png"

const SideFilter = () => {
    const {
        category,
        brand,
        handleClickCategory,
        handleClickBrand,
        handlePriceFrom,
        handlePriceTo,
    } = useSidebarSearch();
    const {collapseSidebar, toggleSidebar, collapsed, toggled, broken} = useProSidebar();

    const localFrom = sessionStorage.getItem('priceFrom');
    const localTo = sessionStorage.getItem('priceTo');

    const renderCategoryOptions = () =>
        category.map((item, index) => (
            <div key={index} className="d-flex mt-3">
                <input onChange={handleClickCategory} type="checkbox" value={item._id}/>
                <div className="filter-sub me-2 ">{item.name}</div>
            </div>
        ));

    const renderBrandOptions = () =>
        brand.map((item, index) => (
            <div key={index} className="d-flex mt-3">
                <input onChange={handleClickBrand} type="checkbox" value={item._id}/>
                <div className="filter-sub me-2 ">{item.name}</div>
            </div>
        ));

    return (
        <div style={{display: 'flex', height: '100%', minHeight: '400px', width: "fit-content"}}>
            <Sidebar customBreakPoint="768px" className="b-radius-20" style={{overflow: "hidden"}}>
                <Menu className="p-3">
                    <div className="d-flex flex-column mt-2">
                        <div className="filter-title">Category</div>
                        <div className="d-flex mt-3">
                            <input onChange={handleClickCategory} type="checkbox" value="0"/>
                            <div className="filter-sub me-2 ">All</div>
                        </div>
                        {category ? renderCategoryOptions() : <h6>No categories found</h6>}
                    </div>

                    <div className="d-flex flex-column mt-2">
                        <div className="filter-title mt-3">Brand</div>
                        <div className="d-flex mt-3">
                            <input onChange={handleClickBrand} type="checkbox" value="0"/>
                            <div className="filter-sub me-2 ">All</div>
                        </div>
                        {brand ? renderBrandOptions() : <h6>No brands found</h6>}
                    </div>

                    <div className="filter-title my-3">Price</div>
                    <div className="d-flex">
                        <p className="filter-sub my-2">From:</p>
                        <input
                            value={localFrom}
                            onChange={handlePriceFrom}
                            className="m-2 text-center"
                            type="number"
                            style={{width: '50px', height: '25px'}}
                        />
                    </div>
                    <div className="d-flex">
                        <p className="filter-sub my-2">To:</p>
                        <input
                            onChange={handlePriceTo}
                            value={localTo}
                            className="m-2 text-center"
                            type="number"
                            style={{width: '50px', height: '25px'}}
                        />
                    </div>

                </Menu>
            </Sidebar>
            <main style={{padding: 10}}>
                {broken && (
                    <img src={filter} alt="Filter" style={{width: "25px"}} onClick={() => toggleSidebar()}/>
                )}
            </main>
        </div>
    );


};

export default SideFilter;
