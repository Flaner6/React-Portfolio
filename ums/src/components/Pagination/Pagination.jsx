import {  useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ nPages, currentPage, setCurrentPage, setRecordsPerPage }) => {
  const [goToPageValue, setGoToPageValue] = useState(1);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage < nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  const selectItemsPerPage = (selection) => {
    setRecordsPerPage(selection);
    setCurrentPage(1);
  };

  const goToPage = (e) => {
    e.preventDefault();
    const page = Number(goToPageValue) || 1;
    setCurrentPage(page);
    setGoToPageValue(page);
  };
  return (

    <>
    <div className={styles.itemsPerPage}>
      <label htmlFor='itemsPerPage'>Items per page: </label>
      <select
        name='itemsPerPage'
        id='itemsPerPage'
        onChange={(e) => {
          selectItemsPerPage(e.target.value);
        }}
      >
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
        <option value={12}>12</option>
      </select>
    </div>
    <div className={styles.goToPage}>
      <form onSubmit={(e) => goToPage(e)}>
        <label htmlFor='goToPage'>Go to Page: </label>
        <input
          type='number'
          max={nPages}
          min={1}
          name='goToPage'
          id='goToPage'
          value={goToPageValue}
          onInput={(e) => setGoToPageValue(e.target.value)}
          // onChange={(e) => changePageValue(e)}
        />
        <button className={styles.goButton} type='submit'>
          Go
        </button>
      </form>
    </div>
    <nav className={styles.pagination}>
    <ul >
      <li
        onClick={prevPage}
        className={currentPage === 1 ? styles.disabled : ''}
      >
        Previous
      </li>

      {pageNumbers.map((pgNumber) => (
        <li
          key={pgNumber}
          onClick={() => {
            setCurrentPage(pgNumber);
            console.log(pgNumber);
          }}
          className={`${currentPage === pgNumber ? styles.active : ''} `}
        >
          {pgNumber}
        </li>
      ))}

      <li
        onClick={nextPage}
        className={
          currentPage === pageNumbers.indexOf(nPages) + 1
            ? styles.disabled
            : ''
        }
      >
        Next
      </li>
    </ul>
  </nav>
    </>



  );
};

export { Pagination };
