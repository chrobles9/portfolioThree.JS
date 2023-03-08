import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Global variables
let scene, camera, renderer, controls;
// Rotating shapes
let sceneObjects = [];

// Initiate Scene
function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, //FOV
    window.innerWidth / window.innerHeight, //Aspect Ratio
    0.1, // View Frustum Range min, max
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background"),
    // antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = 30;
  camera.position.x = -3;

  renderer.render(scene, camera);

  createShapes();
  document.body.onscroll = moveCamera;

  addLighting();
  addTextures();
  Array(200).fill().forEach(createStar);

  moveCamera();

  animate();

  // onWindowResize();
  // window.addEventListener("resize", onWindowResize, false);
}

function createShapes() {
  // Single Torus
  function createTorus() {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6347,
      // wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    sceneObjects.push(torus);
  }

  // Cube with Head image
  function createHeadCube() {
    const headTexture = new THREE.TextureLoader().load("./headLogo.png");
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(5, 5, 5),
      new THREE.MeshBasicMaterial({ map: headTexture })
    );

    head.position.z = -10;
    head.position.x = 1;
    scene.add(head);
    sceneObjects.push(head);
  }

  // Moon
  function createMoon() {
    const moonTexture = new THREE.TextureLoader().load("./moonTexture.jpg");
    const normalTexture = new THREE.TextureLoader().load("./normalMap.png");

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    moon.position.z = 16;
    // moon.position.x = -7;
    moon.position.x = -4;
    // moon.position.y = -10;

    scene.add(moon);
    sceneObjects.push(moon);
  }

  createTorus();
  createHeadCube();
  createMoon();
}

function addLighting() {
  // Add point light to Torus
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // Visual Light assistance tool
  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper);

  // controls = new OrbitControls(camera, renderer.domElement);
}

function addTextures() {
  // Add Canvas background texture
  const backgroundTexture = new THREE.TextureLoader().load("./space.jpg");
  scene.background = backgroundTexture;
}

function animate() {
  requestAnimationFrame(animate);
  // Rotates each object the same
  // for (let object of sceneObjects) {
  //   object.rotation.x += 0.01;
  //   object.rotation.y += 0.005;
  //   object.rotation.z += 0.01;
  // }

  sceneObjects[2].rotation.x += 0.01;
  sceneObjects[2].rotation.y += 0.005;
  sceneObjects[2].rotation.z += 0.01;
  renderer.render(scene, camera);

  controls.update();
}

function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // Creates randomw
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // Moon
  // sceneObjects[2].rotation.x += 0.05;
  // sceneObjects[2].rotation.y += 0.075;
  // sceneObjects[2].rotation.z += 0.05;
  // Head Cube
  sceneObjects[1].rotation.y += 0.01;
  sceneObjects[1].rotation.z += 0.01;

  camera.position.z = t * -0.02;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

initScene();
