import Ephemeris from './deps/ephemeris-1.2.1.bundle.js';

let getLocation = () => new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject));

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

        const ephemeris = new Ephemeris({
            year: 2024,
            month: 7,
            day: 15,
            hours: 16,
            minutes: 20,
            latitude: lat,
            longitude: long,
            calculateShadows: false,
        });

        console.log(ephemeris.Results);


    } catch (e) {
        console.log('ERROR');
        console.log(e.message);
    }
};

main();



