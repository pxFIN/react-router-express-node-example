import React from "react";
import "./MyWebsocket.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";

const columns = [
  {
    Header: "Symbol",
    accessor: "symbol"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Size",
    accessor: "size"
  },
  {
    Header: "Time",
    accessor: "time"
  },
  {
    Header: "Seq",
    accessor: "seq"
  }
];

class MyWebsocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      connected: false
    };
  }

  onClickConnect = () => {
    this.socket = io("https://ws-api.iextrading.com/1.0/last");

    this.socket.on("connect", () => {
      this.setState({ connected: true });
      console.log("IEX Websocket Connected!");
      this.socket.emit("subscribe", "bac,ge,fb,qqq,uso,iwm,dia,spy");
    });

    this.socket.on("message", message => {
      const newTicker = JSON.parse(message);
      newTicker.time = new Date(newTicker.time).toLocaleTimeString("en-GB");

      let tickers = [...this.state.response];

      const idx = tickers.findIndex(x => x.symbol === newTicker.symbol);
      if (idx === -1) {
        tickers.splice(idx, 0, newTicker);
      } else {
        tickers.splice(idx, 1, newTicker);
      }

      this.setState({ response: tickers });
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected.");
      this.setState({ connected: false });
    });
  };

  onClickDisconnect = () => {
    this.socket.close();
  };

  componentWillUnmount() {
    if (this.state.connected) {
      this.socket.close();
    }
  }

  render() {
    const data = this.state.response;

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={data}
          columns={columns}
          showPagination={false}
          defaultPageSize={8}
        />
        <div id="buttons">
          <Button
            disabled={this.state.connected}
            id="buttons-margin"
            onClick={this.onClickConnect}
          >
            Connect
          </Button>
          <Button
            disabled={!this.state.connected}
            onClick={this.onClickDisconnect}
          >
            Disconnect
          </Button>
          <div style={{ float: "right" }}>
            {this.state.connected ? (
              <div className="led-green" />
            ) : (
              <div className="led-red" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MyWebsocket;
