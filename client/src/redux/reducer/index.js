import { ADD_VIDEOGAME, FETCH_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAME_DETAIL, 
    SEARCH_VIDEOGAMES, FILTER_BY_GENRE, FILTER_BY_API, FILTER_BY_DB, DBVIDEOGAMES_NOT_FOUND, 
    VIDEOGAMES_NOT_FOUND, VIDEOGAME_DETAIL_NOT_FOUND, VIDEOGAME_NOT_ADDED, SORT_AZ, SORT_ZA, 
    SORT_BY_RATING_INC, SORT_BY_RATING_DEC, SORT_BY_DATE_INC, SORT_BY_DATE_DEC } from "../actions";

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
                //videogames: [action.payload, ...state.videogames], // videogames = [{},{},{}]                
                error:""
            }
        
        case FETCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
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
                genres: action.payload.sort(function(a,b){return (
                    a.name<b.name ? -1 : (a.name>b.name) ? 1 : 0
                    )}),
                error:""
            }    
        
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload.sort(function(a,b){return (
                    a<b ? -1 : (a>b) ? 1 : 0
                    )}),
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
        case SORT_BY_DATE_INC:
            console.log(`sort by date inc`);
            return {
                ...state,
                videogames: [...state.videogames.sort((a,b) => (parseInt(a.released.slice(0,4)) - parseInt(b.released.slice(0,4))))],
                error: ""
            } 
        case SORT_BY_DATE_DEC:
            console.log(`sort by date dec`);
            return {
                ...state,
                videogames: [...state.videogames.sort((a,b) => (b.released - a.released ))],
                error: ""
            }                
        default: return {...state}
    }

}