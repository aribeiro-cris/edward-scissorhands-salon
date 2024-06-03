import {goto} from "../main.js";

export function reject() {
    const title = document.createElement("h1");
    title.innerText = "Regrettably, we bid you farewell. Please consider returning at a later time.";
    container.appendChild(title);

    const btnGoBack = document.createElement("button");
    btnGoBack.innerText = "Go back";
    btnGoBack.setAttribute("id", "cancelBtn");

    btnGoBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/");

    });

    container.appendChild(btnGoBack);
}
