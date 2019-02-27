import React from "react";
import "./MyPDF.css";
import { VariableSizeList as List } from "react-window";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class MyPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null,
      numPages: null,
      pageNumber: 1,
      loaded: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.setDivSize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setDivSize, false);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, loaded: true });
    this.setDivSize();
  };

  setDivSize = () => {
    this.setState({
      width: this.pdfWrapper.getBoundingClientRect().width,
      height: this.pdfWrapper.getBoundingClientRect().height
    });
  };

  getItemSize = index => {
    return this.state.width * 1.4;
  };

  render() {
    return (
      <div className="pdfWrapper" ref={ref => (this.pdfWrapper = ref)}>
        <Document
          file="./example.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
          className="mypdf-container-pages"
          noData=""
          loading={<div className="pdfLoader" />}
        >
          {this.state.loaded ? (
            <List
              height={this.state.height}
              width={this.state.width}
              itemCount={this.state.numPages}
              itemSize={this.getItemSize}
              overscanCount={2}
            >
              {({ style, index }) => (
                <div style={style}>
                  <Page
                    pageNumber={index + 1}
                    width={this.state.width - 15}
                    loading=""
                  />
                </div>
              )}
            </List>
          ) : null}
        </Document>
      </div>
    );
  }
}

export default MyPDF;
