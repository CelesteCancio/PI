import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_VIDEOGAME_DETAIL, SEARCH_VIDEOGAMES } from "../actions";

const initialState = {
    videogames: [],
    videogameDetail: {}
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
            
        default: return {...state}
    }

}