import { useSelector } from "react-redux";
import style from "../ErrorComponent/errorComponent.module.css"

export default function ErrorComponent (){

    let error = useSelector( (state) => state.error); //mapStateToProps en clase 
    
    if(error){
        return (
            <div className={style.main}>
                {<h4>Hubo un error! {error}</h4>}
            </div>
        )
    }
    else{
        return null;
    }

}