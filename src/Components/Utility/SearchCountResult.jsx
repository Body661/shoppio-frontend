import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import sort from '../../images/sort.png'

const SearchCountResult = ({title, onClick}) => {
    const clickMe = (key) => {
        localStorage.setItem("sortType", key)
        onClick();
    }
    return (
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="sub-tile">{title}</div>
            <div className="search-count-text d-flex ">
                <UnopDropdown
                    trigger={
                        <p className="mx-1">
                            <img
                                width="20px"
                                height="20px"
                                className="ms-1"
                                src={sort}
                                alt=""
                            />
                            Sort by
                        </p>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div onClick={() => clickMe(" ")} className="border-bottom card-filter-item">Clear sorting</div>
                        <div onClick={() => clickMe("Best seller")} className="border-bottom card-filter-item">Best
                            seller
                        </div>
                        <div onClick={() => clickMe("Most rated")} className="border-bottom card-filter-item">Most
                            rated
                        </div>
                        <div onClick={() => clickMe("Price from low to high")}
                             className="border-bottom card-filter-item">Price from low to high
                        </div>
                        <div onClick={() => clickMe("Price from high to low")} className=" card-filter-item">Price from
                            high to low
                        </div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default SearchCountResult
