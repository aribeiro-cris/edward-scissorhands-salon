//import { appListFetch } from "./fetch-api";

export async function list (container){

const appList = await appListFetch();



appList.forEach(element => {
    const div = document.createElement ("div");
    const nameh2 = document.createElement ("h2");
    const nameh3 = document.createElement ("h3");
    const phoneh2 = document.createElement ("h2");
    const phoneh3 = document.createElement ("h3");
    const serviceh2 = document.createElement ("h2");
    const serviceh3 = document.createElement ("h3");
    const hourh2 = document.createElement ("h2");
    const hourh3 = document.createElement ("h3");
    const dateh2 = document.createElement ("h2");
    const dateh3 = document.createElement ("h3");
    const commenth2 = document.createElement ("h2");
    const commenth3 = document.createElement ("h3");
   
    nameh2.innerText = "Name";
    nameh3.innerText = element.name_client;
    phoneh2.innerText = "Phone";
    phoneh3.innerText = element.phone_client;
    serviceh2.innerText = "Service Type";
    serviceh3.innerText = element.serviceType;
    hourh2.innerText = "Hour";
    hourh3.innerText = element.hour;
    dateh2.innerText = "Date";
    dateh3.innerText = element.date;
    commenth2.innerText = "Comment";
    commenth3.innerText = element.comment;
    div.appendChild (nameh2);
    div.appendChild (nameh3);
    div.appendChild (phoneh2);
    div.appendChild (phoneh3);
    div.appendChild (serviceh2);
    div.appendChild (serviceh3);
    div.appendChild (hourh2);
    div.appendChild (hourh3);
    div.appendChild (dateh2);
    div.appendChild (dateh3);
    div.appendChild (commenth2);
    div.appendChild (commenth3);

container.appendChild (div);

});


}