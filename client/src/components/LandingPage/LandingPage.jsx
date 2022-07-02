import { Link } from "react-router-dom";
import style from "../LandingPage/landingPage.module.css"


export default function LandingPage (){
            
    function handleClick (e){

    }
    return (
        <div className={style.background}>
            <h1>Videogames' landing page</h1>
            <Link to = {'/home'}>
                <button onClick={(e) => handleClick(e)}>Entrar</button>
            </Link>
        </div>
    )
}
