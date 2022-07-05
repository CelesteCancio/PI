import { useDispatch } from "react-redux";
import { fetchVideogames } from "../../redux/actions";
import style from '../BtnReload/btnReload.module.css';

export default function BtnReload (){

    let dispatch = useDispatch();
    function handleClick (e){
        dispatch (fetchVideogames());
    }
    return (
        <button className={style.btnMain} onClick={(e) => handleClick()}>Recargar videojuegos</button>
    )
}