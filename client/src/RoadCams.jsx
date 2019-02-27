import React from "react";
import ImageGallery from "react-image-gallery";
import "./RoadCams.css";
import "react-image-gallery/styles/css/image-gallery.css";

class RoadCams extends React.Component {
  render() {
    const images = [
      {
        original: "https://weathercam.digitraffic.fi/C1252500.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1252500.jpg"
      },
      {
        original: "https://weathercam.digitraffic.fi/C1255701.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1255701.jpg"
      },
      {
        original: "https://weathercam.digitraffic.fi/C1251200.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1251200.jpg"
      },
      {
        original: "https://weathercam.digitraffic.fi/C1255201.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1255201.jpg"
      },
      {
        original: "https://weathercam.digitraffic.fi/C1250401.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1250401.jpg"
      },
      {
        original: "https://weathercam.digitraffic.fi/C1258101.jpg",
        thumbnail: "https://weathercam.digitraffic.fi/C1258101.jpg"
      }
    ];
    return (
      <div className="gallery-container">
        <ImageGallery items={images} />
      </div>
    );
  }
}

export default RoadCams;
