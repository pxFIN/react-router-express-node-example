import React from "react";
import "./Fingrid.css";
import axios from "axios";
import mapValues from "lodash/mapValues";
import cloneDeep from "lodash/cloneDeep";
import DatePicker from "react-datepicker";
//import "highcharts/css/themes/grid-light.css";
import "./gray";
//import "highcharts/themes/gray";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
//import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
//import "highcharts/css/highcharts.css";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
// Initialize exporting module.
Exporting(Highcharts);
ExportData(Highcharts);

const fingridDataSet = [
  {
    datasetId: 53,
    description:
      "Automaattisen taajuudenhallintareservin aktivoitu energia, alas",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 123,
    description: "Aktivoitunut taajuusohjattu käyttöreservi",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 54,
    description:
      "Automaattisen taajuudenhallintareservin aktivoitu energia, ylös",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 252,
    description: "Aktivoitu alassäätöteho",
    unit: "MW",
    interval: "15 min"
  },
  {
    datasetId: 165,
    description: "Seuraavan vuorokauden kulutusennuste",
    unit: "MWh/h",
    interval: "5 min"
  },
  {
    datasetId: 253,
    description: "Aktivoitu ylössäätöteho",
    unit: "MW",
    interval: "15 min"
  },
  {
    datasetId: 68,
    description: "Bilateraalikaupat suomen ja venäjän välillä",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 201,
    description: "Kaukolämmön yhteistuotanto - reaaliaikatieto",
    unit: "MW",
    interval: "3 min"
  },
  {
    datasetId: 65,
    description: "Kahdenvälisen eli bilateraalikaupan kapasiteetti RUS-FI",
    unit: "MW",
    interval: "1 hour"
  },
  {
    datasetId: 101,
    description: "Kahdenvälisen eli bilateraalikaupan kapasiteetti FI-RUS",
    unit: "MW",
    interval: "1 hour"
  },
  {
    datasetId: 140,
    description: "Kaupallinen siirto välillä FI-EE",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 32,
    description: "Kaupallinen siirto välillä FI-SE3",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 31,
    description: "Kaupallinen siirto välillä FI-SE1",
    unit: "MWh/h",
    interval: "1 hour"
  },
  {
    datasetId: 48,
    description: "Pullonkaulatulot suomen ja viron välillä",
    unit: "EUR",
    interval: "1 hour"
  },
  {
    datasetId: 189,
    description: "Lauhdevoimatuotanto - reaaliaikatieto",
    unit: "MW",
    interval: "3 min"
  },
  {
    datasetId: 192,
    description: "Sähkön tuotanto Suomessa - reaaliaikatieto",
    unit: "MW",
    interval: "3 min"
  },
  {
    datasetId: 193,
    description: "Sähkön kulutus Suomessa - reaaliaikatieto",
    unit: "MW",
    interval: "3 min"
  },
  {
    datasetId: 196,
    description: "Lämpötila Oulussa - reaaliaikatieto",
    unit: "C",
    interval: "3 min"
  }
];

class MyFingrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({ option: this.getOption() });

  fetchNewDate = () => {
    const startDateString = this.state.startDate
      .toISOString()
      .replace(/\.[0-9]{3}/, "");
    const endDateString = this.state.endDate
      .toISOString()
      .replace(/\.[0-9]{3}/, "");

    const datasetId = fingridDataSet[this.state.selectedVariableId].datasetId;

    const url = `https://api.fingrid.fi/v1/variable/${datasetId}/events/json?start_time=${startDateString}&end_time=${endDateString}`;

    axios
      .get(url, {
        headers: { "x-api-key": process.env.REACT_APP_FINGRID_API_KEY }
      })
      .then(res => {
        const mapx = mapValues(res.data, "end_time");
        const mapy = mapValues(res.data, "value");
        const myx = Object.values(mapx);
        const myy = Object.values(mapy);

        const len = myx.length;
        const output = [];

        for (var i = 0; i < len; i++) {
          output.push([new Date(myx[i]).getTime() + 7200 * 1000, myy[i]]);
        }

        const option = cloneDeep(this.state.option);

        option.series[0].data = output;
        option.title.text =
          fingridDataSet[this.state.selectedVariableId].description +
          "  --- ( " +
          fingridDataSet[this.state.selectedVariableId].interval +
          " )";

        option.yAxis.title.text =
          fingridDataSet[this.state.selectedVariableId].unit;
        option.series[0].name =
          fingridDataSet[this.state.selectedVariableId].unit;

        this.setState({
          option
        });
      })
      .catch(error => console.log(error));
  };

  getOption = () => ({
    chart: {
      zoomType: "x"
    },
    title: {
      text: ""
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in"
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba")
            ]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [
      {
        type: "area",
        name: "",
        data: []
      }
    ]
  });

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  onDropdownClick = event => {
    this.setState({
      selectedVariableId: event
    });
  };

  render() {
    return (
      <div className="parent">
        <div className="datepicker-container">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChangeStart}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={3}
            timeCaption="time"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Select Start Date"
          />
          <Dropdown as={ButtonGroup} onSelect={this.onDropdownClick}>
            <Button variant="primary" onClick={this.fetchNewDate}>
              REFRESH
            </Button>
            <Dropdown.Toggle
              split
              variant="secondary"
              id="dropdown-split-basic"
            >
              Choose ID
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {fingridDataSet.map((hit, index) => (
                <Dropdown.Item key={index} eventKey={index}>
                  {hit.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleChangeEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={3}
            timeCaption="time"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Select End Date"
          />
        </div>
        <HighchartsReact highcharts={Highcharts} options={this.state.option} />
      </div>
    );
  }
}

export default MyFingrid;
