import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import BtnFilterOrigin from "../BtnFilterOrigin/BtnFilterOrigin";
import BtnFilterGenre from "../BtnFilterGenre/BtnFilterGenre";
import BtnReload from "../BtnReload/BtnReload";
import BtnSortAZ from "../BtnSortAZ/BtnSortAZ";
import BtnSortRating from "../BtnSortRating/BtnSortRating";
import BtnSortDate from "../BtnSortDate/BtnSortDate";
import style from "../NavBar/navBar.module.css";

export default function NavBar (){    

    const myStyle = {
        color: "black",
        fontFamily: "Verdana",
        textDecoration: 'none',
        fontSize:'14px',
        fontWeight: "bold"
    }
    return (
        <nav>
            <ul className={style.main}>
                <li className={style.links}>
                    <NavLink style={{ textDecoration: 'none', color: 'white'}} to={'/home'}>Principal</NavLink>
                </li>
                <br/>
                <li>
                    <NavLink style={myStyle} to={'/addVideogame'}>Agregar videojuego</NavLink>
                </li>

                <li><BtnReload/></li>
              
            </ul>
            <ul>
                <li><BtnFilterGenre/></li>
                <li><BtnFilterOrigin/></li>
                <li><BtnSortAZ/></li>
                <li><BtnSortRating/></li>
                <li><BtnSortDate/></li>
                <li><SearchBar/></li>  
            </ul>
        </nav>
    )
}