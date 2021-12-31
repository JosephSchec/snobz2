(function () {
    'use strict';
    let about = document.getElementById('about');
    about.addEventListener('click', function (e) {
        /***Stops autoreload */
        e.preventDefault();
        /***Empty Middle */
        document.getElementById('offcanvas').classList.remove('show', 'modal-backdrop');
        let backdrop = document.body.querySelector('.modal-backdrop');
        backdrop.classList.remove('show', 'modal-backdrop');

        document.getElementById('search').style.visibility = 'hidden';
        document.getElementById('search-text').style.visibility = 'hidden';

        let middleS = document.getElementById("size");

        middleS.classList.forEach(el => { middleS.classList.remove(el); });
        for (let i = 0; i < 7; i++) {
            middleS.childNodes.forEach((item) => { middleS.removeChild(item); });
        }
        about.classList.add('active');
        let hoke = document.getElementById('homeIcon');
        hoke.classList.remove('active');

        document.body.style.backgroundImage = 'none';
        middleS.style.backgroundImage = 'none';
        middleS.style.backgroundColor = 'white';
        let container = document.createElement('div');
        container.className = 'container-fluid';
        middleS.appendChild(container);

        let row = document.createElement('div');
        row.classList.add('row', 'justify-content-center');
        container.appendChild(row);

        let image = document.createElement('img');
        image.src = 'images/logo.png';
        image.classList.add('m-sm-0', 'mt-sm-5', 'm-lg-5', 'p-sm-0', 'p-lg-5', 'col-md-6', 'col-lg-4');
        image.style.filter = 'drop-shadow(-7px 4px 4px #656178)';
        row.appendChild(image);

        let aboutBody = document.createElement('div');
        aboutBody.classList.add('m-sm-0', 'mt-sm-5', 'm-lg-5', 'p-sm-0', 'pe-sm-3', 'col-sm-6', 'col-lg-4', 'align-self-center', 'text-center');
        row.appendChild(aboutBody);

        let head = document.createElement('h1');
        head.textContent = 'Snobz';
        aboutBody.appendChild(head);

        let subHead = document.createElement('h2');
        subHead.textContent = 'Directory of third-wave, specialty coffee roasters and shops.';
        aboutBody.appendChild(subHead);

        let body = document.createElement('p');
        body.textContent = `Third-wave coffee is a term used to described quality specialty coffee. We love our small-batch
    local coffees made with passion and love. The coffee roasters and shops on this list were hand picked
    by the official Coffee SNOBZ. If you have any recommendations use the feedback button.`;
        aboutBody.appendChild(body);

        let returnHome = document.createElement('button');
        returnHome.textContent = 'Return To Home';
        returnHome.onclick = (() => location.href = 'index.html');
        returnHome.classList.add('btn', 'bg-danger', 'text-light', 'w-25', 'mt-3', 'mb-5', 'm-sm-0');
        if (window.innerWidth < 600) {
            returnHome.style.visibility = 'hidden';
        } else {
            returnHome.style.visibility = 'visible';
        }
        aboutBody.appendChild(returnHome);

        middleS.style.overflow = 'auto';

    });
}());