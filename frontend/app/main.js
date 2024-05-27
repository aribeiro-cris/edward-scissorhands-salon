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
    console.log("form")
}

function confirms(container){
    console.log("container")
}
function appointment(container){
    console.log("appointment")
}