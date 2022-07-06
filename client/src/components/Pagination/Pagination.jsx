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

      <div className= {style.pagination}>
        <ul>
          {pageNumbers && pageNumbers.map(num => (
            <li key={num} className= {style.item}> 
              <a className= {style.link} onClick = {() => paginate (num)}>{num}</a> 
            </li>
          ))}
        </ul>
      </div>

  )
}

export default Pagination;


