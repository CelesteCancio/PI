import axios from 'axios';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_API = "FILTER_BY_API";
export const FILTER_BY_DB = "FILTER_BY_DB";
export const DBVIDEOGAMES_NOT_FOUND = "DBVIDEOGAMES_NOT_FOUND";
export const VIDEOGAME_DETAIL_NOT_FOUND = "VIDEOGAME_DETAIL_NOT_FOUND";
export const VIDEOGAMES_NOT_FOUND = "VIDEOGAMES_NOT_FOUND";
export const VIDEOGAME_NOT_ADDED = "VIDEOGAMES_NOT_ADDED";
export const SORT_AZ = "SORT_AZ";
export const SORT_ZA = "SORT_ZA";
export const SORT_BY_RATING_INC = "SORT_BY_RATING_INC";
export const SORT_BY_RATING_DEC = "SORT_BY_RATING_DEC";
export const SORT_BY_DATE_INC = "SORT_BY_DATE_INC";
export const SORT_BY_DATE_DEC = "SORT_BY_DATE_DEC";



export function addVideogame (videogame){
    //return {type: ADD_VIDEOGAME, payload: videogame};
    console.log(videogame)
    return function (dispatch){
        return axios.post('http://localhost:3001/api/videogames',videogame)
        // .then((videogameResponse) => {
        //     dispatch({
        //         type: ADD_VIDEOGAME,
        //         payload: videogameResponse.data
        //     })
        // })
        .then((videogameResponse) => {
            alert("Acá podés visualizar tu nuevo videojuego");
        })
        .catch((error) => {
            dispatch({
                type: VIDEOGAME_NOT_ADDED,
                payload: `No se agregó el videojuego creado`
            })
        })
    }
}

export function fetchVideogames (){
    // return function (dispatch){
    //     return axios.get('http://localhost:3001/api/videogames')
    //     .then((videogames) => {
    //         dispatch({
    //             type: FETCH_VIDEOGAMES,
    //             payload: videogames.data
    //         })
    //     })
    //     .catch((error) => {
    //         dispatch({
    //             type: VIDEOGAMES_NOT_FOUND,
    //             payload: `No se encontraron los videojuegos`
    //         })
    //     })
    // }

    return async function (dispatch){
        
        
            try {
                const videogames = await axios.get('http://localhost:3001/api/videogames');
                return (
                dispatch({
                    type: FETCH_VIDEOGAMES,
                    payload: videogames.data
                })
                )
            } catch (error) {
                return (
                dispatch({
                    type: VIDEOGAMES_NOT_FOUND,
                    payload: `No se encontraron los videojuegos`
                }))
            }          
    }
}

export function searchVideogames (name){
    return function (dispatch){
        return axios.get(`http://localhost:3001/api/videogames?name=${name}`)
        .then((videogames) => {
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload: videogames.data
            })
        })
        .catch((error) => {
            dispatch({
                type: VIDEOGAMES_NOT_FOUND,
                payload: `No se encontraron los videojuegos`
            })
        })
    }
}

export function getVideogameDetail (id){
    return function (dispatch){
        return fetch (`http://localhost:3001/api/videogame/${id}`)
        .then(videogame => videogame.json())
        .then(videogameDetail => {
            return dispatch ({
                type: GET_VIDEOGAME_DETAIL,
                payload: videogameDetail
            })
        })
        .catch((error) => {
            dispatch({
                type: VIDEOGAME_DETAIL_NOT_FOUND,
                payload: "No se encontró el detalle del videojuego."
            })
        })
    }
}

export function getGenres (){
    return function (dispatch){
        console.log(`en get genres`);
        return axios.get(`http://localhost:3001/api/genres/`)
        .then(genres => {
            dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function getPlatforms (){
    return function (dispatch){
        console.log(`en get Platforms`);
        return axios.get(`http://localhost:3001/api/videogames/platforms`)
        .then(platforms => {
            dispatch({
                type: GET_PLATFORMS,
                payload: platforms.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function filterByGenre (genre){    
    return {
        type: FILTER_BY_GENRE,
        payload: genre
    }
}

export function filterByOrigin (origin){
    if(origin === "API"){
        return function (dispatch){
            return axios.get('http://localhost:3001/api/videogames/fromAPI')
            .then((videogames) => {
                dispatch({
                    type: FILTER_BY_API,
                    payload: videogames.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    else{
        return function (dispatch){
            return axios.get('http://localhost:3001/api/videogames/fromDB')
            .then((videogames) => {
                dispatch({
                    type: FILTER_BY_DB,
                    payload: videogames.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: DBVIDEOGAMES_NOT_FOUND,
                    payload: "No hay nuevos videojuegos agregados en la base de datos."
                })
            })
        }
    }
}

export function sortAZ (sort){    
    if(sort==='az')
    return {
        type: SORT_AZ,
        payload: ""
    }
    else{
        return {
            type: SORT_ZA,
            payload: ""
        }
    }
}

export function sortByRating (sort){
    if(sort==='increasing')
    return {
        type: SORT_BY_RATING_INC,
        payload: ""
    }
    else{
        return {
            type: SORT_BY_RATING_DEC,
            payload: ""
        }
    }
}

export function sortByDate (sort){
    console.log(`sort by date action creator`);
    if(sort==='increasing')
    return {
        type: SORT_BY_DATE_INC,
        payload: ""
    }
    else{
        return {
            type: SORT_BY_DATE_DEC,
            payload: ""
        }
    }
}
