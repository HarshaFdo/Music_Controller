import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

// Functional wrapper for using hooks with class components
function RoomWrapper(props) {
  const { roomCode } = useParams(); // Get roomCode from the URL params
  return <Room {...props} roomCode={roomCode} />;
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.roomCode;
    this.getRoomDetails()
  }

  getRoomDetails() {
    fetch(`/get-room?code=${this.roomCode}`)
      .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        response.json();
      })
      .then((data) => {
        this.setState({
          voteToSkip: data.vote_to_skip || 2,
          guestCanPause: data.guest_can_pause !== undefined ? data.guest_can_pause : false,
          isHost: data.is_host !== undefined ? data.is_host : false ,
        });
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  }

  render() {
    const { voteToSkip, guestCanPause, isHost } = this.state;
    const guestCanPauseStr = guestCanPause ? "true" : "false";
    const isHostStr = isHost ? "true" : "false";
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" element="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" element="h6">
            Votes: {voteToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" element="h6">
            Guest Can Pause: {guestCanPauseStr}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" element="h6">
            Host: {isHostStr}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Link to="/">
            <Button variant="contained" color="secondary" >
              Leave Room
            </Button>
          </Link>
        </Grid>
      </Grid>  
    );
  }
}

export default RoomWrapper;

