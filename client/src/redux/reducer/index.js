import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAME_DETAIL, SEARCH_VIDEOGAMES } from "../actions";

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
                videogames: [...state.videogames, action.payload] // videogames = [{},{},{}]
            }
        
        case FETCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload
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

        // case GET_GENRES_FROM_API:
        //     return {
        //         ...state,
        //     }        

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }    
            
        default: return {...state}
    }

}