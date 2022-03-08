import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RedFormat } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// texture loader
const  textureLoader = new THREE.TextureLoader()
const javatexture = textureLoader.load('textures/gradients/java.png')
javatexture.minFilter = THREE.NearestFilter
const ctexture = textureLoader.load('textures/gradients/c.png')
ctexture.minFilter = THREE.NearestFilter
const pythontexture = textureLoader.load('textures/gradients/python.png')
pythontexture.minFilter = THREE.NearestFilter
const htmltexture = textureLoader.load('textures/gradients/html.png')
htmltexture.minFilter = THREE.NearestFilter
const csstexture = textureLoader.load('textures/gradients/css.png')
csstexture.minFilter = THREE.NearestFilter
const javascripttexture = textureLoader.load('textures/gradients/javascript.png')
javascripttexture.minFilter = THREE.NearestFilter
const blendertexture = textureLoader.load('textures/gradients/blender.png')
blendertexture.minFilter = THREE.NearestFilter
const gittexture = textureLoader.load('textures/gradients/git.png')
gittexture.minFilter = THREE.NearestFilter

const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: javatexture
    }),    
)
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: ctexture
    })
)
const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: pythontexture
    })
)
const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: htmltexture
    })
)
const mesh5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: csstexture
    })
)
const mesh6 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: javascripttexture
    })
)
const mesh7 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: blendertexture
    })
)
const mesh8 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({
        map: gittexture
    })
)
mesh1.position.set(-8, -12, 0)
mesh2.position.set(-5, -12, 0)
mesh3.position.set(-2, -12, 0)
mesh4.position.set(-8, -14, 0)
mesh5.position.set(-5, -14, 0)
mesh6.position.set(-2, -14, 0)
mesh7.position.set(-8, -16, 0)
mesh8.position.set(-5, -16, 0)
scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8)

const objectsDistance = 12
// intro models
let spacewalk
const astronaut = new GLTFLoader()
astronaut.load('./models/Duck/glTF/scene.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(5, 0, 0)
        scene.add(gltf.scene)
        spacewalk = gltf.scene.children[0]
        tick()
    })
    
// skill model
let rover
const skill = new GLTFLoader()
skill.load('./models/Duck/glTF/rover/scene.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.250, 0.250, 0.250)
        gltf.scene.position.set(5, -14, -3)
        //gltf.scene.rotation.y = Math.PI * 0.1
        scene.add(gltf.scene)
        rover = gltf.scene.children[0]
        tick()
    })

const sectionMeshes = [ mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8 ]
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.4)
directionalLight.position.set(10, 10, 100)
scene.add(directionalLight)
//Light.target = astronaut

const ambient = new THREE.AmbientLight(0x404040, 4)
scene.add(ambient)

/**
 * Particles
 */
// Geometry
const particlesCount = 400
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 4
    positions[i * 3 + 2] = (Math.random() - 0.20) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    // sizeAttenuation: textureLoader,
    size: 0.09
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
// fov = 35, aspect = sizes.width/sizes.height, near = 0.1, far = 100
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 20)
//camera.position.z = 20

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true, // makes small edges smooth
    canvas: canvas,
    alpha: true // add our own background
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = -scrollY / sizes.height * objectsDistance  

    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    spacewalk.rotation.z += 0.0010
    spacewalk.rotation.y += 0.0012

    spin.rotation.y += 0.0015

    rover.rotation.z += 0.0002
}


