import {calendarHtml} from "./views/add/calendar.js";
import {list} from "./views/calendarManagement.js";
import  {form} from "./views/add/form.js";
import  {confirms} from "./views/add/confirm.js";
import  {index} from "./views/index.js";
import  {reject} from "./views/reject.js";
import {map} from "./views/map.js";
import {edit} from "./views/edit.js";
//import {cancel} from "./views/cancel.js";

//Mapping urls
const mapping = [
    {url:"/edward", page: index},
    {url:"/edward/form", page: form},
    {url:"/edward/confirm", page: confirms},
    {url:"/edward/calendar", page: calendarHtml},
    {url:"/edward/reject", page: reject},
    {url:"/edward/management", page: list},
    {url: "/edward/google-map", page: map},
    {url: "/edward/edit", page: edit},
    //{url: "/cancel", page: cancel}
]

render();
window.addEventListener('popstate',render);


export function goto(url){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/edward");
        return;
    }


    window.history.pushState("","", url);
    render();
}

export function gotoAppointment(url, object){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/edward");
        return;
    }


    const container = document.getElementById("container");
    container.innerHTML = "";

    window.history.pushState("","", url);
    if(url === "/edward/calendar"){
        calendarHtml(container, object)
    }
    if(url === "/edward/confirm"){
        confirms(container, object)
    }
    
}

function render(){
    const currentUrl = document.location.pathname;

    const map = mapping.find(element => element.url === currentUrl);

    if(!map){
        goto("/edward");
        return;
    }

    const container = document.getElementById("container");
    container.innerHTML = "";

    map.page(container);

}
export function gotoManagement(url, object){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/edward");
        return;
    }


    const container = document.getElementById("container");
    container.innerHTML = "";

    window.history.pushState("","", url);
    if(url === "/edward/edit"){
        edit(container, object)
    }
    //if(url === "/cancel"){
    //    management(container, object)
    //}
}
