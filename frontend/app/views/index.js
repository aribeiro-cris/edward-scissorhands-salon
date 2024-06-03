import {goto} from "../main.js";

export function index(container){
    const title = document.createElement("h1");
    title.innerText = "Welcome to Scissorhands Salon";
    title.classList.add("firstpage-title");

    const anchorGoogleMaps = document.createElement("a");
    anchorGoogleMaps.innerText = "Click here to check the address";
    anchorGoogleMaps.classList.add("anchorGoogleMaps");

    anchorGoogleMaps.addEventListener("click", event => {
        event.preventDefault();

        goto("/google-map")
    });


    const question = document.createElement("h2");
    question.innerText = "Would you like to craft your perfect look with us?";

    const divAnchor = document.createElement("div");
    divAnchor.setAttribute("id", "btn");

    const anchorAccept = document.createElement("a");
    const anchorDenied = document.createElement("a");
    const imgAccept = document.createElement("img");
    imgAccept.src ="./assets/img/edward-happy-face-ai.png"
    imgAccept.alt = "Eduard happy face";
    const imgDenied = document.createElement("img");
    imgDenied.src = "./assets/img/edward-sad-face-ai.png";
    imgDenied.alt = "Eduard sad face";

    anchorAccept.appendChild(imgAccept);
    anchorDenied.appendChild(imgDenied);

    divAnchor.appendChild(anchorAccept);
    divAnchor.appendChild(anchorDenied);

    container.appendChild(title)
    container.appendChild(anchorGoogleMaps);
    container.appendChild(question)
    container.appendChild(divAnchor)

    anchorAccept.addEventListener("click", event => {
        event.preventDefault();

        goto("/form")
    })
    anchorDenied.addEventListener("click", event => {
        event.preventDefault();

        //goto("/reject")
        goto ("/management")
    })

}