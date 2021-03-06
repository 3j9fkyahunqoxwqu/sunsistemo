let THREE = require("three");
let Vec3 = THREE.Vector3;

import * as calc from "./calc.js";

let textureSets = {
    solar: ["sun", "mercury", "venus", "earth", "moon", "mars", "jupiter",
            "saturn", "uranus", "neptune", "pluto"],
    balls: ["tennisball", "softball"]
};
textureSets.all = textureSets.solar.concat(textureSets.balls);


class Body {
    constructor(m, r, v, rad, texture, rot) {
        this.m = m;
        this.r = r;
        this.v = v;
        this.rad = rad;
        this.texture = texture;
        this.rot = rot;
    }

    getTexture() {
        return allTextures[this.texture]["texture"];
    }

    getBumpMap() {
        return allTextures[this.texture]["bumpMap"];
    }
    getSpecularMap() {
        return allTextures[this.texture]["specularMap"];
    }

    set(r, v) {
        this.r = r;
        this.v = v;
        return this;
    }

    clone() {
        return new Body(this.m, this.r, this.v, this.rad, this.texture, this.rot);
    }
}

export default Body

let allTextures = {
    "sun":        loadTextures("sun", true, false, false),
    "mercury":    loadTextures("mercury", true, true,  false),
    "venus":      loadTextures("venus", true, true,  false),
    "earth":      loadTextures("earth", true, true, true),
    "mars":       loadTextures("mars", true, true,  false),
    "moon":       loadTextures("moon", true, true,  false),
    "jupiter":    loadTextures("jupiter", true, false, false),
    "saturn":     loadTextures("saturn", true, false, false),
    "uranus":     loadTextures("uranus", true, false, false),
    "neptune":    loadTextures("neptune", true, false, false),
    "pluto":      loadTextures("pluto", true, true,  false),
    "tennisball": loadTextures("tennisball", true, true, true),
    "softball":   loadTextures("softball", true, true, false)
};

let randomRot = () => Math.random() / 30;

export function genSolarSystem(sunOn) {
    // Initial conditions of the solar system at 00:00:00 1 January 1970
    let day = 60 * 60 * 24;
    let stepsize = .1 * day;

    function scaleRotation(period) {  // period in days
        let y = 2 * Math.PI / (period * day / stepsize);
        return new Vec3(0, y, 0);
    }

    let sun = new Body(
        1.98855E30,
        new Vec3(0, 0, 0),
        new Vec3(0, 0, 0),
        696342E3,
        "sun",
        scaleRotation(25.38));

    let mercury = new Body(
        3.3011E23,
        new Vec3(3.837130288733682E+10, 2.877025350243919E+10, -1.175806982200703E+09),
        new Vec3(-3.878766588423944E+04, 4.109305229662527E+04, 6.918459013107025E+03),
        2439.7E3,
        "mercury",
        scaleRotation(58.64));

    let venus = new Body(
        4.8675E24,
        new Vec3(-5.377313296255215E+09, -1.085956403911222E+11, -1.164748440839313E+09),
        new Vec3(3.474148284671561E+04, -1.865747137359618E+03, -2.031505677951714E+03),
        6051.8E3,
        "venus",
        scaleRotation(-243.02));

    let earth = new Body(
        5.997219E24,
        new Vec3(-2.700742859439665E+10, 1.446007021429538E+11, 9.687450725421309E+06),
        new Vec3(-2.977044214085218E+04, -5.568042062189587E+03, 3.960050738736065E-01),
        6371E3,
        "earth",
        scaleRotation(0.997));

    let moon = new Body(
        7.3477E22,
        new Vec3(-2.739180166063208E+10, 1.445252142564551E+11, -5.966407747305930E+06),
        new Vec3(-2.951549140447329E+04, -6.529794009827214E+03, -7.615838122417218E+01),
        1737.1E3,
        "moon",
        scaleRotation(27.32));

    let mars = new Body(
        6.4171E23,
        new Vec3(1.983824543369704E+11, 7.422924065611902E+10, -3.334840409383859E+09),
        new Vec3(-7.557626093692695E+03, 2.476126524795820E+04, 7.047458490385097E+02),
        3389.5E3,
        "mars",
        scaleRotation(1.026));

    let jupiter = new Body(
        1.8986E27,
        new Vec3(-7.496501784210088E+11, -3.201712382617047E+11, 1.811158433718784E+10),
        new Vec3(4.982523623046754E+03, -1.141782925514267E+04, -6.466474051600457E+01),
        69911E3,
        "jupiter",
        scaleRotation(0.41));

    let saturn  = new Body(
        5.6836E26,
        new Vec3(1.082806087546906E+12, 8.510840726181986E+11, -5.793487583371094E+10),
        new Vec3(-6.487121289267689E+03, 7.565952106845154E+03, 1.254418330224025E+02),
        58232E3,
        "saturn",
        scaleRotation(0.426));

    let uranus = new Body(
        8.681E25,
        new Vec3(-2.724615970786758E+12, -2.894019317704620E+11, 3.428824015831023E+10),
        new Vec3(6.712348901080567E+02, -7.099101277978575E+03, -3.528579247809205E+01),
        25362E3,
        "uranus",
        scaleRotation(-0.71833));

    let neptune = new Body(
        1.0243E26,
        new Vec3(-2.328070851258000E+12, -3.891087698123372E+12, 1.337439832412817E+11),
        new Vec3(4.633959234836657E+03, -2.767419818371484E+03, -4.957409060715667E+01),
        24622E3,
        "neptune",
        scaleRotation(0.671));

    let pluto = new Body(
        1.305E22,
        new Vec3(-4.551131153197412E+12, 3.175396482377141E+11, 1.282172026454296E+12),
        new Vec3(6.354565491262041E+02, -5.762636149150082E+03, 4.409493397386148E+02),
        1186E3,
        "pluto",
        scaleRotation(-6.387));


    let bodies = [sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune, pluto];

    let scaleRadius = rad => Math.pow(rad, 1/4) * 0.2;

    for (let b of bodies) {
        b.rad = scaleRadius(b.rad);
    }

    return {
        bodies: bodies,
        stepsize: stepsize,
        stepsPerFrame: 1 ,
        scalePosition: vec => vec.multiplyScalar(1 * 1E-09),
        camera: {x: 0, y: 0, z: 1300},
        collisions: false,
        sunOn: sunOn,
        sphereP: 32,
        boundary: 1E13,
        counter: "date"
    };
}

