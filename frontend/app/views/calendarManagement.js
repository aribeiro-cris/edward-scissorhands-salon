import { appListFetch} from "../services/fetch-api.js";
import {goto, gotoManagement} from "../main.js";

import { monthNames, daysInMonth} from "../services/constCalendar.js";

export let currentMonth = new Date().getMonth();
export let currentYear = new Date().getFullYear();

export let today = new Date();

export async function list (container){
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
    <table id="appointments"></table>

    <button id="cancelBtn">Cancel</button>
`;
    renderCalendarManagement (currentMonth,currentYear);
    document.getElementById('prev').addEventListener('click', () => changeMonthManagement(-1));
    document.getElementById('next').addEventListener('click', () => changeMonthManagement(1));

    cancelBtn();
}

function renderCalendarManagement(month, year) {
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
                    cell.addEventListener('click', selectDateManagement);
                }
                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

async function selectDateManagement(event) {
    let monthNumericSelected = String(currentMonth + 1).padStart(2, '0');

    document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
    event.target.classList.add('selected');
    const daySelected = (event.target.dataset.date).padStart(2, '0'); // Retrieve the date from the dataset
    
    const dateSelectedDate = `${daySelected}/${monthNumericSelected}/${currentYear}`;
    const todayComparasion = String(today.getDate()).padStart(2, '0') + "/" + String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear();
    
    const currentHour = new Date().getHours();

    const response = await appListFetch();
    const container = document.getElementById("container")

    //make a function that calls another function to create a table, for reuse on the object on head create an array to send
    const table = document.getElementById("appointments")
    table.innerHTML = "";

    const header = ["","Name", "Phone", "Hours", "Comment", "Service"]
    const boolea = false;

    table.appendChild(tableCreation("thead", header, boolea))

    const tbody = document.createElement("tbody")

    response.forEach(element =>{
         
        if (element.date === dateSelectedDate){
            //if its today and select date only shows appointments after current hours
            if(todayComparasion === dateSelectedDate && currentHour < parseInt(element.hour.split(":")) - 1){
                const bool = true;
                tbody.appendChild(cellLine(objectToArray(element), bool))
            }else if(todayComparasion !== dateSelectedDate){
                //if its not today we dont need to check the hours
                const bool = true;
                tbody.appendChild(cellLine(objectToArray(element), bool))
            }

        }

    }) 
    table.appendChild(tbody)
    //container.appendChild(table)
}

function changeMonthManagement(delta) {
    currentMonth += delta;

    const table = document.getElementById("appointments")
    table.innerHTML = "";

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendarManagement(currentMonth, currentYear);
}

function tableCreation(tablepart, array, boolean){

    const table = document.createElement(tablepart);
    table.appendChild(cellLine(array, boolean))
    return table
}

function cellInsert(cellText){
    const cell = document.createElement("td");
    cell.innerText = cellText;
    return cell;
}


function cellLine(array, boolean){
    const tr = document.createElement("tr");

    tr.appendChild(cellInsert(array[1]))
    tr.appendChild(cellInsert(array[2]))
    tr.appendChild(cellInsert(array[3]))
    tr.appendChild(cellInsert(array[4]))
    tr.appendChild(cellInsert(array[5]))

    if(boolean === true){
        tr.appendChild(cellInsertBtn(array[0]))
    }else{
        tr.appendChild(cellInsert(" "))
    }

    return tr;
}

function objectToArray(object){

    const newArray =[];

    for(const [key, value] of Object.entries(object)) {
        if(key === "date"){
            //!== doesnt work ... key === "id" || 
        }else{
            newArray.push(value)
        }
        
      }

    return newArray;
}

function cellInsertBtn(cellText){
    const cell = document.createElement("td");
    cell.appendChild(btnManagement(cellText, "Cancel"));
    cell.appendChild(btnManagement(cellText, "Edit"));
    return cell;
}

function btnManagement(id, type){
    const btn = document.createElement("button");

    console.log(id)

    if(type === "Cancel"){
        //Create page for delete and Edit
        btn.innerText = type;
        //btn.classList.add("defaultBtn")
        return btn
    }else if(type ==="Edit"){
        btn.innerText = type;
        btn.addEventListener ("click", event => {
        event.preventDefault();
        gotoManagement("/edit", id);    
        })
        //btn.classList.add("defaultBtn")
        return btn
    }
}

function cancelBtn(){

    const cancelBack = document.getElementById("cancelBtn");

    cancelBack.addEventListener("click", event => {
        event.preventDefault();

        goto("/");

    });

    return cancelBack;
}
