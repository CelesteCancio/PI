import React from 'react';
import style from '../Pagination/pagination.module.css';

const Pagination = ({videogamesPerPage, totalVideogames, paginate}) => {
  console.log(videogamesPerPage, totalVideogames);
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(totalVideogames/videogamesPerPage); i++){
    pageNumbers.push(i); 
  }
  console.log(pageNumbers);

  return (
    <div className= {style.center}>
      <div className= {style.pagination}>
        {pageNumbers && pageNumbers.map(num => (
          <a key={num} onClick = {() => paginate (num)}>{num}</a> 
          ))}
      </div>
    </div>
  )
}

export default Pagination;

