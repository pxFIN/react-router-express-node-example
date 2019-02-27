import React, { Component } from "react";

const APIURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SQL_URL
    : process.env.REACT_APP_DEV_SQL_URL;

class SQLTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed = () => {
    fetch(APIURL + "/messages")
      // DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => {
        this.setState({ hits: data });
      });
  };

  render() {
    const { hits } = this.state;

    return (
      <div>
        <ul>
          {hits.map(hit => (
            <li key={hit.id}>
              Text: {hit.text}
              <p>
                Created At: {new Date(hit.createdAt).toString()}
                <br />
                User ID: {hit.userId}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SQLTest;
