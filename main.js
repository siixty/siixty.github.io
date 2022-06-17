import * as THREE from "https://cdn.skypack.dev/three";

import { RGBELoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/RGBELoader.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2500
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  powerPreference: "high-performance",
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 35, 70);

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

// Geometry

console.log("Geometries in Memory", renderer.info.memory.geometries);
