import React, { useEffect } from "react";
import { useDispatch, useSelector }  from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addVideogame, getGenres, getPlatforms } from "../../redux/actions";
import style from '../AddVideogame/addVideogame.module.css';



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

    const [error, setError] = React.useState({});    
    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);
    let dispatch = useDispatch();
    let history = useHistory();
    

    useEffect (() => {
        dispatch (getGenres());
        dispatch (getPlatforms());
    }, [dispatch]); //ejecuta accion cdo se monta el componente
      

    function validate ({name, description, rating, image, genresId, platforms}){    
        const errorsObject = {};        
        //let regexWhiteSpace = "^\s*$";
        //let urlRegex = "[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)";
        if (!name) errorsObject.name = "El nombre no puede estar vacío";        
        if (!description) errorsObject.description = "La descripción no puede estar vacía";
        if (description && description.length<5) errorsObject.description = "La descripción debe contener más de 5 caracteres";
        if (rating<0 || rating>5) errorsObject.rating = "El rating debe estar entre 0 y 5";                
        //if (!urlRegex.test(image)) errorsObject.image = "Ingrese URL válida";  
        if (genresId.length === 0) errorsObject.genresId = "Debe elegir al menos un género";
        if (platforms.length === 0) errorsObject.platforms = "Debe elegir al menos una plataforma";  
            
        return errorsObject;
    }


    function handleChange (e) {               
        setState( {...state, [e.target.name]:e.target.value});
        setError(validate( {...state, [e.target.name]:e.target.value}));  
    };
    

     function handleSelectGenre (e) {
        let optionsArray = e.target.options;
        let selectedGenreObject = {};

        for (let i=0; i<optionsArray.length; i++){
            if (optionsArray[i].selected){    
                selectedGenreObject.nameGenre = optionsArray[i].innerText;
                selectedGenreObject.valueGenre = optionsArray[i].value;         
            }
        }

        if (state.genresId.includes(selectedGenreObject.valueGenre)){            
            setState( {...state, genresId:[...state.genresId.filter(g => g !== selectedGenreObject.valueGenre)]});
                setError(validate( {...state, genresId:[...state.genresId.filter(g => g !== selectedGenreObject.valueGenre)]})); 
        }
        else{
            if (state.genresId.length<=2){
                setState( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]});
                setError(validate( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]})); 
            }
            else{
                alert(`No se pueden elegir mas de 3 géneros`)                
            }                
        } 
    }

        function handleSelectPlatform (e) {
            let optionsArray = e.target.options; 
            let selectedPlatform = "";
    
            for (let i=0; i<optionsArray.length; i++){
                if (optionsArray[i].selected){                                        
                    selectedPlatform = optionsArray[i].value;  
                }
            }
    
            if (state.platforms.includes(selectedPlatform)){
                setState( {...state, platforms:[...state.platforms.filter(g => g !== selectedPlatform)]});
                setError(validate( {...state, platforms:[...state.platforms.filter(g => g !== selectedPlatform)]}));                               
            }
            else{
                if (state.platforms.length<=3){
                    setState( {...state, platforms:[...state.platforms,selectedPlatform]});
                    setError(validate( {...state, platforms:[...state.platforms,selectedPlatform]})); 
                }
                else{
                    alert(`No se pueden elegir mas de 4 plataformas`)                    
                }                
            } 
    }

  
    // function handleSelectGenre (e) {
    //     setState( {...state, genresId:[parseInt(e.target.value)]});        
    //     setError(validate( {...state, genresId:[e.target.value]}));         
    //  }

    // function handleSelectPlatform (e) {
    //     setState( {...state, platforms:[e.target.value]});        
    //     setError(validate( {...state, platforms:[e.target.value]}));   
    // }


    function handleSubmit (e){
        
        e.preventDefault();   
        let errors =  Object.keys(validate(state));                      
        if (errors.length !== 0) alert("Hay campos con error, por favor verificar");
        else {
            dispatch (addVideogame(state));
            setState({        
                name:"",
                description:"",
                released: "",
                rating: "",
                image:"",
                genresId:[],
                platforms:[]
            })
            alert("Videojuego creado con éxito");
            history.push("/home");
        }            
    };

    return (
        <React.Fragment>
            <div className= {style.main}>
            
            <br/>   
            <form className= {style.formulario} onSubmit={(e) => handleSubmit(e)}>
                <div className= {style.title}><h3>Agregá tu videojuego!</h3></div>
                <div>
                    <label>Nombre</label>
                    <input type={'text'} name="name" value={state.name} onChange={(e) => handleChange(e)} autoFocus></input>
                    {error.name && (
                        <p className= {style.error}>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="description" value={state.description} onChange={(e) => handleChange(e)}></textarea>
                    {error.description && (
                        <p className= {style.error}>{error.description}</p>
                    )}
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input type={'date'} name="released" value={state.released} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Rating</label>
                    <input type={'number'} name="rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                    {error.rating && (
                        <p className= {style.error}>{error.rating}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type={'text'} name="image" value={state.image} onChange={(e) => handleChange(e)}></input>
                    {error.image && (
                        <p className= {style.error}>{error.image}</p>
                    )}
                </div>
                <div>
                    <label>Género <span style={{fontSize:"10px"}}>(Máximo 3)</span></label>                    
                    
                    <select multiple={true} value={state.genresId} className= {style.selectGandP} onChange={(e) => handleSelectGenre(e)}>                   
                        <option disabled="disabled">Seleccionar género</option>
                        {genres.map(genreObject => {
                            return (
                            <option key={genreObject.id} value={genreObject.id} name={genreObject.name}>
                                {genreObject.name} {`(id: ${genreObject.id})`}
                            </option>)
                            })
                        }                
                    </select>                   
                    {error.genresId && (
                        <p className= {style.error}>{error.genresId}</p>
                    )}
                </div>
                <div>
                    <label>Plataforma <span style={{fontSize:"10px"}}>(Máximo 4)</span></label>
                    <select multiple={true} value={state.platforms} className= {style.selectGandP} onChange={(e) => handleSelectPlatform(e)}>                    
                        <option disabled="disabled">Seleccionar plataforma</option>
                        {platforms.map(platform => {
                            return (
                            <option key={platforms.indexOf(platform)} value={platform}>
                                {platform}
                            </option>)
                            })
                        }                
                    </select>                      
                    {error.platforms && (
                        <p className= {style.error}>{error.platforms}</p>
                    )}
                </div>
                <br/>
                <input type={'submit'} value={'Agregar'} className= {style.submitForm}/>
            </form>
            </div>
        </React.Fragment>
    )
}