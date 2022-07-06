import {Link} from "react-router-dom";
import styles from '../VideogameCard/videogameCard.module.css'

export default function VideogameCard ({id, name, image, genres, rating}){ //loading tb?
    return (
        <Link style={{ textDecoration: 'none'}} to={`/videogame/${id}`}>
            <div key={id} className={styles.container}>
                <div className={styles.subContainer}>
                    <h2 className={styles.cardH2}>{name}</h2>   
                    {/* <h2>{id}</h2>          */}
                    <div ><img className={styles.imgContainer} src={image} alt={name} width="180px"/></div>
                    <h3 className={styles.cardH3}>{genres && `${genres.join(", ")}`}</h3>
                    <h3 className={styles.cardH3}>{`Rating: ${rating}`}</h3>
                    {/* <button onClick={(e) => addFavourite(e)}>Agregar a favoritos</button> */}
                </div>            
            </div>
        </Link>
    )    
}

