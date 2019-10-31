import * as THREE from 'three'

const root = document.getElementById('root')

let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
camera.position.z = 1

let scene = new THREE.Scene()

let geomerty = new THREE.BoxGeometry(0.2, 0.2, 0.2)
let material = new THREE.MeshNormalMaterial()

let mesh = new THREE.Mesh(geomerty, material)
scene.add(mesh)

let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

root.appendChild(renderer.domElement)

startScene()

function startScene() {
  requestAnimationFrame(startScene)

  mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

  renderer.render(scene, camera)
}
