import React from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../redux/actions";

import Genre from '../Genre/Genre';

export default function Filter (){

    let [state, setState] = React.useState ({search:""});
    let dispatch = useDispatch();

    function handleChange (e) {        
        setState( (previousState) => ({...previousState, search: e.target.value}));
    };

    function handleClick (e){
        dispatch (searchVideogames(state.search));
        setState({search:""})
    }

    return (
        <div>
            <menu label='Filtrar'>
                <menuitem label='Por género'>
                {/* {genres && genres.map((genre) => (
                <Genre name={genre.name}/> */}
                    {/* <menuitem><Genre/></menuitem> */}
                </menuitem>
                <menuitem label='Autor'>
                    <menuitem>Creación propia</menuitem>
                    <menuitem>API RAWG</menuitem>
                </menuitem>
            </menu>
            <input type={'text'} name="search" value={state.search} onChange={(e) => handleChange(e)}/>
            <button onClick={(e) => handleClick(e)}>Buscar</button>
        </div>
    )
}