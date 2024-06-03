import { goto } from "../main.js";

export function initMap() {
    console.log("Google Maps API testing");

    const title = document.createElement("h2");
    title.innerText = "Scissorhands Salon Address";
    container.appendChild(title);

    const addressTitle = document.createElement("h3");
    addressTitle.innerText = "Rua do Doutor Eduardo Santos Silva," + "\nHipercentro - Armazém N, " + "\nPorto 4200-283";
    container.appendChild(addressTitle);

    const mapDiv = document.createElement("div");
    mapDiv.setAttribute("id", "map");
    mapDiv.style.height = "400px";
    mapDiv.style.width = "100%";

    const map = new google.maps.Map(mapDiv, {
        center: { lat: 41.1579, lng: -8.6291 }, // Coordinates for Porto
        zoom: 12
    });

    const marker = new google.maps.Marker({
        position: { lat: 41.17857455824021, lng: -8.586959639625881 }, //position of the specific address;
        title: "This is Scissorhands Salon Address",
    });

    marker.setMap(map); //add the marker to the map

    container.appendChild(mapDiv);

    const btnGoBack = document.createElement("button");
    btnGoBack.innerText = "Go back";
    btnGoBack.setAttribute("id", "cancelBtn");

    btnGoBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/");

    });

    container.appendChild(btnGoBack);
}