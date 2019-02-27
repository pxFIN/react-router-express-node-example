import React from "react";
import "./MachineLearningVideo.css";
import * as ml5 from "ml5";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";

class MachineLearning2 extends React.Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      predictions: []
    };
  }

  classifier = null;

  setPredictions = pred => {
    this.setState({
      predictions: pred
    });
  };

  modelLoaded = () => {
    console.log("Model Loaded!");
    this.classifier
      .predict((err, results) => results)
      .then(results => {
        this.setPredictions(results);
      });
  };

  classifyImg = () => {
    let stream = this.webcam.current.video;

    this.classifier = ml5.imageClassifier(
      "MobileNet",
      stream,
      this.modelLoaded
    );
  };

  componentDidMount() {
    this.classifyImg();
  }

  render() {
    let predictions = <div className="loader" />;
    if (this.state.predictions.length > 0) {
      predictions = this.state.predictions.map((pred, i) => {
        let { className, probability } = pred;
        probability = Math.floor(probability * 10000) / 100 + "%";
        return (
          <div key={i + ""}>
            {i + 1}. Prediction: {className} at {probability}
          </div>
        );
      });
    }

    return (
      <div className="MLExample">
        <h1>Video classification</h1>
        <Webcam width="400px" height="400px" audio={false} ref={this.webcam} />
        {predictions}
        <Button onClick={this.modelLoaded}>Predict</Button>
      </div>
    );
  }
}

export default MachineLearning2;
