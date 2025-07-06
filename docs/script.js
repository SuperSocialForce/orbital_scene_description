import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#webgl');
  const app = new ThreeApp(wrapper);
  app.render();
}, false);

class ThreeApp {
  static CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 10.0,
    position: new THREE.Vector3(0.0, 2.0, 5.0),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };
  static RENDERER_PARAM = {
    clearColor: 0x666666,       
    width: window.innerWidth,   
    height: window.innerHeight, 
  };
  static MATERIAL_PARAM = {
    color: 0x4080ff,
  };
  static SCALE = 1.0 / 6378e3;

  renderer;   
  scene;      
  camera;     
  geometry;   
  material;   
  box;        
  controls;   
  axesHelper; 

  constructor(wrapper) {
    const color = new THREE.Color(ThreeApp.RENDERER_PARAM.clearColor);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(color);
    this.renderer.setSize(ThreeApp.RENDERER_PARAM.width, ThreeApp.RENDERER_PARAM.height);
    wrapper.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      ThreeApp.CAMERA_PARAM.fovy,
      ThreeApp.CAMERA_PARAM.aspect,
      ThreeApp.CAMERA_PARAM.near,
      ThreeApp.CAMERA_PARAM.far,
    );
    this.camera.position.copy(ThreeApp.CAMERA_PARAM.position);
    this.camera.lookAt(ThreeApp.CAMERA_PARAM.lookAt);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(1.0, 1.0, 1.0);
    this.scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);

    this.sphere = new THREE.SphereGeometry(1.0, 32, 32);
    this.material = new THREE.MeshPhongMaterial(ThreeApp.MATERIAL_PARAM);
    this.earth = new THREE.Mesh(this.sphere, this.material);
    this.scene.add(this.earth);

    const plane = new THREE.PlaneGeometry(3, 3);
    this.material = new THREE.MeshBasicMaterial({ transparent: true, color: 0xb08080, opacity: 0.5, side: THREE.DoubleSide });
    const equatorialPlane = new THREE.Mesh(plane, this.material);
    equatorialPlane.rotation.x = -Math.PI / 2;
    this.scene.add(equatorialPlane);

    this.axesHelper = new THREE.AxesHelper();
    this.axesHelper.material.depthTest = false;
    this.scene.add(this.axesHelper);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.render = this.render.bind(this);
  }

  render() {
    requestAnimationFrame(this.render);

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