export function gen2Bodies(sunOn) {
    let s1 = new Body(1E19, new Vec3(0, 0, 0), new Vec3(0, -90, 0), 12, "sun", new Vec3(0, 0, randomRot()));
    let s2 = new Body(1E18, new Vec3(200, 0, 0), new Vec3(0, 900, 0), 8, "earth", new Vec3(0, 0, randomRot()));
    let bodies = [s1, s2];

    return {
        bodies: bodies,
        stepsize: 0.000005,
        stepsPerFrame: 300,
        camera: {x: 0, y: 0, z: 250},
        collisions: false,
        sunOn: sunOn,
        sphereP: 32,
        boundary: 2000
    };
}

export function gen3Bodies(sunOn) {
    let s1 = new Body(1E19, new Vec3(0, 0, 0), new Vec3(0, 2, 0), 12, "sun", new Vec3(0, 0, randomRot()));
    let s2 = new Body(1E18, new Vec3(200, 0, 0), new Vec3(0, 900, 0), 8, "venus", new Vec3(0, 0, randomRot()));
    let s3 = new Body(1E18, new Vec3(-200, 0, 0), new Vec3(0, -900, 0), 8, "earth", new Vec3(0, 0, randomRot()));
    let bodies = [s1, s2, s3];

    return {
        bodies: bodies,
        stepsize: 0.000003,
        stepsPerFrame: 300,
        camera: {x: 0, y: 0, z: 250},
        collisions: false,
        sunOn: sunOn,
        sphereP: 32,
        boundary: 2000
    };
}

export function genBodies(n, bodyTexture, sunOn, collisions) {

    if (!bodyTexture){allTextures = [];}
    let bodies = [];

    for (let i = 0; i < n; i++) {
        let posVec = new Vec3(getRandomInt(-300,300), getRandomInt(-300,300), getRandomInt(-300,300));
        let velVec = new Vec3(getRandomInt(-500,500), getRandomInt(-500,500), getRandomInt(-500,500));
        let rotation = new Vec3(0, randomRot(), 0);
        let radius = (Math.random() * (15)) + 4;


        bodies.push(new Body((radius^3)*1E15, posVec, velVec, radius, getRandomFromList(textureSets.solar), rotation));
    }

    return {
        bodies: bodies,
        stepsize: 0.001,
        stepsPerFrame: 1,
        camera: {x: 0, y: 0, z: 400},
        collisions: collisions,
        sunOn: sunOn,
        sphereP: 32,
        boundary: 2000
    };
}

