import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, getPlatforms } from "../../redux/actions";
import style from "../LandingPage/landingPage.module.css"


export default function LandingPage (){
        
    let dispatch = useDispatch();
    useEffect (() => {
        dispatch (getGenres());
    }, []); //ejecuta accion cdo se monta el componente

    // function handleClick (e){
    //     console.log(`en handle click`)
    //     dispatch (getGenres);
    //     //dispatch (getPlatforms);
    // }
    return (
        <div className={style.background}>
            <h1>Videogames' landing page</h1>
            <Link to = {'/home'}>
                <button>Entrar</button>
            </Link>
        </div>
    )
}
