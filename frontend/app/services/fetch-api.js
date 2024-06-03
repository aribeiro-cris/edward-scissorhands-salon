const url = "http://localhost:8080/edward/api/appointment";

export const addAppointment = async (event, appointment) => {
    event.preventDefault();
    console.log(appointment);

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // not sure if we need this
        },
        body: JSON.stringify(appointment)
    });

    const data = await response.json();
    return data;
};


export const getAppointments = async () => {

    const response = await fetch(url);

    const data = await response.json();
    return DATE_HOURS(data);
}

const DATE_HOURS = response => response.map(appointment => ({
        date: appointment.date,
        hour: appointment.hour
    })

);


export const appListFetch = async () => {
const response = await fetch (url )
const data = await response.json();
return data;
}

export const appGet = async (id) =>{
    const urlId= url + `/${id}`
    const response= await fetch(urlId)
    const data = await response.json();
    return data
}

export const editapp = async (appointment) => {
const urlId = url + "/" + appointment.id;
console.log(appointment);
console.log(urlId);
const param = { headers: {
        'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json;charset=utf-8"  
    },
    body: JSON.stringify(appointment),
    method: "PUT"
};
const response = await fetch (urlId, param);
const data = response.json();
console.log(data);

}