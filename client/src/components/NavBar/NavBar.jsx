import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

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
                <li>
                    <NavLink to={'/ejemplo'}>Ejemplo</NavLink>
                </li>
                <li>Filtrar</li>
                <li>Ordenar</li>
                <li><SearchBar/></li>                
            </ul>
        </nav>
    )
}