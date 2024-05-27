//Mapping urls
const mapping = [
    {url:"/", page: index},
    {url:"/form", page: form},
    {url:"/confirm", page: confirms},
    {url:"/appointment", page: appointment},
]

render();
window.addEventListener('popstate',render);


function index(container){
    const title = document.createElement("h1");
    title.innerText = "Edward Hair Saloon";
    const question = document.createElement("h2");
    question.innerText = "Do you want to book an appointment?";

    const divAnchor = document.createElement("div");
    divAnchor.setAttribute("id", "btn");
    const anchorAccept = document.createElement("a");
    const anchorDenied = document.createElement("a");
    const imgAccept = document.createElement("img");
    imgAccept.src ="./assets/img/Smile.jpg"
    const imgDenied = document.createElement("img");
    imgDenied.src = "./assets/img/sad.png";

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

        goto("/")
    })

}

function goto(url){
    //redirect to the correct page
    const map = mapping.find(element => element.url === url)

    if(!map){
        goto("/");
        return;
    }


    window.history.pushState("","", url);
    render();
}

function render(){
    const currentUrl = document.location.pathname;
    console.log(currentUrl)

    const map = mapping.find(element => element.url === currentUrl)

    const container = document.getElementById("container");
    container.innerHTML = "";

    map.page(container)

}

function form(container){
    const title = document.createElement("h1");
    title.innerText = "Appointment with Edward";
    container.appendChild(title);

    const formDiv = document.createElement("div");
    const form = document.createElement("form");
    form.classList.add("form");
    form.method = "post";

    const name = document.createElement("label");
    name.innerText = "Your name";
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
    phone.innerText = "Your phone number";
    phone.classList.add("form-label");

    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.pattern = "[0-9]{9}";
    phoneInput.title = "Please provide a valid phone number.";
    phoneInput.required = true;

    form.appendChild(phone);
    form.appendChild(phoneInput);

    const service = document.createElement("label");
    service.innerText = "What services do you want?";
    service.classList.add("form-label");

    const serviceInput = document.createElement("select");
    
    const serviceInputOption1 = document.createElement("option");
    serviceInputOption1.innerText = "Styling";

    const serviceInputOption2 = document.createElement("option");
    serviceInputOption2.innerText = "Coloring";

    const serviceInputOption3 = document.createElement("option");
    serviceInputOption3.innerText = "Haircut";

    serviceInput.appendChild(serviceInputOption1);
    serviceInput.appendChild(serviceInputOption2);
    serviceInput.appendChild(serviceInputOption3);

    form.appendChild(service);
    form.appendChild(serviceInput);

    const date = document.createElement("label");
    date.innerText = "Time and date for your appointment with Mr. Edward";
    date.classList.add("form-label");

    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";

    //need to find alternative option to this
    dateInput.addEventListener('input', function() {
        const event = new Date(this.value);
        const hours = event.getHours();
        const mins = event.getMinutes();

        if(hours >= 18 || hours < 10) {
            alert("Appointment can only be booked between 10am and 6pm.");
            //this.value = "";
            return;
        }

        if(!mins == 30 || !mins == 0) 
            {
                alert("Appointment can only be booked every half hour.");
                return;
            }
    });

    form.appendChild(date);
    form.appendChild(dateInput);

    const comments = document.createElement("label");
    comments.innerText = "Any comments that you want to share with Mr.Edward?";
    comments.classList.add("form-label");

    const commentsInput = document.createElement("input");
    commentsInput.type = "text";    

    form.appendChild(comments);
    form.appendChild(commentsInput);

    const submitForm = document.createElement("button");
    submitForm.innerText = "Submit";

    form.appendChild(submitForm);
    formDiv.appendChild(form);

    container.appendChild(formDiv);
}

function confirms(container){
    console.log("container")
}
function appointment(container){
    console.log("appointment")
}