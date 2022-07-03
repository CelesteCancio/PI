import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByGenre } from "../../redux/actions";

export default function BtnFilterGenre (){

    const [state, setState] = React.useState({genre:""});    
    let genres = useSelector( (state) => state.genres); //mapStateToProps en clase 
    let dispatch = useDispatch();

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



// <option>Seleccionar género</option>
// <option value="API">API</option>
// <option value="DB">Base de datos</option>

// import React from "react";
// import { useDispatch } from "react-redux";
// import { filterByGenre } from "../../redux/actions";

// import { useSelector } from "react-redux";

// import Genre from '../Genre/Genre';

// export default function BtnFilterGenre (){

//     const [state, setState] = React.useState({filter:""});
//     let genres = useSelector( (state) => state.genres); //mapStateToProps en clase    
//     let dispatch = useDispatch();

//     function handleClickGenre (e){
//         setState( (previousState) => ({...previousState, filter:e.target.value}));
//         dispatch (filterByGenre(state.filter));
//         setState({filter:""})
//     }



//     return (
//         <div>
//             <div>
//                 <label>
//                     Filtrar por género
//                     <select value="genero">
//                     <option value="az">A-`{'>'}`Z</option>
//                     <option value="za">Z-`{'>'}`A</option>
//                 </select>
//                 </label>
                
//             </div>
//         </div>
//     )
// }

// {<menu>Filtrar
//     <menuitem>
//         Por género
//     </menuitem>
//     <menuitem>
//         Por origen
//     </menuitem>
// </menu>
// }

{/* <label>
Filtrar por género
<select value="genero">
<option value="az">A-`{'>'}`Z</option>
<option value="za">Z-`{'>'}`A</option>
</select>
</label> */}

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