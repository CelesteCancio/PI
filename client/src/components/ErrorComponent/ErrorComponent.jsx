import { useSelector } from "react-redux";

export default function ErrorComponent (){

    let error = useSelector( (state) => state.error); //mapStateToProps en clase 
    
    if(error){
        return (
            <div>
                {`Hubo un error! ${error}`}
            </div>
        )
    }
    else{
        return null;
    }

}