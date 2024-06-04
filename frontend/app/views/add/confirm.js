import {goto } from "../../main.js";
import { addAppointment} from "../../services/fetch-api.js";
import {imageGeneratorAi } from "../../services/ai-api.js";


export function confirms(container, appointment){

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
            setTimeout(() =>{
                goto("/")
            }, 30000);//30000 is seconds 30 and its too much
        } else {
            commentsInput.reportValidity();
        }  
    })

    imageGenerator.appendChild(aiBtn);
    imageGenerator.appendChild(img);
    container.appendChild(imageGenerator);
}