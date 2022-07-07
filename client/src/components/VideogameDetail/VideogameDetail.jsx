import React from "react";
import { connect } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";
import styles from '../VideogameDetail/videogameDetail.module.css';

class VideogameDetail extends React.Component {

    componentDidMount(){
        this.props.getVideogameDetail(this.props.match.params.id);
    }

    render(){
        return (
            <div className={styles.main}>
                <div className={styles.container}>    
                    <h2 className={styles.cardH2}>Detalle de {this.props.videogameDetail.name}</h2>    
                    <div><img className={styles.imgContainer} src={this.props.videogameDetail.image ? this.props.videogameDetail.image : 'Image/videojuegos.jpg'} alt={this.props.videogameDetail.name} width='300px'/></div>
                    <p className={styles.cardp}>{this.props.videogameDetail.description}</p>
                    <h3 className={styles.cardH3}>{this.props.videogameDetail.genres && `Géneros: ${this.props.videogameDetail.genres.join(" - ")}`}</h3>
                    <h3 className={styles.cardH3}>{`Rating: ${this.props.videogameDetail.rating}`}</h3>
                    <h3 className={styles.cardH3}>{`Fecha de lanzamiento: ${this.props.videogameDetail.released}`}</h3>
                    <h3 className={styles.cardH3}>{this.props.videogameDetail.platforms && `Plataformas: ${this.props.videogameDetail.platforms.join(", ")}`}</h3>    
                </div> 
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