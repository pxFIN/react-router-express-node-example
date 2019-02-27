import React from "react";
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer, TrackballControls } from "three-full";

class ThreeCSS3D extends React.Component {
  createCSSElement = (id, x, y, z, ry) => {
    var div = document.createElement("div");
    div.style.width = "480px";
    div.style.height = "360px";
    div.style.backgroundColor = "#000";
    var iframe = document.createElement("iframe");
    iframe.style.width = "480px";
    iframe.style.height = "360px";
    iframe.style.border = "0px";
    iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
    div.appendChild(iframe);
    this.cssobject = new CSS3DObject(div);
    this.cssobject.position.set(x, y, z);
    this.cssobject.rotation.y = ry;
    return this.cssobject;
  };

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 5000);
    this.camera.position.set(500, 350, 750);
    this.renderer = new CSS3DRenderer();
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    var group = new THREE.Group();
    group.add(new this.createCSSElement("C4R8FKKaUQQ", 0, 0, 240, 0));
    group.add(new this.createCSSElement("oPDan539u8Y", 240, 0, 0, Math.PI / 2));
    group.add(new this.createCSSElement("R84JU3B0jqo", 0, 0, -240, Math.PI));
    group.add(
      new this.createCSSElement("uuAxOsYlWrQ", -240, 0, 0, -Math.PI / 2)
    );
    this.scene.add(group);

    this.controls = new TrackballControls(this.camera);
    this.controls.rotateSpeed = 4;

    this.start();

    window.addEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = () => {
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
  };

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.controls.update();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        id="blocker"
        style={{ width: "100%", height: "75vh", margin: "0 auto" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeCSS3D;
