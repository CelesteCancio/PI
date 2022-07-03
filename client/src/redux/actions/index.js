import axios from 'axios';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_API = "FILTER_BY_API";
export const FILTER_BY_DB = "FILTER_BY_DB";
export const DBVIDEOGAMES_NOT_FOUND = "DBVIDEOGAMES_NOT_FOUND";
export const SORT_AZ = "SORT_AZ";
export const SORT_ZA = "SORT_ZA";
export const SORT_BY_RATING = "SORT_BY_RATING";


export function addVideogame (videogame){
    return {type: ADD_VIDEOGAME, payload: videogame};
}

export function fetchVideogames (){
    return function (dispatch){
        return axios.get('http://localhost:3001/api/videogames')
        .then((videogames) => {
            dispatch({
                type: FETCH_VIDEOGAMES,
                payload: videogames.data
            })
        })
        .catch((error) => {
            console.log(error);//hacer algo mas q consologuear
        })
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
            console.log(error);//hacer algo mas q consologuear
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
                console.log(error);//hacer algo mas q consologuear
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
    console.log(`en sortAZ: ${sort}`)
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

export function sortByRating (){
    console.log(`en sortByRating`)
    return {
        type: SORT_BY_RATING,
        payload: ""
    }
}
