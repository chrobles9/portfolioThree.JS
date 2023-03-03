import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //FOV
  window.innerWidth / window.innerHeight, //Aspect Ratio
  0.1, // View Frustum Range min, max
  1000 ); 

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio( window.devicePixelRatio );