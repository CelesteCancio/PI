import React from "react";
import { useDispatch } from "react-redux";
import { sortByDate } from "../../redux/actions";

export default function BtnSortDate (){

    const [state, setState] = React.useState({sort:""});        
    let dispatch = useDispatch();

    function handleChange (e){
        setState( (previousState) => ({...previousState, sort:e.target.value}));
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch (sortByDate(state.sort));//increasing o decreasing...
        setState({sort:""})
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Ordenar por fecha
                    <select value={state.sort} onChange={(e) => handleChange(e)}>
                        <option>Seleccionar orden</option>
                        <option value="increasing">Mayor a menor fecha</option>
                        <option value="decreasing">Menor a mayor fecha</option>                               
                    </select>
                </label>
                <input type="submit" value="Ordenar" />
            </form>
        </div>
    )
}