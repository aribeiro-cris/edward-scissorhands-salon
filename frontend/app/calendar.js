import { getAppointments } from "./fetch-api.js";
import { gotoAppointment, goto } from "./main.js";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const availableHours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let today = new Date();


export function calendarHtml(container, appointment) {
    container.innerHTML = `
        <div class="calendar">
            <div class="header">
                <button class="defaultBtn" id="prev">Prev</button>
                <h1 id="month-year"></h1>
                <button class="defaultBtn" id="next">Next</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody id="calendar-body">

                </tbody>
            </table>
        </div>
        <div class="booking-form">
            <h2 class ="title-book-date">Book Date and Time</h2>
            <form class="form" id="booking-form">
                <label for="selected-date" class="sub-title-calendar">Date:</label>
                <input type="text" id="selected-date" readonly>
                <label for="time-slot" class="sub-title-calendar">Time Slot:</label>
                <select class="select" id="time-slot">
                
                </select>
                <button class="defaultBtn" type="submit">Submit</button>
            </form>
                <button id="cancelBtn">Cancel</button>
        </div>
    `;
    
    renderCalendar(currentMonth, currentYear);

    document.getElementById('prev').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next').addEventListener('click', () => changeMonth(1));

    document.getElementById('booking-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedDate = document.getElementById('selected-date').value;
        const timeSlot = document.getElementById('time-slot').value;
        //alert(`Booked ${selectedDate} at ${timeSlot}`);
        appointment.date = selectedDate;
        appointment.hour = timeSlot;

        console.log(appointment);
        gotoAppointment("/confirm", appointment)
    });

    const cancelBack = document.getElementById("cancelBtn");

    cancelBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/");

    });
}

export function renderCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    document.getElementById('month-year').innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.innerHTML = '';
            } else if (date > totalDays) {
                cell.innerHTML = '';
            } else {
                const cellDate = new Date(year, month, date);

                cell.innerHTML = date;
                cell.classList.add('date-cell');

                // j === 0 is sunday, j === 6 is saturday, weekends no work
                if((cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) || j === 0 || j === 6) {
                    cell.classList.add('disabled');
                } else {
                    cell.dataset.date = date; // Store the date in the dataset
                    cell.addEventListener('click', selectDate);
                }
                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function changeMonth(delta) {
    currentMonth += delta;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentMonth, currentYear);
}

async function selectDate(event) {
    let monthNumericSelected = String(currentMonth + 1).padStart(2, '0');

    document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
    event.target.classList.add('selected');
    const daySelected = (event.target.dataset.date).padStart(2, '0'); // Retrieve the date from the dataset
    document.getElementById('selected-date').value = `${daySelected}/${monthNumericSelected}/${currentYear}`;

    const time = document.getElementById('time-slot');
    time.innerHTML = "";

    const todayComparasion = String(today.getDate()).padStart(2, '0') + "/" + String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear();
    const currentHour = new Date().getHours();

    const response = await getAppointments();

    availableHours.forEach((element) => {
        const dateSelectedDate = `${daySelected}/${monthNumericSelected}/${currentYear}`;
        let timeMatch = false;
        let timePassed = false;

        //console.log(element);


        response.forEach((data) => {
            if(data.date === dateSelectedDate && data.hour === element) {
                timeMatch = true;
            }
        })
        
        if((dateSelectedDate === todayComparasion) && (currentHour > parseInt(element.split(":")) - 1)) {
            timePassed = true;
        }

        if(timeMatch === false && timePassed === false) {
            const options = document.createElement("option");
            options.value = element;
            options.innerText = element;
            time.appendChild(options);
        }
        
    });

}
