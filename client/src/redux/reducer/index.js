import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_GENRES, GET_VIDEOGAME_DETAIL, 
    SEARCH_VIDEOGAMES, FILTER_BY_GENRE, FILTER_BY_API, FILTER_BY_DB, DBVIDEOGAMES_NOT_FOUND, 
    VIDEOGAMES_NOT_FOUND, VIDEOGAME_DETAIL_NOT_FOUND, VIDEOGAME_NOT_ADDED, SORT_AZ, SORT_ZA, 
    SORT_BY_RATING_INC, SORT_BY_RATING_DEC } from "../actions";

const initialState = {
    videogames: [],    
    videogameDetail: {},
    genres: [],
    platforms: [],
    error: ""
};

export default function rootReducer (state = initialState, action){
    switch (action.type){
        case ADD_VIDEOGAME:            
            return {
                ...state,
                videogames: [action.payload, ...state.videogames], // videogames = [{},{},{}]                
                error:action.payload
            }
        
        case FETCH_VIDEOGAMES:
            let platformsAux = [];
            action.payload.forEach(videogame => videogame.platforms.forEach(platform => {
                if (!platformsAux.includes(platform)) platformsAux.push(platform)}));
            return {
                ...state,
                videogames: action.payload,
                platforms: [...platformsAux],
                error:""
            }

        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                error:""
            }

        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload,
                error:""
            }
            
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
                error:""
            }      
           
        case FILTER_BY_GENRE:
            return {
                ...state,
                videogames: state.videogames.filter(v=>v.genres.includes(action.payload)),
                error:""
            }    

        case FILTER_BY_API:             
            return {
                ...state,
                videogames: action.payload,
                error:""
            }    
        case FILTER_BY_DB:            
            return {
                ...state,
                videogames: action.payload,
                error:""
            } 
        case DBVIDEOGAMES_NOT_FOUND:
            return {
                ...state,
                videogames: [],
                error: action.payload
            }       
        case VIDEOGAMES_NOT_FOUND:
            return {
                ...state,
                videogames: [],
                error: action.payload
            }   
        case VIDEOGAME_NOT_ADDED:
            return {
                ...state,
                error: action.payload
            }               
        case VIDEOGAME_DETAIL_NOT_FOUND:
            return {
                ...state,
                videogameDetail: {},
                error: action.payload
            }                    
        case SORT_AZ:
            return {
                ...state,
                videogames: [...state.videogames.sort(function(a,b){return (
                    a.name<b.name ? -1 : (a.name>b.name) ? 1 : 0
                    )})], 
                error: ""
            }
        case SORT_ZA:
            return {
                ...state,
                videogames: [...state.videogames.sort(function(a,b){return (
                    a.name>b.name ? -1 : (a.name<b.name) ? 1 : 0
                    )})],
                error: ""
            }         
        case SORT_BY_RATING_INC:
            return {
                ...state,
                videogames: [...state.videogames.sort((a,b) => (a.rating - b.rating ))],
                error: ""
            } 
        case SORT_BY_RATING_DEC:
            return {
                ...state,
                videogames: [...state.videogames.sort((a,b) => (b.rating - a.rating ))],
                error: ""
            }             
        default: return {...state}
    }

}