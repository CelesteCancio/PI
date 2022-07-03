import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_GENRES, GET_VIDEOGAME_DETAIL, SEARCH_VIDEOGAMES } from "../actions";

const initialState = {
    videogames: [],
    videogameDetail: {},
    genres: [],
    platforms: []
};

export default function rootReducer (state = initialState, action){
    switch (action.type){
        case ADD_VIDEOGAME:            
            return {
                ...state,
                videogames: [...state.videogames, action.payload], // videogames = [{},{},{}]                
            }
        
        case FETCH_VIDEOGAMES:
            let platformsAux = [];
            action.payload.forEach(videogame => {
                if (!platformsAux.includes(videogame.platforms)) platformsAux.push(videogame.platforms)});
            return {
                ...state,
                videogames: action.payload,
                platforms: [...platformsAux]
            }

        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload
            }

        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
            
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }      
            
        default: return {...state}
    }

}