import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  Redirect, 
} from "react-router-dom";
import Room from "./Room";

export default class HomePage extends Component{
  constructor(props) {
    super(props);
  }

  render() {
  return (<Router>
    <Routes>
      <Route exact path="/"><p>This is the home page</p></Route>
      <Route path="/join" component = {RoomJoinPage}/>
      <Route path="/create" component = {CreateRoomPage}/>
      <Route path="/room/:roomCode" component={Room}/>
      
    </Routes>
  </Router>
  );
  }
}