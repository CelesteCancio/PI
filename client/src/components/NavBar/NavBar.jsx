import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import BtnFilterOrigin from "../BtnFilterOrigin/BtnFilterOrigin";
import BtnFilterGenre from "../BtnFilterGenre/BtnFilterGenre";
import BtnReload from "../BtnReload/BtnReload";
import BtnSortAZ from "../BtnSortAZ/BtnSortAZ";
import BtnSortRating from "../BtnSortRating/BtnSortRating";
import style from "../NavBar/navBar.module.css";

export default function NavBar (){    

    //si tuviera un estado local:
    //let [input, setInput] = React.useState ({name: "", lastName: ""});
    return (
        <nav>
            <ul className={style.main}>
                <li className={style.links}>
                    <NavLink style={{ textDecoration: 'none', color: 'white'}} to={'/home'}>Principal</NavLink>
                </li>
                <br/>
                <li>
                    <NavLink style={{ textDecoration: 'none', color: 'white', fontSize:'14px'}}to={'/addVideogame'}>Agregar videojuego</NavLink>
                </li>

                <li><BtnReload/></li>
              
            </ul>
            <ul>
                <li><BtnFilterGenre/></li>
                <li><BtnFilterOrigin/></li>
                <li><BtnSortAZ/></li>
                <li><BtnSortRating/></li>
                <li><SearchBar/></li>  
            </ul>
        </nav>
    )
}