import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_GENRES, GET_VIDEOGAME_DETAIL, 
    SEARCH_VIDEOGAMES, FILTER_BY_GENRE, FILTER_BY_API, FILTER_BY_DB } from "../actions";

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
            action.payload.forEach(videogame => videogame.platforms.forEach(platform => {
                if (!platformsAux.includes(platform)) platformsAux.push(platform)}));
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
           
        case FILTER_BY_GENRE:
            return {
                ...state,
                videogames: state.videogames.filter(v=>v.genres.forEach(g=>g===action.payload))
            }    

        case FILTER_BY_API:
            const regex = /[a-zA-Z]/;
            return {
                ...state,
                videogames: state.videogames.filter(v=> !regex.test(v.id))
            }    
        case FILTER_BY_DB:            
            return {
                ...state,
                videogames: state.videogames.filter(v=> regex.test(v.id))
            }                  
        default: return {...state}
    }

}