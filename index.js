// TODO: figure out how to import using ES6 imports
// import Ephemeris from './deps/ephemeris-1.2.1.bundle.js';

let getLocation = () => new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject));

const motionBar = document.querySelector('#motion-bar');


async function main() {
    try {
        console.log('getting location...');
        let location = await getLocation();
        console.log('got location');
        console.log(location);
        let lat = location.coords.latitude;
        let long = location.coords.longitude;
        console.log(lat, long);
        console.log("accuracy: ", location.coords.accuracy);
        // lat/long for birth place - testing
        lat = 40.733550;
        long = -74.008660;

        // NOTE - months go from 0 - 11 (0 = jan)
        const ephemeris = new Ephemeris.default({
            year: 1988,
            month: 3,
            day: 28,
            hours: 8,
            minutes: 11,
            latitude: lat,
            longitude: long,
            calculateShadows: false,
        });

        console.log(`${ephemeris.Observer.latitude} lat, ${ephemeris.Observer.longitude} long`);
        console.log(ephemeris.Results);
        console.log('mercury retrograde: ', ephemeris.mercury.motion.isRetrograde);

        const planetRetro = {
            'mercury': ephemeris.mercury.motion.isRetrograde,
            'venus': ephemeris.venus.motion.isRetrograde,
            'mars': ephemeris.mars.motion.isRetrograde,
            'jupiter': ephemeris.jupiter.motion.isRetrograde,
            'saturn': ephemeris.saturn.motion.isRetrograde,
            'neptune': ephemeris.neptune.motion.isRetrograde,
            'uranus': ephemeris.uranus.motion.isRetrograde,
            'pluto': ephemeris.pluto.motion.isRetrograde,
        };

        console.log(planetRetro);

        sortPlanet(planetRetro);



    } catch (e) {
        console.log('ERROR');
        console.log(e.message);
    }
};

main();


function sortPlanet(obj) {
    const retroSet = [], directSet = [];
    for (const [planet, isRetrograde] of Object.entries(obj)) {
        if (isRetrograde) {
            retroSet.push(planet);
        } else {
            directSet.push(planet);
        }
    }
    console.log(`directSet: ${directSet}`);
    console.log(`retroSet: ${retroSet}`);



    setMotionBar();

};


function setMotionBar() {
    for (let i = 0; i < 8; i++) {
        const segment = document.createElement("div");
        segment.setAttribute("class", "segment");
        motionBar.appendChild(segment);
    };
}
