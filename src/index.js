import './styles.css';
import './output.json';
import offcCnvas from './offcanvas';
let L = require('leaflet');
require("leaflet_css");
require("leaflet_marker");
(async function () {
    // marker.bindPopup("popupContent").openPopup();
    // marker2.bindTooltip("my tooltip text",{ direction:'top', offset:[-15,-10]}).openTooltip();
    // let hereLat = 40.06075726817605;
    // let hereLng = -74.23877181437477;
    let usLat = 37.090200;
    let usLng = -95.712900;

    function getCurr() {
        navigator.geolocation.getCurrentPosition(changeView);
    }
    function customView(lat, lng) {
        map.setView([lat, lng], 8);
    }
    function changeView(pos) {
        if (window.innerWidth < 600) {
            map.setView([pos.coords.latitude, pos.coords.longitude], 8);
        } else {
            map.setView([pos.coords.latitude, pos.coords.longitude], 10);
        }
    }
    /********* Map, Pin and ToolTip Setup  **************************/

    let map = L.map('map', {
        center: [usLat, usLng],
        zoom: 3,
        maxBounds: [
            [-90, -180],
            [90, 180]
        ]
    });
    map.setMinZoom(3);
    map.setMaxZoom(17);
    getCurr();
    var layer = new L.tileLayer(/*"https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=l0Cgdm8UqMhiSQyp5Ov7"*/
        /*"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" */
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            noWrap: true,
        });
    layer.addTo(map);
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    function createPin(lat, lng) {
        return L.marker([lat, lng]).addTo(map);
    }
    function createTool(pin, words) {
        return pin.bindTooltip(words, { direction: 'top', offset: [-15, -10] });
    }


    /*************** create pin and tooltip for each item in json *******************/
    async function placePins() {
        document.getElementById('homeIcon').classList.add('active');
        const output = await fetch('./output.json');
        try {
            if (!output.ok) {
                throw new Error('NOT OK OUTPUT.JSON');
            }
            const data = await output.json();


            data.forEach(element => {
                let lat = element.LatLong.split(',')[0];
                let lng = element.LatLong.split(',')[1];
                let coffeePin = createPin(Number(lat), Number(lng));
                let setPin = createTool(coffeePin, element.Name);
                let clicked = setPin.getElement();
                clicked.setAttribute('data-bs-toggle', 'offcanvas');
                clicked.setAttribute('data-bs-target', '#offcanvasRight');
                clicked.setAttribute('aria-controls', 'offcanvasRight');

                clicked.addEventListener('click', function () {
                    offcCnvas();
                    let setT = document.getElementById('title');
                    setT.innerText = `${element.Name}`;

                    let setImg = document.getElementById('img');
                    setImg.src = `${element.Logo}`;
                    setImg.onerror = () => { setImg.src = ""; }

                    let setCity = document.getElementById('city');
                    setCity.innerHTML = `<span>City : </span> <br/> ${element.City}`;

                    let setRe = document.getElementById('region');
                    setRe.innerHTML = `<span>State/ Province/ Country : </span> <br/> ${element.Region}`;

                    let setCont = document.getElementById('continent');
                    setCont.innerHTML = `<span>Continent : </span> <br/> ${element.Continent}<br/><br/><span>Link : </span> `;

                    let setLink = document.getElementById('link');
                    setLink.innerHTML = (` ${element.Name}`);
                    setLink.href = `${element.Link}`;
                    setLink.target = '_blank';

                });


                let search = document.getElementById('search');

                /***Search bar */

                search.onclick = ((e) => {
                    e.preventDefault();
                    data.forEach(store => {
                        try {
                            const searchElem = document.getElementById('search-text').value.toLowerCase().trim();
                            if (store.Name.toLowerCase().trim() === searchElem ||
                                store.City.toLowerCase().trim() === searchElem ||
                                store.Region.toLowerCase().trim() === searchElem) {
                                let newLat = store.LatLong.split(',')[0];
                                let newLng = store.LatLong.split(',')[1];
                                customView(newLat, newLng);
                            }
                        } catch (err) {
                            alert("Sorry Can't Find What You Are Looking For ... Please Check Your Spelling or Perhaps Give Feedback");
                        }
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }


    /************* After Loading Pins And Get Location     ************************/
    await placePins();
    getCurr();

    let controller = document.querySelector('.leaflet-control-container');
    controller.style.visibility = 'hidden';



    let mapIcon = document.getElementById('mapIcon');
    mapIcon.addEventListener('click', async () => {
        await placePins();
        getCurr();
    });
}());