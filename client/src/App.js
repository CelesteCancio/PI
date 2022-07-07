import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import AddVideogame from './components/AddVideogame/AddVideogame';
import Videogames from './components/Videogames/Videogames';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <React.Fragment>  
      <Switch>
        <Route exact path={'/'} component={LandingPage}></Route>
        <React.Fragment>          
          <Route path={'/'} component = {NavBar}></Route>  
          <Route path={'/addVideogame'} component = {AddVideogame}></Route>
          <Route path={'/home'} component = {Videogames}></Route>
          <Route path={'/videogame/:id'} component = {VideogameDetail}></Route>      
        </React.Fragment>
      </Switch>  
    </React.Fragment>
  );
}

export default App;
