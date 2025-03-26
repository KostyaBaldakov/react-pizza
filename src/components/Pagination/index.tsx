import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { FC } from "react";

type PaginationProps = {
  onChangePage: (num: number) => void;
  currentPage: number;
};

const Pagination: FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
