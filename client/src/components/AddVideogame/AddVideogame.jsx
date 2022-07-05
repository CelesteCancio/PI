import React, { useEffect } from "react";
import { useDispatch, useSelector }  from 'react-redux';
import { addVideogame, getGenres, fetchVideogames } from "../../redux/actions";
import style from '../AddVideogame/addVideogame.module.css';

function validate (values){    
    const errorsObject = {};        
    if (!values.name) errorsObject.name = "El nombre no puede estar vacío";
    if (!values.description) errorsObject.description = "La descripción no puede estar vacía";
    if (values.description && values.description.length<5) errorsObject.description = "La descripción debe contener más de 5 caracteres";
    if (values.rating<0 || values.rating>5) errorsObject.rating = "El rating debe estar entre 0 y 5";        
    //if (values.genres.length>3) errorsObject.genres = "No se pueden seleccionar más de 3 géneros";  
    //if (values.platforms.length>5) errorsObject.platforms = "No se pueden seleccionar más de 5 plataformas";  
    if (values.platforms === "") errorsObject.platforms = "Debe elegir al menos una plataforma";    
    return errorsObject;
}

export default function AddVideogame (){
    
    const [state, setState] = React.useState({
        name:"",
        description:"",
        released: "",
        rating: "",
        image:"",
        genresId:[],
        platforms:[]
    });

    const [errors, setErrors] = React.useState({});
    const [isSubmit, setIsSubmit] = React.useState({submit:false});    
    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);
    let dispatch = useDispatch();

    function handleChange (e) {              
        setState( (previousState) => ({...previousState, [e.target.name]:e.target.value}));
        setErrors(validate ({...state,[e.target.name]:e.target.value}));  
    };


    function handleSelectGenre (e) {
        
        setState((previousState) => ({...previousState, genresId:e.target.value}));
        setErrors(validate ({...state,[e.target.name]:e.target.value}));  
    }

    function handleSelectPlatform (e) {
        
        setState((previousState) => ({...previousState, platforms:e.target.value}));
        setErrors(validate ({...state,[e.target.name]:e.target.value}));  
    }

    useEffect (() => {
        dispatch (getGenres());
        //dispatch (fetchVideogames());
    }, [dispatch]); //ejecuta accion cdo se monta el componente



    function handleSubmit (e){
        
        e.preventDefault();                  
        setErrors(validate(state));         
        //setIsSubmit ((previousState) => ({...previousState, submit:true})); 
        dispatch (addVideogame(state));
            setState({        
                name:"",
                description:"",
                released: "",
                rating: "",
                image:"",
                genres:[],
                platforms:[]
            })
    };

    // useEffect(() => {
        
    //     if(Object.keys(errors).length === 0 && isSubmit.submit){
    //         console.log('if');
    //         dispatch (addVideogame(state));
    //         setState({        
    //             name:"",
    //             description:"",
    //             released: "",
    //             rating: "",
    //             image:"",
    //             genres:[],
    //             platforms:[]
    //         })
    //         alert(`Videojuego creado correctamente.`)
    //     }
    //     console.log(`fuera del if`)
    // },[errors]) //ejecuta accion cdo se actualiza el componente xq cambia el estado [errors]

    return (
        <React.Fragment>
            <div className= {style.main}>
            <div className= {style.title}><h1>Agregar videojuego</h1></div>
            <br/>   
            <form className= {style.formulario} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type={'text'} name="name" value={state.name} onChange={(e) => handleChange(e)}></input>
                    {errors.name && (
                        <p className= {style.error}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="description" value={state.description} onChange={(e) => handleChange(e)}></textarea>
                    {errors.description && (
                        <p className= {style.error}>{errors.description}</p>
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
                    <label>Género </label>
                    <select value={state.genresId} onChange={(e) => handleSelectGenre(e)}>
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
                    <label>Plataforma</label>
                    <select value={state.platforms} onChange={(e) => handleSelectPlatform(e)}>
                        <option>Seleccionar plataforma</option>
                        {platforms.map(platform => {
                            return (
                            <option key={platforms.indexOf(platform)} value={platform}>
                                {platform}
                            </option>)
                            })
                        }                
                    </select>                      
                    {errors.platforms && (
                        <p className= {style.error}>{errors.platforms}</p>
                    )}
                </div>
                <br/>
                <input type={'submit'} value={'Agregar'} className= {style.submitForm}/>
            </form>
            </div>
        </React.Fragment>
    )
}