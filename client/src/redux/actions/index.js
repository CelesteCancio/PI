import axios from 'axios';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES_FROM_API = "GET_GENRES_FROM_API";

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

// export function getGenresFromAPI (){
//     return function (dispatch){
//         console.log(`en get genres`);
//         return axios.get(`http://localhost:3001/api/genres/fromAPI`)
//         .then(genres => {
//             dispatch({
//                 type: GET_GENRES_FROM_API,
//                 payload: ""
//             })
//         })
//     }
// }
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
//url missing
export function getPlatforms (){
    return function (dispatch){
        return axios.get()
        .then(platforms => {
            dispatch({
                type: GET_PLATFORMS,
                payload: platforms.data
            })
        })
    }
}