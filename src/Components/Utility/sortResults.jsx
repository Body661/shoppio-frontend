import UnopDropdown from "unop-react-dropdown";
import {Sort} from "@mui/icons-material";
import useSearch from "../../hook/products/useSearch";

const SortResults = ({title}) => {
    const {handleSetSortType} = useSearch()

    const selectSortType = (key) => {
        handleSetSortType(key)
    }
    return (
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="">{title}</div>
            <div className="d-flex">
                <UnopDropdown
                    trigger={
                        <Sort/>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div onClick={() => selectSortType("")} className="border-bottom card-filter-item">Clear sorting</div>
                        <div onClick={() => selectSortType("Best seller")} className="border-bottom card-filter-item">Best
                            seller
                        </div>
                        <div onClick={() => selectSortType("Most rated")} className="border-bottom card-filter-item">Most
                            rated
                        </div>
                        <div onClick={() => selectSortType("Price from low to high")}
                             className="border-bottom card-filter-item">Price from low to high
                        </div>
                        <div onClick={() => selectSortType("Price from high to low")} className=" card-filter-item">Price from
                            high to low
                        </div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default SortResults