export function genBodiesRot(n, bodyTexture, sunOn, collisions) {
    let textureSet = textureSets[bodyTexture];
    let bodies = [];

    let angMomVec = new Vec3(0,4,0);

    bodies.push(new Body(1E18, new Vec3(0, 0, 0), new Vec3(0, 0, 0), 12, "sun",
                         new Vec3(0, 0.01, 0)));
    for (let i = 0; i < n; i++) {
        let posVec = new Vec3(getRandomInt(-300,300), getRandomInt(-300,300), getRandomInt(-300,300));
        let velVec = new Vec3(0,0,0);
        let rotation = new Vec3(0, randomRot(), 0);
        let size = (Math.random() * (15)) + 4;
        velVec.crossVectors(posVec, angMomVec).multiplyScalar(Math.random() + .1);
        bodies.push(new Body(size*1E14, posVec, velVec, size, getRandomFromList(textureSet), rotation));
    }

    return {
        bodies: bodies,
        stepsize: 0.0005,
        stepsPerFrame: 1,
        camera: {x: 0, y: 0, z: 400},
        collisions: collisions,
        sunOn: sunOn,
        sphereP: 32,
        boundary: 2000
    };
}

function ThreeBodyPlanarPeriodicOrbit(x1d, y1d) {

    let f = () => {
        let m = 1 / calc.G;
        let [t1, t2, t3] = getRandomSample(textureSets.all, 3);
        let s1 = new Body(m, new Vec3(-1, 0, 0), new Vec3(x1d, y1d, 0), 0.05, t1, new Vec3(0, randomRot(), 0));
        let s2 = new Body(m, new Vec3(-s1.r.x, 0, 0), new Vec3(s1.v.x, s1.v.y, 0), 0.05, t2, new Vec3(0, randomRot(), 0));
        let s3 = new Body(m, new Vec3(0, 0, 0), new Vec3(-2 * s1.v.x, -2 * s1.v.y), 0.05, t3, new Vec3(0, randomRot(), 0));

        return {
            bodies: [s1, s2, s3],
            // stepsize: 0.00002,
            // stepsPerFrame: 300,
            stepsize: 0.00002,
            stepsPerFrame: 5000,
            camera: {x: 0, y: 0, z: 2},
            collisions: false,
            boundary: 2000
        };
    };

    return f;
}

// systems from http://arxiv.org/abs/1303.0181
export let genButterFly1 = ThreeBodyPlanarPeriodicOrbit(0.30689, 0.12551);
export let genButterFly2 = ThreeBodyPlanarPeriodicOrbit(0.39295, 0.09758);
export let genBumblebee = ThreeBodyPlanarPeriodicOrbit(0.18428, 0.58719);
export let genMoth1 = ThreeBodyPlanarPeriodicOrbit(0.46444, 0.39606);
export let genMoth2 = ThreeBodyPlanarPeriodicOrbit(0.43917, 0.45297);
export let genButterfly3 = ThreeBodyPlanarPeriodicOrbit(0.40592, 0.23016);
export let genMoth3 = ThreeBodyPlanarPeriodicOrbit(0.38344, 0.37736);
export let genGoggles = ThreeBodyPlanarPeriodicOrbit(0.08330, 0.12789);
export let genButterfly4 = ThreeBodyPlanarPeriodicOrbit(0.350112, 0.07934);
export let genDragonfly = ThreeBodyPlanarPeriodicOrbit(0.08058, 0.58884);
export let genYarn = ThreeBodyPlanarPeriodicOrbit(0.55906, 0.34919);
export let genYinYang1 = ThreeBodyPlanarPeriodicOrbit(0.51394, 0.30474);
export let genYinYang2 = ThreeBodyPlanarPeriodicOrbit(0.41682, 0.33033);


function loadTextures(textureName, textOn, bumpOn, specOn) {
    let fullTexture = {};
    let loader = new THREE.TextureLoader();
    if (textOn) {
        let texture = loader.load("textures/" + textureName + "map.jpg" );
        texture.minFilter = THREE.LinearFilter;
        fullTexture.texture = texture;
    }
    if (bumpOn) {
        let bumpMap = loader.load("textures/" + textureName + "bump.jpg");
        bumpMap.minFilter = THREE.LinearFilter;
        fullTexture.bumpMap = bumpMap;
    }
    if (specOn) {
        let specularMap = loader.load("textures/" + textureName + "specular.jpg");
        specularMap.minFilter = THREE.LinearFilter;
        fullTexture.specularMap = specularMap;
    }

    return fullTexture;
}


function getRandomFromList(list) {
    return list[getRandomInt(0, list.length)];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}                               // from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomSample(list, n) {
    // get n unique random elements from list
    let l = [];
    while (l.length < n) {
        let e = getRandomFromList(list);
        if (l.indexOf(e) === -1) {
            l.push(e);
        }
    }
    return l;
}
