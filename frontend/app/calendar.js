const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

import { gotoAppointment } from "./main.js";

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
                    <!-- Calendar dates will be generated here by JavaScript -->
                </tbody>
            </table>
        </div>
        <div class="booking-form">
            <h2>Book Date and Time</h2>
            <form class="form" id="booking-form">
                <label for="selected-date">Date:</label>
                <input type="text" id="selected-date" readonly>
                <label for="time-slot">Time Slot:</label>
                <select class="select" id="time-slot">
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                </select>
                <button class="defaultBtn" type="submit">Submit</button>
            </form>
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
        appointment.time = timeSlot;
        //console.log(appointment)
        gotoAppointment("/confirm", appointment)
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
                cell.innerHTML = date;
                cell.classList.add('date-cell');
                cell.dataset.date = date; // Store the date in the dataset
                cell.addEventListener('click', selectDate);
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

function selectDate(event) {
    document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
    event.target.classList.add('selected');
    const date = event.target.dataset.date; // Retrieve the date from the dataset
    document.getElementById('selected-date').value = `${monthNames[currentMonth]} ${date}, ${currentYear}`;
}
