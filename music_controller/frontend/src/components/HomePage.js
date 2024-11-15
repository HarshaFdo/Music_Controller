import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

//Wrapper to pass roomCode prop to Room
/*function RoomWraper() {
  const { roomCode } = useParams();
  return <Room roomCode={roomCode} />
}*/

export default class HomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Link to="/join">
              <Button color="primary" variant="contained" >
                Join a Room
              </Button>
            </Link>
            <Link to="/create">
              <Button color="secondary" variant="contained">
                Create a Room
              </Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`}/>
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" element = {<RoomJoinPage />} />
          <Route path="/create" element = {<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </Router>
    );
  }
}