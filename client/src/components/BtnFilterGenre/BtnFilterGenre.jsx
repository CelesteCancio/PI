import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { filterByGenre, getGenres } from "../../redux/actions";

export default function BtnFilterGenre (){

    const [state, setState] = React.useState({genre:""});    
    let genres = useSelector( (state) => state.genres); //mapStateToProps en clase 
    let dispatch = useDispatch();

    useEffect (() => {
        dispatch (getGenres());
    }, [dispatch]); //ejecuta accion cdo se monta el componente

    function handleChange (e){
        setState( (previousState) => ({...previousState, genre:e.target.value}));
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch (filterByGenre(state.genre));//action, adventure...
        setState({genre:""})
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Filtrar por género
                    <select value={state.genre} onChange={(e) => handleChange(e)}>
                        <option>Seleccionar género</option>
                        {genres.map(genreObject => {
                            return (
                            <option key={genreObject.id} value={genreObject.name}>
                                {genreObject.name}
                            </option>)
                            })
                        }                
                    </select>
                </label>
                <input type="submit" value="Filtrar" />
            </form>
        </div>
    )
}