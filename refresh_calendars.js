const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
const prevMonth = document.getElementById("monthbtn1");
const nextMonth = document.getElementById("monthbtn2");

const currentDateMini = new Date();
let currentYearMini = currentDateMini.getFullYear();
let currentMonthMini = currentDateMini.getMonth();
const prevMonthMini = document.getElementById("minimonthbtn1");
const nextMonthMini = document.getElementById("minimonthbtn2");

prevMonth.addEventListener("click", function() {
    currentMonth--; 
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    triggerBothRefresh();
});

nextMonth.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    triggerBothRefresh();
});


function triggerBothRefresh() {
    // Refresh big calendar
    const calendar = document.getElementById("calendar");
    const calendarHeading = document.getElementById("monthheading");
    refreshCalendar(calendar, calendarHeading, currentYear, currentMonth);
    // Refresh small calendar to match big one 
    let currentYearMini = currentYear;
    let currentMonthMini = currentMonth;
    const calendarMini = document.getElementById("minicalendar");
    const calendarHeadingMini = document.getElementById("minimonthheading");
    refreshCalendar(calendarMini, calendarHeadingMini, currentYearMini, currentMonthMini);
}

prevMonthMini.addEventListener("click", function() {
    currentMonthMini--; 
    if (currentMonthMini < 0) {
        currentMonthMini = 11;
        currentYearMini--;
    }
    const calendarMini = document.getElementById("minicalendar");
    const calendarHeadingMini = document.getElementById("minimonthheading");
    refreshCalendar(calendarMini, calendarHeadingMini, currentYearMini, currentMonthMini);
});

nextMonthMini.addEventListener("click", function() {
    currentMonthMini++;
    if (currentMonthMini > 11) {
        currentMonthMini = 0;
        currentYearMini++;
    }
    const calendarMini = document.getElementById("minicalendar");
    const calendarHeadingMini = document.getElementById("minimonthheading");
    refreshCalendar(calendarMini, calendarHeadingMini, currentYearMini, currentMonthMini);
});


function refreshCalendar(calendar, calendarHeading, currentYear, currentMonth) {
    const currentDate = new Date(currentYear, currentMonth, 1)
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    calendarHeading.innerText = monthName + ' ' + year;

    const lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let date = 1;
    const tbody = calendar.querySelector('tbody'); // table body
    tbody.innerHTML = ''; // clear previous content

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth) {  // empty cells before the start of the month
                cell.classList.add('blank');
                cell.textContent = '';
            } else if (date > lastDayOfMonth) {  // empty cells after the end of the month
                cell.textContent = '';
                break;
            } else {
                cell.textContent = date;
                date++;
            }
            row.appendChild(cell); // add cell to row
        }
        tbody.appendChild(row);
    }
}

// function refreshCalendarMini() {
    
//     const currentDateMini = new Date(currentYearMini, currentMonthMini, 1)
//     const monthNameMini = currentDateMini.toLocaleString('default', { month: 'long' });
//     const yearMini = currentDateMini.getFullYear();
//     calendarHeadingMini.innerText = monthNameMini + ' ' + yearMini;

//     const lastDayOfMonthMini = getLastDayOfMonth(currentYearMini, currentMonthMini);
//     const firstDayOfMonthMini = new Date(currentYearMini, currentMonthMini, 1).getDay();

//     let date = 1;
//     const tbody = calendarMini.querySelector('tbody'); // table body
//     tbody.innerHTML = ''; // clear previous content

//     for (let i = 0; i < 6; i++) {
//         const row = document.createElement('tr');
//         for (let j = 0; j < 7; j++) {
//             const cell = document.createElement('td');
//             if (i === 0 && j < firstDayOfMonthMini) {  // empty cells before the start of the month
//                 cell.classList.add('blank');
//                 cell.textContent = '';
//             } else if (date > lastDayOfMonthMini) {  // empty cells after the end of the month
//                 cell.textContent = '';
//                 break;
//             } else {
//                 cell.textContent = date;
//                 date++;
//             }
//             row.appendChild(cell); // add cell to row
//         }
//         tbody.appendChild(row);
//     }
// }