const url = "http://localhost:8081/edward/api/appointment";

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


export const getAppointments = async (event, appointment) => {

    const response = await fetch(url);

    const data = await response.json();
    return DATE_HOURS(data);
}

const DATE_HOURS = response => response.map(appointment => ({
        date: appointment.date,
        hour: appointment.hour
    })
);