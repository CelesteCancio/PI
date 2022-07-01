import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchVideogames } from "../../redux/actions";
import VideogameCard from "../VideogameCard/VideogameCard";

export default function Videogames (){
    let videogames = useSelector( (state) => state.videogames); //mapStateToProps en clase    
    let dispatch = useDispatch(); 
    useEffect (() => {
        dispatch (fetchVideogames());
    }, []); //ejecuta accion cdo se monta el componente
    console.log(videogames);
    return (
        <div>
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

{/* <div key={videogame.id}>
<h3>{videogame.name}</h3>
<img src={videogame.image} alt={videogame.name}/>
</div> */}