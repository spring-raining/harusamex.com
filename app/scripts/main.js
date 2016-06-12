'use strict';

import THREE from 'three';

let scene, camera, renderer;
let globe;
let lastTime;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  const segments = new THREE.Geometry();
  for (let i = -5; i < 5; i += 0.25) {
    for (let j = -5; j < 5; j += 0.25) {
      for (let k = -5; k < 5; k += 0.25) {
        if (i * i + j * j + k * k >= 25) continue;

        segments.vertices.push(new THREE.Vector3(i, j, k));
      }
    }
  }

  globe = new THREE.Object3D();
  globe.rotation.x = 2 * Math.PI * Math.random();
  globe.rotation.y = 2 * Math.PI * Math.random();
  globe.rotation.z = 2 * Math.PI * Math.random();

  const particles = new THREE.Points(segments, new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: (window.devicePixelRatio || 1) / 2,
    sizeAttenuation: false,
  }));

  globe.add(particles);
  scene.add(globe);

  scene.fog = new THREE.FogExp2(0xffffff, 0.2);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setClearColor(0xffffff, 1);

  renderer.setSize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);

  document.getElementById('entrypoint').appendChild(renderer.domElement);
  lastTime = getTime();
}

function animate() {
  const nowTime = getTime();
  const diff = (nowTime - lastTime) / 1000;
  globe.rotation.x = globe.rotation.x + (0.006 * diff) % (Math.PI * 2);
  globe.rotation.y = globe.rotation.y + (0.008 * diff) % (Math.PI * 2);
  globe.rotation.z = globe.rotation.z + (0.012 * diff) % (Math.PI * 2);

  renderer.render(scene, camera);
  lastTime = nowTime;
  requestAnimationFrame(animate);
}

function getTime() {
  return window.performance
    ? window.performance.now()
    : new Date().getTime();
}

