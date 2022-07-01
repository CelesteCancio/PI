import React from "react";
import { connect } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";

class VideogameDetail extends React.Component {

    componentDidMount(){
        this.props.getVideogameDetail(this.props.match.params.id);
    }

    render(){
        return (
            <div>    
                <h2>Detalle de {this.props.videogameDetail.name}</h2>    
                <img src={this.props.videogameDetail.image} alt={this.props.videogameDetail.name}/>
                <p>{this.props.videogameDetail.description}</p>
                <h3>{this.props.videogameDetail.genres && `Géneros: ${this.props.videogameDetail.genres.join(" - ")}`}</h3>
                <h3>{`Rating: ${this.props.videogameDetail.rating}`}</h3>
                <h3>{`Fecha de lanzamiento: ${this.props.videogameDetail.released}`}</h3>
                <h3>{this.props.videogameDetail.platforms && `Plataformas: ${this.props.videogameDetail.platforms.join(", ")}`}</h3>    
            </div> 
        )
    }
}



function mapStateToProps(state){
    return {
        videogameDetail: state.videogameDetail
    }
}

export default connect (mapStateToProps, {getVideogameDetail}) (VideogameDetail);