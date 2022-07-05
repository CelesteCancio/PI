import React from "react";

export default function Paginado ({videogamesPerPage,videogames,pagination}){
    const pageNum = [];

    for (let i=0; i<Math.ceil (videogames/videogamesPerPage); i++){
        pageNum.push(i);
    }

    return (
        <nav>
            <ul>
                {pageNum && pageNum.map (num => {
                    <li key={num}>
                        <a onClick={()=>pagination(num)}>{num}</a>
                    </li>
                })}
            </ul>
        </nav>
    )
}