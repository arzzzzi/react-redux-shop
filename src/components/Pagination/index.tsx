import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type IPagination = {
  currnetPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<IPagination> = ({ currnetPage, onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={2}
    forcePage={currnetPage - 1}
  />
);
export default Pagination;
