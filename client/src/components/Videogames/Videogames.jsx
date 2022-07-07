import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchVideogames } from "../../redux/actions";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import VideogameCard from "../VideogameCard/VideogameCard";
import style from '../Videogames/videogames.module.css';
import Pagination from "../Pagination/Pagination";

export default function Videogames (){
    let videogames = useSelector( (state) => state.videogames); //mapStateToProps en clase    
    let dispatch = useDispatch(); 


    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);


    useEffect (() => {        
        dispatch (fetchVideogames());             
    }, [dispatch]); //ejecuta accion cdo se monta el componente
    console.log(videogames);

    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstVideogame,indexOfLastVideogame);

    function paginate (pageNumber) {
        setCurrentPage (pageNumber);
    } 

    return (
        <div>
            <ErrorComponent/> 
            <Pagination videogamesPerPage={videogamesPerPage} totalVideogames = {videogames.length} paginate = {paginate}/>
                       
            
            <div className= {style.container}>            
            {currentVideogames && currentVideogames.map((videogame) => ( 
                <VideogameCard 
                key={videogame.id} 
                id={videogame.id}
                name={videogame.name}
                image={videogame.image}
                genres={videogame.genres}
                rating={videogame.rating}
                />

            ))}
            </div>
        </div>
    )
}