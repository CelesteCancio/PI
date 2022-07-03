import axios from 'axios';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_API = "FILTER_BY_API";
export const FILTER_BY_DB = "FILTER_BY_DB";


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
        return {
            type: FILTER_BY_API,
            payload: ""
        }
    }
    else{
        return {
            type: FILTER_BY_DB,
            payload: ""
        }
    }
}
