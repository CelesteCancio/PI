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
        if (!name) errorsObject.name = "El nombre no puede estar vacío";
        if (!description) errorsObject.description = "La descripción no puede estar vacía";
        if (description && description.length<5) errorsObject.description = "La descripción debe contener más de 5 caracteres";
        if (rating<0 || rating>5) errorsObject.rating = "El rating debe estar entre 0 y 5";        
        //if (genresId.length === 0) errorsObject.genresId = "Debe elegir al menos un género";
    
        if (genresId.length === 0) errorsObject.genresId = "Debe elegir al menos un género";
        // if(state.genresId.includes(genresId.valueGenre)){
        //     errorsObject.genresId = `El género ${genresId.nameGenre} ya fue seleccionado`;

        // } 
    
        if (platforms.length === 0) errorsObject.platforms = "Debe elegir al menos una plataforma";  
            
        return errorsObject;
    }


    function handleChange (e) {               
        setState( {...state, [e.target.name]:e.target.value});
        setError(validate( {...state, [e.target.name]:e.target.value}));  
    };


    function handleSelectGenre (e) {
        setState( {...state, genresId:[parseInt(e.target.value)]});        
        setError(validate( {...state, genresId:[e.target.value]}));         
     }
     

     function showSelectedGenres (e) {
        let optionsArray = e.target.options;
        //let selectedOptions = [];
        console.log(optionsArray);
        let selectedGenreObject = {};

        for (let i=0; i<optionsArray.length; i++){
            if (optionsArray[i].selected){
                //selectedOptions.push(optionsArray[i].value);
                console.log(optionsArray[i]);                
                selectedGenreObject.nameGenre = optionsArray[i].innerText;
                //console.log(nameGenre);
                selectedGenreObject.valueGenre = optionsArray[i].value;
                //console.log(valueGenre);
                console.log(selectedGenreObject);
                //return selectedGenreObject;
            }
        }

        if (state.genresId.includes(selectedGenreObject.valueGenre)){
            alert(`El género ${selectedGenreObject.nameGenre} ya fue seleccionado`)
        }
        else{
            if (state.genresId.length<=2){
                setState( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]});
                setError(validate( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]})); 
            }
            else{
                //alert(`No se pueden elegir mas de 3 géneros`)
                setState( {...state, genresId:[...(state.genresId.slice(1)),selectedGenreObject.valueGenre]});
                setError(validate( {...state, genresId:[...(state.genresId.slice(1)),selectedGenreObject.valueGenre]})); 
            }                
        } 
        //setState( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]});
        
        //setError(validate( {...state, genresId: selectedGenreObject})); 
        //setError(validate( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]})); 


        // if(!state.genresId.includes(selectedGenreObject.valueGenre)){
        //     setState( {...state, genresId:[...state.genresId,selectedGenreObject.valueGenre]});
        // }
        // else{

        // }

        // console.log(selectedOptions);
        //console.log(e.target);
        //console.log(e.target.options);
        //console.log(e.target.selectedIndex);
        //setState( {...state, genresId:[... state.genresId, parseInt(e.target.options.selected.value)]});        
        //setError(validate( {...state, genresId:[... state.genresId, parseInt(e.target.options.selected.value)]}));    
      
        // const optionGenres = Array.from(e.target.options)
        // console.log (optionGenres);
        // const selectedGenres = optionGenres.filter(o => o.selected).map(o => o.value)
        // console.log (selectedGenres);
      
    }



    // function handleSubmitGenre (e) {
    //     e.preventDefault();
    //     getSelectValues(e.target);
    // }

    // function getSelectValues(select) {
    //     var result = [];
    //     var options = select && select.options;
    //     var opt;
      
    //     for (var i=0, iLen=options.length; i<iLen; i++) {
    //       opt = options[i];
      
    //       if (opt.selected) {
    //         result.push(opt.value || opt.text);
    //       }
    //     }
    //     return result;
    //   }




    function handleSelectPlatform (e) {
        setState( {...state, platforms:[e.target.value]});        
        setError(validate( {...state, platforms:[e.target.value]}));   
    }


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
                        <p>{error.rating}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type={'text'} name="image" value={state.image} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Género </label>                    
                    
                    <select multiple={true} value={state.genresId} className= {style.selectGandP} onChange={(e) => showSelectedGenres(e)}>
                    {/* <select value={state.genresId} onChange={(e) => handleSelectGenre(e)}> */}
                        <option disabled="disabled">Seleccionar género</option>
                        {genres.map(genreObject => {
                            return (
                            <option key={genreObject.id} value={genreObject.id} name={genreObject.name}>
                                {genreObject.name} {`(id: ${genreObject.id})`}
                            </option>)
                            })
                        }                
                    </select>
                    

                    {/* <input type={'submit'} value={'Seleccionar'} onSubmit={(e) => handleSubmitGenre(e)}/>           */}
                    

                    {error.genresId && (
                        <p className= {style.error}>{error.genresId}</p>
                    )}
                </div>
                <div>
                    <label>Plataforma</label>
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