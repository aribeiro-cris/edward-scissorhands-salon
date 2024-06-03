//DELETE API KEY before publishing on github
const API_KEY = ""; //add here your api_key

export async function imageGeneratorAi(textToImage){
   
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
