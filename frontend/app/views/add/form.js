import { gotoAppointment, goto } from "../../main.js";
const arrayservice = ["Styling", "Haircut","Coloring", "Styling & Coloring","Styling & Haircut","Coloring & Haircut","Styling & Coloring & Haircut"];

export function form(container){
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

    selectpopulate(serviceInput)

    form.appendChild(service);
    form.appendChild(serviceInput);

    const dateBtn = document.createElement("button");
    dateBtn.type = "submit";

    dateBtn.innerText = "Choose date and time";

    dateBtn.addEventListener("click", event =>{
        event.preventDefault();

        if (form.checkValidity()) {
        
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

function selectpopulate(select){

    arrayservice.forEach(element => {
        const option = document.createElement ("option")
        option.innerText = element;
        select.appendChild (option);
    });
}