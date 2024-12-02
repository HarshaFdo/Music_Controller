import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link, useParams, useNavigate } from "react-router-dom";

// Functional wrapper for using hooks with class components
function RoomWrapper(props) {
  const { roomCode } = useParams(); // Get roomCode from the URL params
  const navigate = useNavigate(); // Get navigate function for programmatic navigation
  return <Room {...props} roomCode={roomCode} navigate={navigate} />;
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.roomCode;
    this.getRoomDetails()
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this)
  }

  async getRoomDetails() {
    try {
      const response = await fetch(`/api/get-room?code=${this.roomCode}`);
      if (!response.ok) {
        this.props.leaveRoomCallback();
        this.props.navigate("/"); // Use navigate for redirection
        return;
      }
      const data = await response.json();
      this.setState({
        voteToSkip: data.votes_to_skip ,
        guestCanPause: data.guest_can_pause ,
        isHost: data.is_host,
      });
    }catch (error) {
      console.error("Error fetching room details:", error);
      this.props.leaveRoomCallback();
      this.props.navigate("/"); // Navigate to home on error
    }
  }

  async leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch("/api/leave-room", requestOptions);
      if (response.ok) {
        this.props.leaveRoomCallback();
        this.props.navigate("/"); // Use navigate for redirection
      }
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button 
          variant="contained"  
          color="secondary" 
          onClick={ () => this.updateShowSettings(true)}>
            Settings
        </Button>
      </Grid>
    );
  }

  render() {
    const { votesToSkip, guestCanPause, isHost } = this.state;
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
            Votes: {votesToSkip}
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
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Link to="/">
            <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
              Leave Room
            </Button>
          </Link>
        </Grid>
      </Grid>  
    );
  }
}

export default RoomWrapper;

