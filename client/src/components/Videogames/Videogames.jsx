import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchVideogames } from "../../redux/actions";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import VideogameCard from "../VideogameCard/VideogameCard";
import style from '../Videogames/videogames.module.css';

export default function Videogames (){
    let videogames = useSelector( (state) => state.videogames); //mapStateToProps en clase    
    let dispatch = useDispatch(); 

    // const [activePage, setActivePage] = useState (1); //siempre arranco en la 1ra
    // const [videogamesPerPage, setVideogamesPerPage] = useState (15);
    // const lastVideogameIndex = activePage * videogamesPerPage;
    // const firstVideogameIndex = lastVideogameIndex - videogamesPerPage;
    // const activeVideogames = videogames.slice(firstVideogameIndex,lastVideogameIndex);

    // function pagination (page) {
    //     setActivePage(page);
    // } 

    useEffect (() => {
        dispatch (fetchVideogames());        
    }, [dispatch]); //ejecuta accion cdo se monta el componente
    console.log(videogames);
    return (
        <div className= {style.container}>
            <ErrorComponent/>
            {videogames && videogames.map((videogame) => (
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
    )
}