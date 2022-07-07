import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/landingPage.module.css"


export default function LandingPage (){

    return (
        <div className={style.background}>
            <div className={style.main}>
                <h1>Videojuegos</h1>
                <h3>Información y mucho más</h3>
                <Link to = {'/home'}>
                    <button className={style.btnMain}>Entrar</button>
                </Link>
            </div>
        </div>
    )
}
