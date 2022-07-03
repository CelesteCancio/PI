import React from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../redux/actions";
import { useSelector } from "react-redux";

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
                    {/* <select value={state.origin}> */}
                        <option>Seleccionar origen</option>
                        <option value="API">API</option>
                        <option value="DB">Base de datos</option>
                    </select>
                </label>
                <input type="submit" value="Buscar" />
            </form>
        </div>
    )
}

// {<menu>Filtrar
//     <menuitem>
//         Por género
//     </menuitem>
//     <menuitem>
//         Por origen
//     </menuitem>
// </menu>
// }

// <option value="az">A-`{'>'}`Z</option>
// <option value="za">Z-`{'>'}`A</option>

/* <menu label='Filtrar'>
                <menuitem label='Por género'>
                {genres && genres.map((genre) => (
                <Genre name={genre.name}/>
                    {<menuitem><Genre/></menuitem>
                </menuitem>
                <menuitem label='Autor'>
                    <menuitem>Creación propia</menuitem>
                    <menuitem>API RAWG</menuitem>
                </menuitem>
            </menu>
            <input type={'text'} name="search" value={state.search} onChange={(e) => handleChange(e)}/>
            <button onClick={(e) => handleClick(e)}>Buscar</button>  */