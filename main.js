import './style.css'

import * as THREE from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);

renderer.render(scene, camera);


// Geometry

const diffMap = new THREE.TextureLoader().load("diffMap.png");
const normalMap = new THREE.TextureLoader().load("normalDX.png");
normalMap.wrapS = THREE.RepeatWrapping;
normalMap.wrapT = THREE.RepeatWrapping;
const roughMap = new THREE.TextureLoader().load("roughMap.png");
const dispMap = new THREE.TextureLoader().load("dispMap.png");
const aoMap = new THREE.TextureLoader().load("aoMap.png");

// MATERIALS 
// color: 0xf0e7e7,
// map: diffMap,
// normalMap: normalMap,
// roughnessMap: roughMap,
// displacementMap: dispMap,
// aoMap: aoMap

const dode = new THREE.Mesh(
  new THREE.DodecahedronGeometry(50, 20),
  new THREE.MeshPhysicalMaterial({
    color: 0x79018C,
    map: dispMap,
    clearcoat: 0.4
  })
)

scene.add(dode);

const pointLight = new THREE.PointLight(0xffffff, 3);
pointLight.position.set(1000, 1000, 1000);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = 2.4;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.07;
// STARS

function addStar() {

  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffd27d,
    clearcoat: 1
  })

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star, pointLight);
}
Array(600).fill().forEach(addStar);


// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;


// ANIMATION

function animate() {
  requestAnimationFrame(animate);

  dode.rotation.z += 0.004;

  controls.update();

  renderer.render(scene, camera);
}
animate();