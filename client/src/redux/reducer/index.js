import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES } from "../actions";

const initialState = {
    videogames: []
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

        default: return {...state}
    }

}