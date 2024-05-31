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

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data;
};
