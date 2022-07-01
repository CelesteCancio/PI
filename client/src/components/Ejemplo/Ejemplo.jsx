import React, { Component } from "react";

export default class Home extends Component {

    //si quiero crear un estado local o bindear una fc, tengo q hacer el constructor, sino no:
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         name: "",
    //         lastName: ""
    //     }
    // }
    //En componente de clase solo puedo modificar el estado a traves de this.setState

    render(){
        //si quiero destructurar props:
        let {nombre, apellido} = this.props;
        return (
            <div>
                PRINCIPAL {nombre}
            </div>
        )
    }

    
}

 