export default function(){
    let middle = document.getElementById("map");

    let offCanv = document.createElement('div');
    offCanv.classList.add('offcanvas', 'offcanvas-end', 'pt-5');
    offCanv.tabIndex = -1;
    offCanv.id = 'offcanvasRight';
    offCanv.setAttribute('aria-labelledby', "offcanvasRightLabel");
    middle.appendChild(offCanv);

    if (window.innerWidth < 1000) {
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
    /********Directions********* */
    let directions = document.createElement('a');
    directions.classList.add('fs-3', 'd-block');
    directions.id = 'directions';
    offCanvBody.appendChild(directions);
}