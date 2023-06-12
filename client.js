// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const menuPanel = document.getElementById('menuPanel')
const startButton = document.getElementById('startButton')
startButton.addEventListener(
'click',
function () {
   controls.lock()
},
false
)


// Create a geometry for the room
const roomWidth = 10;
const roomHeight = 5;
const roomDepth = 10;
const roomGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, roomDepth);

// Create a material for the room walls
const roomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

// Create a mesh for each wall of the room and add them to the scene
const roomWalls = [];

// Back wall
roomWalls.push(new THREE.Mesh(roomGeometry, roomMaterial));
roomWalls[0].position.set(0, 0, -roomDepth / 2);
scene.add(roomWalls[0]);         

// Create a geometry for the chandelier
const chandelierGeometry = new THREE.SphereGeometry(0.5, 8, 8);

// Create a material for the chandelier
const chandelierMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

// Create a mesh for the chandelier and add it to the scene
const chandelier = new THREE.Mesh(chandelierGeometry, chandelierMaterial);
chandelier.position.set(0, roomHeight / 2 - 0.5, 0);
scene.add(chandelier);

// Create a light for the chandelier
const chandelierLight = new THREE.PointLight(0xffff00, 1, 10);
chandelierLight.position.set(0, roomHeight / 2 - 0.5, 0);
scene.add(chandelierLight);
     
// Position the camera inside the room
camera.position.set(0, 0, 0);

//  const axesHelper = new THREE.AxesHelper( 5 );
//  scene.add( axesHelper );


// Initialize camera movement variables
let camMove = {
forward: false,
backward: false,
left: false,
right: false,
jump: false,
speed: 0.05,
jumpSpeed: 0.1,
maxJump: 1.5,
isJumping: false
};

const controls = new PointerLockControls(camera, renderer.domElement)

controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

// Add keyboard event listeners
document.addEventListener('keydown', function(event) {
switch (event.code) {
case 'KeyW':
camMove.forward = true;
break;
case 'KeyS':
camMove.backward = true;
break;
case 'KeyA':
camMove.left = true;
break;
case 'KeyD':
camMove.right = true;
break;
case 'Space':
if (!camMove.isJumping) {
    camMove.jump = true;
    camMove.isJumping = true;
}
break;

}
}, false);

document.addEventListener('keyup', function(event) {
switch (event.code) {
case 'KeyW':
camMove.forward = false;
break;
case 'KeyS':
camMove.backward = false;
break;
case 'KeyA':
camMove.left = false;
break;
case 'KeyD':
camMove.right = false;
break;
case 'Space':
camMove.jump = false;
break;

}
}, false);

// Modify the render function to update camera position
function render() {
if (camMove.forward) {
    camera.position.z -= camMove.speed;
}
if (camMove.backward) {
    camera.position.z += camMove.speed;
}
if (camMove.left) {
    camera.position.x -= camMove.speed;
}
if (camMove.right) {
    camera.position.x += camMove.speed;
}

if (camMove.jump && camera.position.y < camMove.maxJump) {
    camera.position.y += camMove.jumpSpeed;
} else if (!camMove.jump && camera.position.y > 0) {
    camera.position.y -= camMove.jumpSpeed;
} else {
    camMove.isJumping = false;
}

controls.update();
    
requestAnimationFrame(render);
renderer.render(scene, camera);
}

render();


