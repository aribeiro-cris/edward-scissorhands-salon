export function edit(){
    const title = document.createElement("h1");
    title.innerText = "Appointments information to edit";
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


    const btnGoBack = document.createElement("button");
    btnGoBack.innerText = "Cancel";
    btnGoBack.setAttribute("id", "cancelBtn");

    btnGoBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/management");

    });

    form.appendChild(btnGoBack);

    formDiv.appendChild(form);

    container.appendChild(formDiv);
}