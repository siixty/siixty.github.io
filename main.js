import * as THREE from 'three';

import {
  RGBELoader,
  sRGBEncoding,
  OrbitControls
} from 'three'



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2500);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  button: document.getElementById("btn2"),
  powerPreference: "high-performance",
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 35, 70);



renderer.render(scene, camera);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
})

// Geometry

let diffMap = new THREE.TextureLoader().load("./graphics/planet_textureAzure.jpg");
diffMap.encoding = sRGBEncoding;


let roughMap = new THREE.TextureLoader().load("./graphics/planet_textureAuric.jpg");
roughMap.encoding = sRGBEncoding;
let dispMap = new THREE.TextureLoader().load("./graphics/planet_textureChondrite.jpg");
dispMap.encoding = sRGBEncoding;
let aoMap2 = new THREE.TextureLoader().load("./graphics/planet_textureBurnt.jpg");
aoMap2.encoding = sRGBEncoding;

let map5 = new THREE.TextureLoader().load("./graphics/planet_textureBlueGiant.jpg");
map5.encoding = sRGBEncoding;
let map6 = new THREE.TextureLoader().load("./graphics/planet_textureCyanic.jpg");
map6.encoding = sRGBEncoding;
let map7 = new THREE.TextureLoader().load("./graphics/planet_textureChlorine.jpg");
map7.encoding = sRGBEncoding;

let map8 = new THREE.TextureLoader().load("./graphics/planet_textureDust.jpg");
map8.encoding = sRGBEncoding;
let map9 = new THREE.TextureLoader().load("./graphics/planet_textureDesertic.jpg");
map9.encoding = sRGBEncoding;
let map10 = new THREE.TextureLoader().load("./graphics/planet_textureFluorescent.jpg");
map10.encoding = sRGBEncoding;


let matArray = [
  diffMap, roughMap, dispMap, aoMap2, map5, map6, map7, map8, map9, map10
]


// MATERIALS 
// color: 0xf0e7e7,
// map: diffMap,
// normalMap: normalMap,
// roughnessMap: roughMap,
// displacementMap: dispMap,
// aoMap: aoMap


const hdrEquirect = new RGBELoader().load(
  "satara_night_2k.hdr",
  () =>
  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping

)

let dodeMat = new THREE.MeshPhysicalMaterial({
  map: diffMap,
  displacementMap: diffMap,
  aoMap: diffMap,
  bumpMap: diffMap,
  bumpScale: .5,
  // normalMap: diffMap,
  // envMap: hdrEquirect,
})
let dode = new THREE.Mesh(
  new THREE.SphereBufferGeometry(10, 50, 50),
  dodeMat
)
btn2.addEventListener("click", function () {
  var rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];


  // DODEMAT
  dodeMat.displacementMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.aoMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.displacementScale = Math.floor((Math.random() * 10) + 1);
  dodeMat.map = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.bumpMap = matArray[Math.floor(Math.random() * matArray.length)];
  dodeMat.color.set('rgb(' + rgb.join(', ') + ')')
});


// SATELLITE
const moonMat = new THREE.TextureLoader().load("/graphics/3Uq2YE8l.jpg")
const normalMoonMat = new THREE.TextureLoader().load("./normalDX.png")

var moonGeometry = new THREE.SphereBufferGeometry(3.5, 50, 50);
var moonMaterial = new THREE.MeshPhongMaterial({
  map: moonMat,
  normalMap: normalMoonMat
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(50, 0, 0);

var ambientLight = new THREE.AmbientLight(0xf1f1f1);

var spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(50, 50, 50);

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

  let starMatNR = new THREE.TextureLoader().load("./graphics/star_textureCustomBlue.jpg");
  starMatNR.wrapS = THREE.RepeatWrapping;
  starMatNR.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.SphereBufferGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    normalMap: starMatNR,
  })

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star, spotLight);

}
Array(500).fill().forEach(addStar);


// // function addPlanet() {

// //   const geometry = new THREE.DodecahedronGeometry(25, 6);
// //   const material = new THREE.MeshPhysicalMaterial({
// //     map: diffMap,
// //     // bumpMap: dispMap,
// //     // displacementMap: dispMap,
// //     // aoMap: dispMap,
// //     envMap: hdrEquirect,
// //   })

// //   const planet = new THREE.Mesh(geometry, material)

// //   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2500));

// //   planet.position.set(x, y, z);
// //   scene.add(planet, pointLight);

// btn2.addEventListener("click", function () {
//   material.displacementMap = matArray[Math.floor(Math.random() * matArray.length)];
//   material.aoMap = matArray[Math.floor(Math.random() * matArray.length)];
//   material.aoMapIntensity = Math.floor((Math.random() * 10) + 1);
//   material.displacementScale = Math.floor((Math.random() * 10) + 1);
//   material.bumpScale = Math.floor((Math.random() * 3) + 0);
//   material.map = matArray[Math.floor(Math.random() * matArray.length)];
//   material.bumpMap = matArray[Math.floor(Math.random() * matArray.length)];
//   material.color.set('rgb(' + rgb.join(', ') + ')')
// })
// }
// Array(25).fill().forEach(addPlanet);

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;


// ANIMATION

//Set the moon's orbital radius, start angle, and angle increment value
var r = 35;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;

function animate() {
  requestAnimationFrame(animate);

  dode.rotation.y += .0005;

  theta += dTheta;
  moon.position.x = r * Math.cos(theta);
  moon.position.z = r * Math.sin(theta);

  controls.update();

  renderer.render(scene, camera);
}
animate();


scene.add(spotLight);
scene.add(ambientLight);
scene.add(moon);
scene.add(dode);

console.log("Scene polycount:", renderer.info.render.triangles)
console.log("Active Drawcalls:", renderer.info.render.calls)
console.log("Textures in Memory", renderer.info.memory.textures)
console.log("Geometries in Memory", renderer.info.memory.geometries)