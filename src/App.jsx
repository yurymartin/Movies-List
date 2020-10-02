import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import TurnList from "./pages/TurnList";
import AddTurn from "./pages/AddTurn";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <MoviesList />
        </Route>
        <Route path="/turnos/:id" children={<TurnList />} />
        <Route path="/agregar-turno/:id" children={<AddTurn />} />
      </Switch>
    </Router>
  );
}

export default App;
