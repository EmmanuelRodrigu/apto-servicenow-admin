import React from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
const cx = classNames.bind(styles);
export default function Pagination({
    paginate,
    updateParams,
}) {
    const { page, pageCount } = paginate;

    const handlePageClick = (event) => {
        const newPageCurrent = event.selected + 1;
        updateParams({ page: newPageCurrent });
    };
    const initialPage = page - 1;
    return (
        <ReactPaginate
            pageCount={pageCount}
            initialPage={initialPage}
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            disableInitialCallback={true}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            onPageChange={handlePageClick}
            containerClassName={cx('pagination')}
            pageClassName={cx('page-item')}
            previousClassName={cx('page-item')}
            nextClassName={cx('page-item')}
            activeClassName={cx('active')}
            pageLinkClassName={cx('page-link')}
            previousLinkClassName={cx('page-link')}
            nextLinkClassName={cx('page-link')}
        />
    );
}