import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import BtnFilterOrigin from "../BtnFilterOrigin/BtnFilterOrigin";
import BtnFilterGenre from "../BtnFilterGenre/BtnFilterGenre";
import BtnReload from "../BtnReload/BtnReload";
import BtnSortAZ from "../BtnSortAZ/BtnSortAZ";

export default function NavBar (){    

    //si tuviera un estado local:
    //let [input, setInput] = React.useState ({name: "", lastName: ""});
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={'/home'}>Principal</NavLink>
                </li>
                <li>
                    <NavLink to={'/addVideogame'}>Agregar videojuego</NavLink>
                </li>
                <li><BtnFilterGenre/></li>
                <li><BtnFilterOrigin/></li>
                <li><BtnSortAZ/></li>
                <li><BtnReload/></li>
                <li><SearchBar/></li>                
            </ul>
        </nav>
    )
}