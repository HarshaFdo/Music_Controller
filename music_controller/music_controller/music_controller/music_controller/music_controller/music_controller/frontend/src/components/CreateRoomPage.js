import React,{ Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class CreateRoomPage extends Component{
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {  },
  }; 

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestcanPauseChange = this.handleGuestcanPauseChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestcanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause
      }) 
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  renderCreateButtons() {
    return(
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button 
            color="secondary" 
            variant="contained" 
            onClick={this.handleRoomButtonPressed}>
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Link to="/">
            <Button variant="contained" color="primary" >
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }

  renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button 
          color="secondary" 
          variant="contained" 
          onClick={this.handleRoomButtonPressed}>
          Update Room
        </Button>
      </Grid> 
    );
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room"

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography element="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl element="fieldset">
            <FormHelperText>
              <div align='center'>Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleGuestcanPauseChange}>
              <FormControlLabel
                value="true" 
                control={<Radio color="primary"/>}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel 
                value="false" 
                control={<Radio color="secondary"/>}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField 
              required={true} 
              type="number" 
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: {textAlign: "center"},
              }}   
            />
            <FormHelperText>
              <div align="center">
                Votes Required To Skip Song
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {
          this.props.update 
            ? this.renderUpdateButtons() 
            : this.renderCreateButtons()
        }
      </Grid>
    );
  }
}