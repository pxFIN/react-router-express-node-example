import React, { Component } from "react";
import "./MachineLearningPicture.css";
import picture from "./bear.jpg";
import * as ml5 from "ml5";

class MachineLearning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predictions: []
    };
  }

  setPredictions = pred => {
    this.setState({
      predictions: pred
    });
  };

  classifyImg = () => {
    const classifier = ml5.imageClassifier("Mobilenet", () =>
      console.log("Model Loaded!")
    );
    const image = document.getElementById("image");
    classifier
      .predict(image, 5, (err, results) => {
        return results;
      })
      .then(results => {
        this.setPredictions(results);
      });
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
            {i + 1}. Prediction: {className} at {probability}{" "}
          </div>
        );
      });
    }

    return (
      <div className="MLExample">
        <h1>Image classification</h1>
        <img src={picture} id="image" width="300" alt="" />
        {predictions}
      </div>
    );
  }
}

export default MachineLearning;
