import {Link} from "react-router-dom";
import styles from '../VideogameCard/videogameCard.module.css'

export default function VideogameCard ({id, name, image, genres, rating}){
    return (
        <Link to={`/videogame/${id}`}>
            <div key={id} className={styles.container}>            
                <h2 className={styles.cardH2}>{name}</h2>   
                {/* <h2>{id}</h2>          */}
                <div className={styles.imgContainer}><img src={image} alt={name} width="300px"/></div>
                <h3 className={styles.cardH3}>{genres && `Géneros: ${genres.join(", ")}`}</h3>
                <h3 className={styles.cardH3}>{`Rating: ${rating}`}</h3>
                {/* <button onClick={(e) => addFavourite(e)}>Agregar a favoritos</button> */}
            </div>
        </Link>
    )    
}

