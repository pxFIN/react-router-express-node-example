import React from "react";
import Fullscreen from "react-full-screen";
import "./Feed.css";
import Button from "react-bootstrap/Button";

const API = "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0";

var timeoptions = {
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "numeric"
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      isLoading: false,
      hits: [],
      time: new Date()
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed = () => {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({ hits: data.hits, isLoading: false });
      });
  };

  handleClick = () => {
    this.fetchFeed();
    this.setState({
      time: new Date()
    });
  };

  onClickFullscreen = () => {
    this.setState({ isFull: true });
  };

  render() {
    const { hits, isLoading } = this.state;

    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({ isFull })}
      >
        <div className="feedfull">
          <Button
            size="sm"
            id="block2"
            disabled={isLoading}
            onClick={!isLoading ? this.handleClick : null}
          >
            {isLoading ? "Updating" : "REFRESH"}
          </Button>
          <span id="block2">
            LAST UPDATE: {this.state.time.toLocaleTimeString("en-GB")}
          </span>
          <Button
            size="sm"
            id="block2"
            style={{ float: "right" }}
            onClick={this.onClickFullscreen}
          >
            FULLSCREEN
          </Button>
          <ul id="frame">
            {hits.map(hit => (
              <li key={hit.objectID}>
                <a href={hit.url}>
                  {hit.title}
                  <span style={{ color: "red", float: "right" }}>
                    {new Date(hit.created_at).toLocaleTimeString(
                      "en-GB",
                      timeoptions
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Fullscreen>
    );
  }
}

export default Feed;
