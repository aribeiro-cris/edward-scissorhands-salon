export const addAppointment = async (event, appointment) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/edward/api/edward", {
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

/*
const getAppointments = async (event, appointment) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/edward/api/edward",

)
}
*/