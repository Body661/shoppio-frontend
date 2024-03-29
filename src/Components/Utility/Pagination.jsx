import ReactPaginate from "react-paginate";
import next from "../../images/Icons/next.png"
import previous from "../../images/Icons/previous.png"

const Pagination = ({pageCount, handleChangePage}) => {

    const handlePageClick = (data) => {
        handleChangePage(data.selected + 1)
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