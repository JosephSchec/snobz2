(async function () {
    'use strict';

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

    let L = window.L;
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


    function createPin(lat, lng) {
        return L.marker([lat, lng]).addTo(map);
    }
    function createTool(pin, words) {
        return pin.bindTooltip(words, { direction: 'top', offset: [-15, -10] });
    }


    /*************** create pin and tooltip for each item in json *******************/
    async function placePins() {
        document.getElementById('homeIcon').classList.add('active');
        const output = await fetch("output.json");
        try {
            if (!output.ok) {
                throw new Error('NOT OK OUTPUT.JSON');
            }
            const data = await output.json();

            let middle = document.getElementById("map");

            let offCanv = document.createElement('div');
            offCanv.classList.add('offcanvas', 'offcanvas-end', 'pt-5');
            offCanv.tabIndex = -1;
            offCanv.id = 'offcanvasRight';
            offCanv.setAttribute('aria-labelledby', "offcanvasRightLabel");
            middle.appendChild(offCanv);

            if (window.innerWidth < 600) {
                let closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.classList.add('btn', 'btn-close', 'top-0');
                closeButton.setAttribute('data-bs-dismiss', 'offcanvas');
                closeButton.setAttribute('aria-label', 'Close');
                offCanv.appendChild(closeButton);
            }

            /*********************Title Bar****************** */
            let offCanvHead = document.createElement('div');
            offCanvHead.classList.add('offcanvas-header', 'justify-content-center');
            offCanv.appendChild(offCanvHead);

            let title = document.createElement('h1');
            title.id = 'title';
            title.classList.add('text-decoration-underline');
            offCanvHead.appendChild(title);


            /****************Body****************** */
            let offCanvBody = document.createElement('div');
            offCanvBody.classList.add('offcanvas-body');
            offCanv.appendChild(offCanvBody);

            /**********Image */
            let img = document.createElement('img');
            img.width = '150';
            img.id = 'img';

            offCanvBody.appendChild(img);

            /********City********* */
            let city = document.createElement('p');
            city.id = 'city';
            city.classList.add('fs-3', 'd-block');
            offCanvBody.appendChild(city);

            /****Region********* */
            let region = document.createElement('p');
            region.id = 'region';
            region.classList.add('fs-3', 'd-block');
            offCanvBody.appendChild(region);

            /***Continent****** */
            let continent = document.createElement('p');
            continent.id = 'continent';
            continent.classList.add('fs-3', 'd-block');
            offCanvBody.appendChild(continent);
            /********Link********* */
            let link = document.createElement('a');
            link.classList.add('fs-3', 'd-inline-block');
            link.id = 'link';
            offCanvBody.appendChild(link);

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
                    let setT = document.getElementById('title');
                    setT.innerText = `${element.Name}`;

                    let setImg = document.getElementById('img');
                    setImg.src = `${element.Logo}`;

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
    if (window.innerWidth < 600) {
        let controller = document.querySelector('.leaflet-control-container');
        controller.style.visibility = 'hidden';
    } else {
        let topControl = document.querySelector('.leaflet-top');
        topControl.classList.add('mt-5', 'pt-3');
    }


    let mapIcon = document.getElementById('mapIcon');
    mapIcon.addEventListener('click', async  ()=> {
        await placePins();
        getCurr();
    });
}());