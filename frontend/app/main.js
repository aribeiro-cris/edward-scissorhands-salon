import {calendarHtml} from "./views/Add/calendar.js";
import {list} from "./views/calendarManagement.js";
import  {form} from "./views/Add/form.js";
import  {confirms} from "./views/Add/confirm.js";
import  {index} from "./views/index.js";
import  {reject} from "./views/reject.js";
import {initMap} from "./views/maps-api.js"
import {edit} from "./views/Edit.js"
import {cancel} from "./views/cancel.js"

//Mapping urls
const mapping = [
    {url:"/", page: index},
    {url:"/form", page: form},
    {url:"/confirm", page: confirms},
    {url:"/calendar", page: calendarHtml},
    {url:"/reject", page: reject},
    {url:"/management", page: list},
    {url: "/google-map", page: initMap},
    {url: "/edit", page: initMap},
    {url: "/cancel", page: initMap}
]

render();
window.addEventListener('popstate',render);


export function goto(url){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/");
        return;
    }


    window.history.pushState("","", url);
    render();
}

export function gotoAppointment(url, object){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/");
        return;
    }


    const container = document.getElementById("container");
    container.innerHTML = "";

    window.history.pushState("","", url);
    if(url === "/calendar"){
        calendarHtml(container, object)
    }
    if(url === "/confirm"){
        confirms(container, object)
    }
    
}

function render(){
    const currentUrl = document.location.pathname;

    const map = mapping.find(element => element.url === currentUrl);

    if(!map){
        goto("/");
        return;
    }

    const container = document.getElementById("container");
    container.innerHTML = "";

    map.page(container);

}