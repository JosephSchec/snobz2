import logo from './images/logo.png';
import './styles.css';
import './output.json';
require("babel-polyfill");
(async function () {
    const output = await fetch('./output.json');
    try {
        if (!output.ok) {
            throw new Error('NOT OK OUTPUT.JSON');
        }
        const data = await output.json();
        let list = document.getElementById('listIcon');
        list.addEventListener('click', function (e) {
            /***Stops autoreload */
            e.preventDefault();
            /***Empty Middle */
            let middleS = document.getElementById("size");
            middleS.classList.forEach(el => { middleS.classList.remove(el); });
            /**Removes the leaflet controls and all additional children after clicking list again  */

            for (let i = 0; i < 7; i++) {
                middleS.childNodes.forEach((item) => { middleS.removeChild(item); });
            }
            middleS.style.backgroundColor = 'white';
            middleS.style.backgroundImage = `url('${logo}')`;
            document.body.style.backgroundImage = `url('${logo}')`;


            /****Create Continents */
            data.forEach(element => {
                if (!document.getElementById(`${element.Continent}`) && middleS.childNodes.length < 6) {
                    let cont = document.createElement('div');
                    cont.id = `${element.Continent}`;

                    cont.innerHTML = `${element.Continent}   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
               </svg>`;
                    cont.classList.add('p-4', 'border', 'w-50', 'bg-dark', 'text-white', 'text-center', 'd-inline-block');


                    cont.style.height = '5em';
                    cont.style.opacity = '.95';
                    cont.style.cursor = "pointer";
                    middleS.appendChild(cont);
                }
                document.body.style.overflow = 'hidden';
            });


            middleS.childNodes.forEach(contButton => {
                contButton.addEventListener('click', function () {
                    window.scrollTo(0, 0);
                    for (let i = 0; i < 8; i++) {
                        middleS.childNodes.forEach(item => { middleS.removeChild(item); });
                    }
                    let container = document.createElement('div');
                    container.id = 'regContainer';
                    middleS.appendChild(container);
                    container.classList.add('row', 'align-content-start', 'w-100', 'h-100', 'm-1', 'mt-0', 'mb-5', 'pt-0', 'pb-5');

                    /********Regions *************/
                    data.forEach(dataCont => {
                        if (contButton.id === dataCont.Continent && !document.getElementById(`${dataCont.Region}`)) {
                            let region = document.createElement('div');
                            region.id = `${dataCont.Region}`;
                            region.innerHTML = `${dataCont.Region}   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                          </svg>`;

                            region.classList.add('p-4', 'border', 'w-50', 'bg-dark', 'text-white', 'text-center', 'd-inline-block');
                            region.style.opacity = '.95';
                            region.style.height = '5em';
                            region.style.cursor = "pointer";
                            container.appendChild(region);
                            /**Last one in North America allowing for bottom to be higher */
                            if (region.id === 'Wyoming' || region.id === 'Wales') {
                                let extend = document.createElement('div');
                                extend.classList.add('p-4', 'w-25', 'd-inline-block');
                                extend.id = 'extend';
                                extend.style.margin = '6em';
                                container.appendChild(extend);
                            }

                            document.body.style.overflow = 'scroll';
                        }
                    });

                    /*******cities *******/
                    let contain = document.getElementById('regContainer');
                    contain.childNodes.forEach(regionBut => {
                        regionBut.addEventListener('click', function () {
                            window.scrollTo(0, 0);
                            middleS.childNodes.forEach(item => { middleS.removeChild(item); });

                            let cityContainer = document.createElement('div');
                            cityContainer.id = 'cityContainer';
                            middleS.appendChild(cityContainer);
                            cityContainer.classList.add('row', 'align-content-start', 'w-100', 'h-100', 'm-1', 'mt-0', 'mb-5', 'pt-0', 'pb-5');

                            data.forEach(dataReg => {
                                if (regionBut.id === dataReg.Region && !document.getElementById(`${dataReg.City}`)) {
                                    let city = document.createElement('div');
                                    city.id = `${dataReg.City}`;
                                    city.innerHTML = `${dataReg.City}   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>`;

                                    city.classList.add('p-4', 'border', 'w-50', 'bg-dark', 'text-white', 'text-center', 'd-inline-block');
                                    city.style.opacity = '.95';
                                    city.style.height = '5em';
                                    city.style.cursor = "pointer";
                                    cityContainer.appendChild(city);


                                    document.body.style.overflow = 'scroll';
                                }
                            });

                            /*******Shops *******/
                            let cityContain = document.getElementById('cityContainer');
                            cityContain.childNodes.forEach(cityBut => {
                                cityBut.addEventListener('click', function () {
                                    window.scrollTo(0, 0);
                                    middleS.childNodes.forEach(item => { middleS.removeChild(item); });

                                    let shopContainer = document.createElement('div');
                                    shopContainer.id = 'shopContainer';
                                    middleS.appendChild(shopContainer);
                                    shopContainer.classList.add('row', 'align-content-start', 'w-100', 'h-100', 'm-1', 'mt-0', 'mb-5', 'pt-0', 'pb-5');

                                    data.forEach(dataCity => {
                                        if (cityBut.id === dataCity.City && !document.getElementById(`${dataCity.Name}`)) {
                                            let shop = document.createElement('button');
                                            shop.id = `${dataCity.Name}`;
                                            shop.textContent = `${dataCity.Name}`;

                                            shop.classList.add('p-4', 'border', 'w-50', 'bg-dark', 'text-white', 'text-center', 'd-inline-block');
                                            shop.style.opacity = '.95';
                                            shop.style.height = '5em';
                                            shop.style.cursor = "pointer";
                                            shopContainer.appendChild(shop);
                                            document.body.style.overflow = 'hidden';
                                        }
                                        /*******Spec Shops *******/
                                        let shopContain = document.getElementById('shopContainer');
                                        shopContain.childNodes.forEach(shopBut => {

                                            shopBut.addEventListener('click', function () {
                                                // middleS.childNodes.forEach(item => { middleS.removeChild(item); });
                                                /***********CUT CODE HERE  */

                                                if (document.getElementById(`specShop`) && document.getElementById(`specShop`).style.display === 'none') {
                                                    for (let i = 0; i < 8; i++) {
                                                        if (document.getElementById(`specShop`).parentNode === middleS) {
                                                            middleS.removeChild(document.getElementById(`specShop`));
                                                        }
                                                        else if (document.getElementById(`specShop`).parentNode === document.body) {
                                                            document.body.removeChild(document.getElementById(`specShop`));
                                                        }
                                                    }
                                                }
                                                if (!document.getElementById(`specShop`)) {
                                                    shopBut.setAttribute('data-bs-toggle', 'modal');
                                                    shopBut.setAttribute('data-bs-target', '#specShop');
                                                    let specificShop = document.createElement('div');
                                                    specificShop.id = 'specShop';
                                                    specificShop.classList.add('modal', 'fade');
                                                    specificShop.setAttribute('aria-labelledby', 'modalLabel');
                                                    specificShop.setAttribute('aria-hidden', 'true');
                                                    specificShop.tabIndex = "-1";

                                                    let dialog = document.createElement('div');
                                                    dialog.classList.add('modal-dialog', 'modal-dialog-centered');
                                                    let content = document.createElement('div');
                                                    content.classList.add('modal-content');
                                                    /**********Header */
                                                    let header = document.createElement('div');
                                                    header.classList.add('modal-header');
                                                    let headerContent = document.createElement('h5');
                                                    headerContent.classList.add('modal-title');
                                                    headerContent.id = 'modalLabel';

                                                    let closeBut = document.createElement('button');
                                                    closeBut.type = "button";
                                                    closeBut.classList.add('btn-close');
                                                    closeBut.setAttribute('data-bs-dismiss', 'modal');
                                                    closeBut.setAttribute('aria-label', 'Close');
                                                    header.appendChild(closeBut);
                                                    header.appendChild(headerContent);
                                                    content.appendChild(header);
                                                    /*********Body */
                                                    let modalBody = document.createElement('div');
                                                    modalBody.classList.add('fs-3', 'text-center', 'p-3');
                                                    let bodyLogo = document.createElement('img');
                                                    bodyLogo.width = '250';
                                                    let bodyContent = document.createElement('article');
                                                    data.forEach(shop => {
                                                        if (shopBut.id === shop.Name) {
                                                            bodyLogo.src = `${shop.Logo}`;
                                                            bodyLogo.onerror = () => { bodyLogo.src = "" }
                                                            bodyContent.innerHTML = `${shop.Name}<br>${shop.City},${shop.Region}<br>
                                                            <a href=${shop.Link} target=_blank>Visit Here</a>`;
                                                        }
                                                    });
                                                    modalBody.appendChild(bodyLogo);
                                                    modalBody.appendChild(bodyContent);
                                                    content.appendChild(modalBody);

                                                    dialog.appendChild(content);
                                                    specificShop.appendChild(dialog);
                                                    middleS.appendChild(specificShop);

                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
}());