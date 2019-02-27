/*

To remove components Lazy loading comment/uncomment imports below, 
change routes render back to component, comment Suspense

*/

import React, { Suspense } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Main.css";
import Home from "./Home";
import Clock from "./Clock";
//import MyFingrid from "./Fingrid";
//import OpenDataParking from "./OpenDataParking";
//import MyPDF from "./MyPDF";
//import MachineLearning from "./MachineLearningPicture";
//import MachineLearning2 from "./MachineLearningVideo";
//import Feed from "./Feed";
//import MyMaps from "./LeafletMap";
//import VideoPlayer from "./Video";
//import MyWebsocket from "./MyWebsocket";
//import RoadCams from "./RoadCams";
//import FinanceAlpha from "./FinanceAlpha";
//import MenuWrapper from "./CircleMenu";
//import ThreeCSS3D from "./ThreeCSS3D";
//import ThreeJSExample from "./ThreeJSExample";
//import SQLTest from "./SQLTest";
const MachineLearning = React.lazy(() => import("./MachineLearningPicture"));
const MachineLearning2 = React.lazy(() => import("./MachineLearningVideo"));
const MyFingrid = React.lazy(() => import("./Fingrid"));
const MyPDF = React.lazy(() => import("./MyPDF"));
const MyMaps = React.lazy(() => import("./LeafletMap"));
const Feed = React.lazy(() => import("./Feed"));
const VideoPlayer = React.lazy(() => import("./Video"));
const FinanceAlpha = React.lazy(() => import("./FinanceAlpha"));
const ThreeCSS3D = React.lazy(() => import("./ThreeCSS3D"));
const ThreeJSExample = React.lazy(() => import("./ThreeJSExample"));
const MyWebsocket = React.lazy(() => import("./MyWebsocket"));
const RoadCams = React.lazy(() => import("./RoadCams"));
const MenuWrapper = React.lazy(() => import("./CircleMenu"));
const SQLTest = React.lazy(() => import("./SQLTest"));
const OpenDataParking = React.lazy(() => import("./OpenDataParking"));

class NavTestComp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav defaultActiveKey="1">
                <Nav.Link eventkey="1" as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown title="Open Data" id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="2.1"
                    as={Link}
                    to="/open_data/fingrid"
                  >
                    Fingrid
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="2.2"
                    as={Link}
                    to="/open_data/parking"
                  >
                    Free Parking Spaces Oulu
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="2.3"
                    as={Link}
                    to="/open_data/maintenance"
                  >
                    Maintenance Oulu
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="2.4"
                    as={Link}
                    to="/open_data/roadcams"
                  >
                    Road Cams Oulu
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventkey="3" as={Link} to="/pdf">
                  PDF
                </Nav.Link>
                <NavDropdown title="Machine Learning" id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="4.1"
                    as={Link}
                    to="/ml/imageclassification"
                  >
                    Image Classification
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="4.2"
                    as={Link}
                    to="/ml/videoclassification"
                  >
                    Video Classification
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventkey="5" as={Link} to="/feed">
                  Hacker News Feed
                </Nav.Link>
                <Nav.Link eventkey="6" as={Link} to="/video">
                  Video
                </Nav.Link>
                <NavDropdown title="Stocks" id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="7.1"
                    as={Link}
                    to="/stocks/financealpha"
                  >
                    Alpha Vantage API Example
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="7.2"
                    as={Link}
                    to="/stocks/websocket"
                  >
                    IEX Websocket API Example
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Widgets" id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="8.1"
                    as={Link}
                    to="/widgets/circlemenu"
                  >
                    Circle Menu
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="ThreeJS" id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="9.1"
                    as={Link}
                    to="/threejs/3css3d"
                  >
                    CSS3D Youtube Cube
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="9.2"
                    as={Link}
                    to="/threejs/simplecube"
                  >
                    Simple Cube
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventkey="10" as={Link} to="/sql">
                  SQL
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Text className="ml-auto">
              <Clock />
            </Navbar.Text>
          </Navbar>
          <div className="content">
            <Suspense fallback={<div className="loader2" />}>
              <Route exact path="/" component={Home} />
              <Route
                path="/open_data/fingrid"
                // component={MyFingrid}
                render={() => <MyFingrid />}
              />
              <Route
                path="/open_data/parking"
                // component={OpenDataParking}
                render={() => <OpenDataParking />}
              />
              <Route
                path="/open_data/maintenance"
                // component={MyMaps}
                render={() => <MyMaps />}
              />
              <Route
                path="/open_data/roadcams"
                // component={RoadCams}
                render={() => <RoadCams />}
              />
              <Route
                path="/pdf"
                // component={MyPDF}
                render={() => <MyPDF />}
              />
              <Route
                path="/ml/imageclassification"
                // component={MachineLearning}
                render={() => <MachineLearning />}
              />
              <Route
                path="/ml/videoclassification"
                // component={MachineLearning2}
                render={() => <MachineLearning2 />}
              />
              <Route
                path="/feed"
                // component={Feed}
                render={() => <Feed />}
              />
              <Route
                path="/video"
                // component={VideoPlayer}
                render={() => <VideoPlayer />}
              />
              <Route
                path="/stocks/websocket"
                // component={MyWebsocket}
                render={() => <MyWebsocket />}
              />
              <Route
                path="/stocks/financealpha"
                // component={FinanceAlpha}
                render={() => <FinanceAlpha />}
              />
              <Route
                path="/widgets/circlemenu"
                // component={MenuWrapper}
                render={() => <MenuWrapper />}
              />
              <Route
                path="/threejs/3css3d"
                // component={ThreeCSS3D}
                render={() => <ThreeCSS3D />}
              />
              <Route
                path="/threejs/simplecube"
                // component={ThreeJSExample}
                render={() => <ThreeJSExample />}
              />
              <Route
                path="/sql"
                // component={SQLTest}
                render={() => <SQLTest />}
              />
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default NavTestComp;
