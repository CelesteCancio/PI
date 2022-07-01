import {Link} from "react-router-dom";

export default function VideogameCard ({id, name, image, genres, rating}){
    return (
        <Link to={`/videogame/${id}`}>
            <div key={id}>            
                <h2>{name}</h2>   
                <h2>{id}</h2>         
                <img src={image} alt={name}/>
                <h3>{genres && `Géneros: ${genres.join(", ")}`}</h3>
                <h3>{`Rating: ${rating}`}</h3>
                {/* <button onClick={(e) => addFavourite(e)}>Agregar a favoritos</button> */}
            </div>
        </Link>
    )    
}

