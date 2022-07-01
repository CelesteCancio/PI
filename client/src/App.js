import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Ejemplo from './components/Ejemplo/Ejemplo';

import { Route } from 'react-router-dom';
import AddVideogame from './components/AddVideogame/AddVideogame';
import Videogames from './components/Videogames/Videogames';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      {/* <Route path={'/ejemplo'} component={Ejemplo}></Route> */}
      {/* <Route path={'/ejemplo'}>
        <Ejemplo nombre = {"Lele"} apellido = {"Cancio"}/>
      </Route> */}
      <Route path={'/ejemplo'} render={ () => <Ejemplo nombre = {"Lele"} apellido = {"Cancio"}/>}/>
      <Route path={'/addVideogame'} component = {AddVideogame}></Route>
      <Route path={'/home'} component = {Videogames}></Route>
      <Route path={'/videogame/:id'} component = {VideogameDetail}></Route>      
      <div className="App">
        <h1>Henry Videogames</h1>
      </div>
    </React.Fragment>
  );
}

export default App;
