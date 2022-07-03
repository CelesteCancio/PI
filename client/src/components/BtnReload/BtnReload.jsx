import { useDispatch } from "react-redux";
import { fetchVideogames } from "../../redux/actions";

export default function BtnReload (){

    let dispatch = useDispatch();
    function handleClick (e){
        dispatch (fetchVideogames());
    }
    return (
        <button onClick={(e) => handleClick()}>Recargar videojuegos</button>
    )
}