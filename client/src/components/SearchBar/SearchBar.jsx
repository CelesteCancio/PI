import React from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../redux/actions";

export default function SearchBar (){

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
            <label>Buscá tu videojuego</label>
            <input type={'text'} name="search" value={state.search} onChange={(e) => handleChange(e)}/>
            <button onClick={(e) => handleClick(e)}>Buscar</button>
        </div>
    )
}