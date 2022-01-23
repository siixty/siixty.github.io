import * as THREE from 'https://threejs.org/build/three.module.js';

import {
  OrbitControls
} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  button: document.getElementById("btn2"),
  antialias: true,
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);

renderer.render(scene, camera);

// Geometry

let diffMap = new THREE.TextureLoader().load("diffMap.png");
let normalMap = new THREE.TextureLoader().load("normalDX.png");
normalMap.wrapS = THREE.RepeatWrapping;
normalMap.wrapT = THREE.RepeatWrapping;
let roughMap = new THREE.TextureLoader().load("roughMap.png");
let dispMap = new THREE.TextureLoader().load("dispMap.png");
let aoMap = new THREE.TextureLoader().load("aoMap.png");


let matArray = [
  diffMap, normalMap, roughMap, dispMap, aoMap
]


// MATERIALS 
// color: 0xf0e7e7,
// map: diffMap,
// normalMap: normalMap,
// roughnessMap: roughMap,
// displacementMap: dispMap,
// aoMap: aoMap
let dodeMat = new THREE.MeshPhysicalMaterial({
  map: dispMap,
  bumpMap: dispMap,
  displacementMap: dispMap,
  aoMap: dispMap
})
let dode = new THREE.Mesh(
  new THREE.DodecahedronGeometry(50, 20),
  dodeMat
)
btn2.addEventListener("click", function () {
  var rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];

  dodeMat.displacementMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.aoMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.aoMapIntensity = Math.floor((Math.random() * 10) + 1);
  dodeMat.displacementScale = Math.floor((Math.random() * 10) + 1);
  dodeMat.bumpScale = Math.floor((Math.random() * 3) + 0);
  dodeMat.map = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.bumpMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.color.set('rgb(' + rgb.join(', ') + ')')
});

scene.add(dode);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(500, 500, 500);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(pointLight, ambientLight);

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
    clearcoat: 1,
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

  dode.rotation.z -= 0.004;

  controls.update();

  renderer.render(scene, camera);
}
animate();