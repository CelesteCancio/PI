import React, { useEffect } from "react";
import { useDispatch, useSelector }  from 'react-redux';
import { addVideogame, getGenres, fetchVideogames } from "../../redux/actions";

function validate (values){    
    const errorsObject = {};        
    if (!values.name) errorsObject.name = "El nombre no puede estar vacío";
    if (!values.description) errorsObject.description = "La descripción no puede estar vacía";
    if (values.description && values.description.length<5) errorsObject.description = "La descripción debe contener más de 5 caracteres";
    if (values.rating<0 || values.rating>5) errorsObject.rating = "El rating debe estar entre 0 y 5";        
    //if (values.genres.length>3) errorsObject.genres = "No se pueden seleccionar más de 3 géneros";  
    //if (values.platforms.length>5) errorsObject.platforms = "No se pueden seleccionar más de 5 plataformas";  
    if (!values.platforms) errorsObject.platforms = "Debe elegir al menos una plataforma";    
    return errorsObject;
}

export default function AddVideogame (){
    
    const [state, setState] = React.useState({
        name:"",
        description:"",
        released: "",
        rating: "",
        image:"",
        genresId:"",
        platforms:""
    });

    const [errors, setErrors] = React.useState({});
    const [isSubmit, setIsSubmit] = React.useState({submit:false});    
    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);

    function handleChange (e) {              
        setState( (previousState) => ({...previousState, [e.target.name]:e.target.value}));
        setErrors(validate ({...state,[e.target.name]:e.target.value}));  
    };

    let dispatch = useDispatch();
    // function handleSelectGenre (e) {
    //     setState((previousState) => ({...previousState, genre:[...state.genre,e.target.value]}));
    // }

    useEffect (() => {
        dispatch (getGenres());
        dispatch (fetchVideogames());
    }, []); //ejecuta accion cdo se monta el componente



    function handleSubmit (e){
        
        e.preventDefault();                  
        setErrors(validate(state));         
        setIsSubmit ((previousState) => ({...previousState, submit:true})); 
    };

    useEffect(() => {
        
        if(Object.keys(errors).length === 0 && isSubmit.submit){
            console.log('if');
            dispatch (addVideogame(state));
            setState({        
                name:"",
                description:"",
                released: "",
                rating: "",
                image:"",
                genres:"",
                platforms:""
            })
            alert(`Videojuego creado correctamente.`)
        }
        console.log(`fuera del if`)
    },[errors]) //ejecuta accion cdo se actualiza el componente xq cambia el estado [errors]

    return (
        <React.Fragment>
            <div>Agregar videojuego</div>
            <br/>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type={'text'} name="name" value={state.name} onChange={(e) => handleChange(e)}></input>
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="description" value={state.description} onChange={(e) => handleChange(e)}></textarea>
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input type={'date'} name="released" value={state.released} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Rating</label>
                    <input type={'number'} name="rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type={'text'} name="image" value={state.image} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Generos </label>
                    <select value={state.genresId} onChange={(e) => handleChange(e)}>
                        <option>Seleccionar género</option>
                        {genres.map(genreObject => {
                            return (
                            <option key={genreObject.id} value={genreObject.id}>
                                {genreObject.name}
                            </option>)
                            })
                        }                
                    </select>                    
                </div>
                <div>
                    <label>Plataformas</label>
                    <select value={state.platforms} onChange={(e) => handleChange(e)}>
                        <option>Seleccionar plataforma</option>
                        {platforms.map(platformsObject => {
                            return (
                            <option key={platformsObject.id} value={platformsObject.name}>
                                {platformsObject.name}
                            </option>)
                            })
                        }                
                    </select>                      
                    {errors.platforms && (
                        <p>{errors.platforms}</p>
                    )}
                </div>
                <br/>
                <input type={'submit'} value={'Agregar'}/>
            </form>
        </React.Fragment>
    )
}