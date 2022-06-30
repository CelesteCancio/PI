import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';

import { Route } from 'react-router-dom';
import AddVideogame from './components/AddVideogame/AddVideogame';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      {/* <Route path={'/home'} component={Home}></Route> */}
      {/* <Route path={'/home'}>
        <Home nombre = {"Lele"} apellido = {"Cancio"}/>
      </Route> */}
      <Route path={'/home'} render={ () => <Home nombre = {"Lele"} apellido = {"Cancio"}/>}/>
      <Route path={'/addVideogame'} component = {AddVideogame}></Route>
      <div className="App">
        <h1>Henry Videogames</h1>
      </div>
    </React.Fragment>
  );
}

export default App;
