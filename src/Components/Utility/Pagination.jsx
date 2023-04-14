import React from 'react'
import ReactPaginate from "react-paginate";
import next from "../../imgs/Icons/next.png"
import previous from "../../imgs/Icons/previous.png"

const Pagination = ({pageCount, onPress}) => {

    const handlePageClick = (data) => {
        onPress(data.selected + 1)
    };
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<img src={next} alt="Next page" className="pagination-icon"/>}
            previousLabel={<img src={previous} alt="Previous page" className="pagination-icon"/>}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            containerClassName={"pagination justify-content-center p-3 gap-2 align-items-center"}

            pageLinkClassName={"page-link"}

            previousLinkClassName={"previous-page"}
            nextClassName={"page-item"}
            previousClassName={"previous-page"}
            nextLinkClassName={"next-page"}

            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
        />
    )
}

export default Pagination