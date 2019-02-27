import React from "react";
import * as THREE from "three";
import "./ThreeJSExample.css";

class ThreeJSExample extends React.Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    const texture = new THREE.TextureLoader().load("../crate.gif");

    this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    this.camera.position.z = 400;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
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
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "100%", height: "75vh", margin: "0 auto" }}
        className="example-cube"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeJSExample;
