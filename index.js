// TODO: figure out how to import using ES6 imports
// import Ephemeris from './deps/ephemeris-1.2.1.bundle.js';

let getLocation = () => new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject));

const motionBar = document.querySelector("#motion-bar");
const timestamp = document.querySelector("#timestamp");

async function main() {
    try {
        let location = await getLocation();
        let lat = location.coords.latitude;
        let long = location.coords.longitude;

        const date = new Date();
        const yr = date.getFullYear();
        const mo = date.getMonth();
        const dy = date.getDate();
        const hr = date.getHours();
        const min = date.getMinutes();

        const current = document.createElement("p");
        current.setAttribute("id", "current");
        timestamp.appendChild(current);
        if (mo + 1 < 10) current.innerHTML = `${yr} 0${mo + 1}`;
        else current.innerHTML = `${yr} ${mo + 1}`;
        if (dy < 10) current.innerHTML += ` 0${dy}`;
        else current.innerHTML += ` ${dy}`;


        const timeSpan = document.createElement("span");
        timeSpan.style.color = "var(--green)";
        current.appendChild(timeSpan);
        if (hr < 10) timeSpan.innerHTML = ` 0${hr}:`;
        else timeSpan.innerHTML = ` ${hr}:`;
        if (min < 10) timeSpan.innerHTML += ` 0${min}`;
        else timeSpan.innerHTML += ` ${min}`;

        const latSpan = document.createElement("span");
        latSpan.style.color = "white";
        current.appendChild(latSpan);
        latSpan.innerHTML = ` ${lat}°`;

        const longSpan = document.createElement("span");
        longSpan.style.color = "var(--green)";
        current.appendChild(longSpan);
        longSpan.innerHTML = ` ${long}°`;


        // NOTE - months go from 0 - 11 (0 = jan)
        const ephemeris = new Ephemeris.default({
            year: yr,
            month: mo,
            day: dy,
            hours: hr,
            minutes: min,
            latitude: lat,
            longitude: long,
            calculateShadows: false,
        });


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

        sortPlanet(planetRetro);


    } catch (e) {
        console.log('ERROR');
        console.log(e.message);
    }
};

main();


function sortPlanet(retroMap) {
    const retroSet = [], directSet = [];
    for (const [planet, isRetrograde] of Object.entries(retroMap)) {
        if (isRetrograde) {
            retroSet.push(planet);
        } else {
            directSet.push(planet);
        }
    }

    const planetSet = directSet.concat(retroSet);

    const planetDOMs = document.querySelectorAll('.planet');

    planetDOMs.forEach((planetDOM, idx) => {
        planetDOM.src = getIcon(`${planetSet[idx]}`);
        if (retroMap[planetSet[idx]]) {
            planetDOM.style.filter = "var(--green-filter)";
        };
    });

    setMotionBar(directSet.length + 2);
};


function setMotionBar(dSMax) {
    const mot = document.createElement("p");
    mot.setAttribute("id", "motion-text");
    mot.innerHTML = "motion";
    motionBar.appendChild(mot);

    for (let i = 0; i < 10; i++) {
        const segment = document.createElement("div");
        segment.setAttribute("class", "segment");
        motionBar.appendChild(segment);
        if (i === 0) segment.setAttribute("class", "segment one");
        if (i === 1) segment.setAttribute("class", "segment two");
        if (i > 1 && i < dSMax) {
            segment.style.backgroundColor = "#000000";
            segment.setAttribute("class", "segment direct");
        } else if (i >= dSMax) {
            segment.style.backgroundColor = "var(--green)";
            segment.setAttribute("class", "segment retro");
        }
    };

    if (dSMax > 2) {
        const dir = document.createElement("p");
        dir.setAttribute("id", "direct-text");
        dir.setAttribute("class", `three`);
        motionBar.appendChild(dir);
        if (dSMax - 2 === 1) {
            dir.innerHTML = "dir";
        } else {
            dir.innerHTML = "direct";
        }
    }

    const ret = document.createElement("p");
    ret.setAttribute("id", "retro-text");
    motionBar.appendChild(ret);
    ret.setAttribute("class", `${getPlacement(dSMax + 1)}`);
    if (dSMax === 9) {
        ret.innerHTML = "ret";
    } else if (dSMax === 8) {
        ret.innerHTML = "retro";
    } else {
        ret.innerHTML = "retrograde";
    }
};

function getPlacement(int) {
    switch (int) {
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        case 7:
            return "seven";
        case 8:
            return "eight";
        case 9:
            return "nine";
        case 10:
            return "ten";
    }
}

function getIcon(type) {
    switch (type) {
        case 'mercury':
            return './assets/mercury.svg';
        case 'venus':
            return './assets/venus.svg';
        case 'mars':
            return './assets/mars.svg';
        case 'jupiter':
            return './assets/jupiter.svg';
        case 'saturn':
            return './assets/saturn.svg';
        case 'neptune':
            return './assets/neptune.svg';
        case 'uranus':
            return './assets/uranus.svg';
        case 'pluto':
            return './assets/pluto.svg';
    }
}
