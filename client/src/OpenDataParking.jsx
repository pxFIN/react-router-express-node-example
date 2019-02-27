import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// FYI CRA filename with xxxx.module.css makes it CSS Modules = Isolation
import styles from "./OpenDataParking.module.css";

const APIURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

class OpenDataParking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      response: []
    };
  }

  fetchOpenData = () => {
    this.setState({ isLoading: true });

    axios
      .get(APIURL)
      .then(res => {
        this.setState({
          isLoading: false,
          response: res.data
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchOpenData();
  }

  render() {
    const { response, isLoading } = this.state;

    return (
      <div className={styles.bstyles}>
        <Card bg="light" style={{ width: "18rem" }}>
          <Card.Header>{response.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              Address: {response.address}
              <br />
              Freespace: {response.freespace} / {response.totalspace}
              <br />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Updated {response.timestamp}</small>
          </Card.Footer>
        </Card>
        <Button
          size="sm"
          disabled={isLoading}
          onClick={!isLoading ? this.fetchOpenData : null}
        >
          {isLoading ? "Updating" : "REFRESH"}
        </Button>
      </div>
    );
  }
}

export default OpenDataParking;
