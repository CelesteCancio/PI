import React from "react";

export default function AddVideogame (){

    let defaultDate = new Date();
    const [state, setState] = React.useState({
        name:"",
        description:"",
        released: "",
        rating: "",
        image:"",
        genres:"",
        platforms:""
    });

    function handleChange (e) {
        e.preventDefault(); //hace falta aca o no?
        setState( (previousState) => ({...previousState, [e.target.name]:e.target.value}));
    };

    function handleSubmit (e){
        e.preventDefault();
        //tiene q guardar esta info
        setState({        
            name:"",
            description:"",
            released: "",
            rating: "",
            image:"",
            genres:"",
            platforms:""
        })
    };


    return (
        <React.Fragment>
            <div>Agregar videojuego</div>
            <br/>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type={'text'} name="name" value={state.name} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="description" value={state.description} onChange={(e) => handleChange(e)}></textarea>
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input type={'date'} name="released" value={state.released} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Rating</label>
                    <input type={'number'} name="rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type={'url'} name="image" value={state.image} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Generos - deberia ser menu desplegable o similar, ver el type</label>
                    <input type={'text'} name="genres" value={state.genres} onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Plataformas - deberia ser menu desplegable o similar, ver el type</label>
                    <input type={'text'} name="platforms" value={state.platforms} onChange={(e) => handleChange(e)}></input>
                </div>
                <br/>
                <input type={'submit'} value={'Agregar'}/>
            </form>
        </React.Fragment>
    )
}