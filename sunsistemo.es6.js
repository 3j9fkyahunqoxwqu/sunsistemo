let scene, camera, light, renderer;
let controls, stats;

let calc = require("./calc.es6.js");

let bodies = calc.bodies;
let [spheres] = init();


animate_leapfrog();


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 400;
    light = new THREE.PointLight(0xfcd440, 1, 0);
    light.position.set(250,0,0);
    scene.add(light);


    // orbitcontrols
    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.1;
    controls.addEventListener('change', render);

    // spheres
    let spheres = [];
    for (let b of bodies) {
        let geometry = new THREE.SphereGeometry(20, 32, 32);
        let material = new THREE.MeshPhongMaterial();
        let sphere = new THREE.Mesh(geometry, material);

        sphere.position.set(b.r.x, b.r.y, b.r.z);
        scene.add(sphere);
        spheres.push(sphere);
    }

    // sun
    let light = new THREE.PointLight(0xffffff);
    spheres[0].add(light);

    // overall light
    let ambient = new THREE.AmbientLight( 0x404040 );
    scene.add(ambient);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    return [spheres];
}

function animate_leapfrog(){
    bodies = calc.leapfrog(bodies, 0.001);

    requestAnimationFrame(animate);
}

function animate() {
    bodies = calc.symplectic_euler(bodies, 0.001);

    for (let i = 0; i < bodies.length; i++) {
        let pos = bodies[i].r;
        spheres[i].position.set(pos.x, pos.y, pos.z);
    }

    requestAnimationFrame(animate);
    render();
    stats.update();
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
window.addEventListener('resize', onWindowResize, true);


function render() {
    renderer.render(scene, camera);
}