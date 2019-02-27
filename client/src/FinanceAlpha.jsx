import React from "react";
import "./FinanceAlpha.css";
import axios from "axios";
import mapValues from "lodash/mapValues";
import cloneDeep from "lodash/cloneDeep";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./gray";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import DragPanes from "highcharts/modules/drag-panes";

// Initialize modules
Exporting(Highcharts);
ExportData(Highcharts);
DragPanes(Highcharts);

class FinanceAlpha extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({ option: this.getOption() });

  fetchNewDate = () => {
    /*     const url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NOK&interval=1min&outputsize=full&apikey=";
 */

    const url = "Alpha.json";

    axios
      .get(url)
      .then(res => {
        const point = res.data["Time Series (1min)"];

        const mapopen = mapValues(point, "1. open");
        const maphigh = mapValues(point, "2. high");
        const maplow = mapValues(point, "3. low");
        const mapclose = mapValues(point, "4. close");
        const mapvolume = mapValues(point, "5. volume");

        const myStockdate = Object.keys(mapclose);
        const myStockOpen = Object.values(mapopen);
        const myStockHigh = Object.values(maphigh);
        const myStockLow = Object.values(maplow);
        const myStockClose = Object.values(mapclose);
        const myStockVolume = Object.values(mapvolume);

        const len = myStockdate.length - 1;
        const output = [];
        const output2 = [];

        for (var i = 0; i <= len; i++) {
          output.push([
            new Date(myStockdate[len - i]).getTime() + 7200 * 1000,
            parseFloat(myStockOpen[len - i]),
            parseFloat(myStockHigh[len - i]),
            parseFloat(myStockLow[len - i]),
            parseFloat(myStockClose[len - i])
          ]);
          output2.push([
            new Date(myStockdate[len - i]).getTime() + 7200 * 1000,
            parseFloat(myStockVolume[len - i])
          ]);
        }
        console.log(output);

        const option = cloneDeep(this.state.option);
        option.series[0].data = output;
        option.series[1].data = output2;

        this.setState({
          option
        });
      })
      .catch(error => console.log(error));
  };

  getOption = () => ({
    chart: {
      height: 500
    },
    title: {
      text: "Nokia Stock Intraday"
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the navigator area to zoom in/out<br/>Source: Alpha Vantage API"
          : "Pinch the chart to zoom in/out<br/>Source: Alpha Vantage API"
    },
    xAxis: {
      gapGridLineWidth: 0
    },
    yAxis: [
      {
        labels: {
          align: "left"
        },
        height: "80%",
        resize: {
          enabled: true
        },
        title: {
          text: "OHLC"
        }
      },
      {
        labels: {
          align: "left"
        },
        top: "80%",
        height: "20%",
        offset: 0,
        title: {
          text: "Volume"
        }
      }
    ],
    rangeSelector: {
      buttons: [
        {
          type: "hour",
          count: 1,
          text: "1h"
        },
        {
          type: "day",
          count: 1,
          text: "1D"
        },
        {
          type: "all",
          count: 1,
          text: "All"
        }
      ],
      selected: 3,
      inputEnabled: false
    },

    series: [
      {
        type: "ohlc",
        name: "Nokia Stock Price",
        id: "Nokia-ohlc",
        data: [],
        gapSize: 5,
        tooltip: {
          valueDecimals: 3
        }
      },
      {
        type: "column",
        id: "Nokia-volume",
        name: "Volume",
        data: [],
        yAxis: 1
      }
    ]
  });

  componentDidMount() {
    this.fetchNewDate();
    //   this.refs.chart.chart.reflow();
  }

  render() {
    return (
      <div className="alpha-parent">
        <HighchartsReact
          ref={"chart"}
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={this.state.option}
        />
      </div>
    );
  }
}

export default FinanceAlpha;
