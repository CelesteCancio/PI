import React from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../redux/actions";

export default function BtnFilterOrigin (){

    const [state, setState] = React.useState({origin:""});    
    let dispatch = useDispatch();

    function handleChange (e){
        setState( (previousState) => ({...previousState, origin:e.target.value}));
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch (filterByOrigin(state.origin));//API o DB
        setState({origin:""})
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Filtrar por origen
                    <select value={state.origin} onChange={(e) => handleChange(e)}>                    
                        <option>Seleccionar origen</option>
                        <option value="API">API</option>
                        <option value="DB">Base de datos</option>
                    </select>
                </label>
                <input type="submit" value="Filtrar" />
            </form>
        </div>
    )
}
