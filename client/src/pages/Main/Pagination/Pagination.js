import { PaginationContainer } from './Pagination.styled';
// import { Link } from 'react-router-dom';

export default function Pagination({ totalPages, curPage, onPageChange }) {

  function generatePageNumbers() {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (curPage <= maxVisiblePages - 2) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (curPage >= totalPages - (maxVisiblePages - 3)) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = curPage - 2; i <= curPage + 2; i++) {
          pageNumbers.push(i);
        }
        // pageNumbers.push(curPage - 1);
        // pageNumbers.push(curPage);
        // pageNumbers.push(curPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }

  return (
    <PaginationContainer>
      {curPage !== 1 &&
        // <Link to={`/questions?page=${curPage - 1}`}>
        <button
          onClick={() => {
            onPageChange(curPage - 1);
            window.scrollTo(0, 0);
          }}
          disabled={curPage === 1}
        >
          Prev
        </button>
        // </Link>
      }

      {generatePageNumbers().map((pageNumber, index) => (
        // <Link
        // key={index}
        // to={`/questions?page=${pageNumber}`}
        // >
        <button
          key={index}
          className={pageNumber === '...' ? 'not-number' : ''}
          onClick={() => {
            if (pageNumber !== '...') {
              onPageChange(pageNumber);
            }
            window.scrollTo(0, 0);
          }}
          disabled={pageNumber === curPage || pageNumber === '...'}
        >
          {pageNumber}
        </button>
        // </Link>
      ))
      }

      {
        curPage !== totalPages &&
        // <Link to={`/questions?page=${curPage + 1}`}>
        <button
          onClick={() => {
            onPageChange(curPage + 1);
            window.scrollTo(0, 0);
          }}
          disabled={curPage >= totalPages}
        >
          Next
        </button>
        // </Link>
      }
    </PaginationContainer >
  );
}
