import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.css";
import "./LeafletMap.css";
import L from "leaflet";
import "leaflet-easybutton";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import axios from "axios";
import MapInfo from "./MapInfo";

//L.Icon.Default.imagePath = ".";
// OR
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class MyMaps extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      vehiclesnro: 0,
      lastupdate: new Date().toLocaleTimeString("en-GB"),
      lat: 65.021575,
      lng: 25.490895,
      zoom: 8,
      markers2: []
    };
  }

  fetchKunnossapito = () => {
    const url =
      "http://it102.infotripla.fi:8680/HarjaMaintenanceDataHandlerService/rest/query/seuranta";

    axios

      .get(url)
      .then(res => {
        this.setState({
          vehiclesnro: res.data.results.length,
          lastupdate: res.data.responseTs,
          markers2: res.data.results.map(marker => {
            return {
              latlng: [marker.location.y, marker.location.x],
              name: marker.vehicle_id,
              action: marker.actions,
              timestamp: marker.timestamp
            };
          })
        });
      })
      .catch(error => console.log(error));
  };

  createEasybutton = () => {
    const lmap = this.mapRef.current;

    let that = this;
    L.easyButton(
      '<img id="mybtn" src="expand.png" style="width:16px">',
      () => {
        screenfull.request(findDOMNode(lmap));
      },
      "Toggle Fullscreen"
    ).addTo(lmap.leafletElement);

    L.easyButton(
      '<img id="mybtn" src="refresh.png" style="width:16px">',
      () => {
        that.fetchKunnossapito();
      },
      "Refresh Maintenance Data"
    ).addTo(lmap.leafletElement);
  };

  componentDidMount() {
    this.fetchKunnossapito();
    this.createEasybutton();

    setTimeout(() => {
      this.mapRef.current.leafletElement.invalidateSize();
    }, 100);
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const MyMarkers = this.state.markers2.map(marker => (
      <Marker key={marker.name} position={marker.latlng}>
        <Popup>
          Timestamp: {marker.timestamp.replace(/T/gi, " ").slice(0, -6)} <br />
          Vehicle ID: {marker.name}
          <br /> Action:{" "}
          {marker.action.map(a1 => {
            return a1 + "   ";
          })}
        </Popup>
      </Marker>
    ));

    return (
      <div className="jepjep">
        <Map center={position} zoom={this.state.zoom} ref={this.mapRef}>
          <div id="menu">
            <span>
              Vehicles amount: {this.state.vehiclesnro}
              <br />
              Last Update:{" "}
              {this.state.lastupdate.replace(/T/gi, " ").slice(0, -6)}
            </span>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </div>
          {MyMarkers}
          <MapInfo />
        </Map>
      </div>
    );
  }
}

export default MyMaps;
