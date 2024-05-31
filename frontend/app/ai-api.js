//DELETE API KEY before publishing on github
const API_KEY = "sk-eGEExWhw7cwk9kQy0GnOOwbPU79TIC9THC5NRzNex3BgQ5IT"; //api_key from Andreia

//CODE TO DELETE
/*import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
  prompt: "Lighthouse on a cliff overlooking the ocean",
  output_format: "webp"
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/stable-image/generate/core`,
  axios.toFormData(formData, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: { 
      Authorization: `sk-6fIswIj3jQsfo1kIF8W8iWKzqDTTbX0g71UVAvUgbKGgPUVK`, 
      Accept: "image/*" 
    },
  },
);

if(response.status === 200) {
  fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}*/

//CODE TO DELETE
export async function imageGeneratorAi(){
    /*let formD = new FormData();
    formD.append("prompt", "Lighthouse on a cliff overlooking the ocean")
    formD.append('output_format', "jpeg")
    */
    const formD={
    prompt: "Lighthouse on a cliff overlooking the ocean",
    output_format: "webp"
    };

    /*const formD = {
        prompt: 'Lighthouse on a cliff overlooking the ocean',
        output_format: 'jpeg'
    }*/
   // console.log(formD)
   //const contentDisposition = `webboundary  Content-Disposition: " ${formD.prompt}"; name="prompt";   webboundary  Content-Disposition: " ${formD.output_format}"; name="output_format";   webboundary`;
   

    const param = {
        method: 'POST',
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: { 
        Authorization: `sk-6fIswIj3jQsfo1kIF8W8iWKzqDTTbX0g71UVAvUgbKGgPUVK`, 
        //'Content-Type': 'multipart/form-data',
        'Content-Type': 'multipart/form-data; boundary="--webboundary"',
        Accept: "image/*", 
        'Content-Disposition' : formD,
        //'Content-Disposition' : contentDisposition,
        //Accept: "application/json" 
        },
        //body: JSON.stringify(formD)
    }
    console.log(param)

    const response = await fetch(
    `https://api.stability.ai/v2beta/stable-image/generate/core`, param)
    
    const data = await response.json()
    console.log(data)

    /*if(response.status === 200) {
    fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
    } else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
    }*/

}

export async function imageGeneratorAiOld(textToImage){
   
    const param = {
        method: 'POST',
        headers: { 
        Authorization: `Bearer ${API_KEY}`, 
        'Content-Type': 'application/json',
        Accept: "application/json", 

        },
        body: JSON.stringify({
            text_prompts: [
                {
                  text: textToImage,
                },
              ],
              cfg_scale: 7,
              //height: 1024,
              //width: 1024,
              height: 512,
              width: 512,
              steps: 30,
              samples: 1,
        })
    }
    const url = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image'
    const response = await fetch(url, param)
    
    const data = await response.json()
    console.log(data)
    return data;

}
