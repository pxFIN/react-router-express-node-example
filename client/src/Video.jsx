import React from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import "./Video.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.youtube.com/watch?v=ZY3J3Y_OU0w",
      value: ""
    };
    this.playerRef = React.createRef();
  }

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.playerRef.current));
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ url: this.state.value });
  };

  render() {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          controls={true}
          className="react-player"
          ref={this.playerRef}
          url={this.state.url}
          // url="https://tv.eenet.ee/hls/kala.m3u8"
          width="100%"
          height="90%"
        />

        <InputGroup>
          <FormControl
            onChange={this.handleChange}
            value={this.state.value}
            placeholder="Enter URL"
            aria-label="Enter URL"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button onClick={this.handleSubmit} variant="outline-secondary">
              Submit
            </Button>
            <Button
              onClick={this.onClickFullscreen}
              variant="outline-secondary"
            >
              Fullscreen
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default VideoPlayer;
