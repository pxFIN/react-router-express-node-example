import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  update = () => {
    this.setState({
      time: new Date()
    });
  };

  render() {
    const h = this.state.time.getHours();
    const m = this.state.time.getMinutes();
    const s = this.state.time.getSeconds();

    return (
      <div>
        {h % 24}:{m < 10 ? "0" + m : m}:{s < 10 ? "0" + s : s}
      </div>
    );
  }
}

export default Clock;
