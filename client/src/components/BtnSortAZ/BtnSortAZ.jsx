import React from "react";
import { useDispatch } from "react-redux";
import { sortAZ } from "../../redux/actions";

export default function BtnSortAZ (){

    const [state, setState] = React.useState({sort:""});        
    let dispatch = useDispatch();

    function handleChange (e){
        setState( (previousState) => ({...previousState, sort:e.target.value}));
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch (sortAZ(state.sort));//az o za...
        setState({sort:""})
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Ordenar AZ - ZA
                    <select value={state.sort} onChange={(e) => handleChange(e)}>
                        <option>Seleccionar orden</option>
                        <option value="az">Ordenar A -`&GT;` Z</option>
                        <option value="za">Ordenar Z -`&GT;` A</option>                               
                    </select>
                </label>
                <input type="submit" value="Ordenar" />
            </form>
        </div>
    )
}