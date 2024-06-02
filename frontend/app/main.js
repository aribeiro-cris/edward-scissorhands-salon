import { calendarHtml } from "./calendar.js";
import {imageGeneratorAi } from "./ai-api.js";
import { addAppointment } from "./fetch-api.js";

//Mapping urls
const mapping = [
    {url:"/", page: index},
    {url:"/form", page: form},
    {url:"/confirm", page: confirms},
    {url:"/calendar", page: calendar},
    {url:"/reject", page: reject}
]

render();
window.addEventListener('popstate',render);


function index(container){
    const title = document.createElement("h1");
    title.innerText = "Welcome to Scissorhands Saloon";
    title.classList.add("firstpage-title");
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
    container.appendChild(question)
    container.appendChild(divAnchor)

    anchorAccept.addEventListener("click", event => {
        event.preventDefault();

        goto("/form")
    })
    anchorDenied.addEventListener("click", event => {
        event.preventDefault();

        goto("/reject")
    })

}

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
        calendar(container, object)
    }
    if(url === "/confirm"){
        confirms(container, object)
    }
    
}

function render(){
    const currentUrl = document.location.pathname;
    //console.log(currentUrl)

    const map = mapping.find(element => element.url === currentUrl);

    //needs this default method check
    if(!map){
        goto("/");
        return;
    }

    const container = document.getElementById("container");
    container.innerHTML = "";

    map.page(container);

}

function form(container){
    const title = document.createElement("h1");
    title.innerText = "Schedule Your Appointment with Edward";
    container.appendChild(title);

    const formDiv = document.createElement("div");
    const form = document.createElement("form");
    form.classList.add("form");
    form.method = "post";

    const name = document.createElement("label");
    name.innerText = "Name";
    name.classList.add("form-label");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.pattern = ".*\\S.*";
    nameInput.title = "Please add your name.";
    nameInput.required = true;
    nameInput.minLength = 3;

    form.appendChild(name);
    form.appendChild(nameInput);

    const phone = document.createElement("label");
    phone.innerText = "Phone number";
    phone.classList.add("form-label");

    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.pattern = "[0-9]{9}";
    phoneInput.title = "Please provide a valid phone number.";
    phoneInput.required = true;

    form.appendChild(phone);
    form.appendChild(phoneInput);

    const service = document.createElement("label");
    service.innerText = "Services available";
    service.classList.add("form-label");

    const serviceInput = document.createElement("select");
    serviceInput.required = true;
    serviceInput.classList.add("select");
    const serviceInputOptionNull = document.createElement("option")
    serviceInputOptionNull.innerText = "--Select option--";
    serviceInputOptionNull.value = "";

    const serviceInputOption1 = document.createElement("option");
    serviceInputOption1.innerText = "Styling";

    const serviceInputOption2 = document.createElement("option");
    serviceInputOption2.innerText = "Coloring";

    const serviceInputOption3 = document.createElement("option");
    serviceInputOption3.innerText = "Haircut";

    const serviceInputOption4 = document.createElement("option");
    serviceInputOption4.innerText = "Styling & Coloring";

    const serviceInputOption5 = document.createElement("option");
    serviceInputOption5.innerText = "Styling & Haircut";

    const serviceInputOption6 = document.createElement("option");
    serviceInputOption6.innerText = "Coloring & Haircut";

    const serviceInputOption7 = document.createElement("option");
    serviceInputOption7.innerText = "Styling, Coloring & Haircut";

    serviceInput.appendChild(serviceInputOptionNull);
    serviceInput.appendChild(serviceInputOption1);
    serviceInput.appendChild(serviceInputOption2);
    serviceInput.appendChild(serviceInputOption3);
    serviceInput.appendChild(serviceInputOption4);
    serviceInput.appendChild(serviceInputOption5);
    serviceInput.appendChild(serviceInputOption6);
    serviceInput.appendChild(serviceInputOption7);

    form.appendChild(service);
    form.appendChild(serviceInput);

    const dateBtn = document.createElement("button");
    dateBtn.type = "submit";

    dateBtn.innerText = "Choose date and time";

    dateBtn.addEventListener("click", event =>{
        event.preventDefault();

        if (form.checkValidity()) {
        
        //let appointment = {
        const appointment = {
            name_client: nameInput.value,
            phone_client: phoneInput.value,
            serviceType: serviceInput.value.toUpperCase(),
            date: "",
            hour: "",
            comment: ""
        };

        console.log(appointment);

        gotoAppointment("/calendar", appointment);

        } else {
            form.reportValidity();
        }
    });

    const btnGoBack = document.createElement("button");
    btnGoBack.innerText = "Cancel";
    btnGoBack.setAttribute("id", "cancelBtn");

    btnGoBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/");

    });

    form.appendChild(dateBtn);
    form.appendChild(btnGoBack);

    formDiv.appendChild(form);

    container.appendChild(formDiv);
}

function confirms(container, appointment){

    //delete later
    console.log("confirms");
    console.log(appointment);

    //confirm appointment
    const confirmation = document.createElement("h1");
    confirmation.innerText = "Congratulations, " + appointment.name_client + "! You have sucessfully booked a " + appointment.serviceType.toLowerCase() + " on " + appointment.date + " at " + appointment.hour + ". Get ready to elevate your look!";
    confirmation.classList.add("text-confirmation");

    container.appendChild(confirmation);

    const imageGenerator = document.createElement("div");
    imageGenerator.classList.add("containerComment");
    
    const comment = document.createElement("label");
    comment.innerText = "Edward is looking for inspiration for your " + appointment.serviceType.toLowerCase() + ". Could you please describe your preferences briefly?";
    comment.classList.add("form-label");

    const commentsInput = document.createElement("input");
    commentsInput.type = "text";
    commentsInput.required = true;
    commentsInput.classList.add("commentsInput");

    imageGenerator.appendChild(comment);
    imageGenerator.appendChild(commentsInput);

    const aiBtn = document.createElement("button");
    const img = document.createElement("img");
    img.style.maxWidth = "100%"; // Ensure the image doesn't go out of the container

    
    aiBtn.innerText = "Submit";
    aiBtn.classList.add("aiBtn");

    aiBtn.addEventListener("click", async event =>{
        event.preventDefault();

        if (commentsInput.checkValidity()) {
            const aimage = await imageGeneratorAi(commentsInput.value);
            console.log(aimage.artifacts[0].base64)
            img.src= "data:image/jpg;base64," + aimage.artifacts[0].base64;
            
            appointment.comment = commentsInput.value;
            console.log(appointment);
            const response = await addAppointment(event, appointment);
        } else {
            commentsInput.reportValidity();
        }  
    })

    imageGenerator.appendChild(aiBtn);
    imageGenerator.appendChild(img);
    container.appendChild(imageGenerator);
}

function calendar(container, appointment){
    console.log("calendar");
    calendarHtml(container, appointment);
}

function reject() {
    const title = document.createElement("h1");
    title.innerText = "Oh, we are so sad to see you go. Please get back later.";
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
