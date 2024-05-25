const currentDateMini = new Date();
let currentYearMini = currentDateMini.getFullYear();
let currentMonthMini = currentDateMini.getMonth();
const prevMonthMini = document.getElementById("minimonthbtn1");
const nextMonthMini = document.getElementById("minimonthbtn2");

prevMonthMini.addEventListener("click", function() {
    currentMonthMini--; 
    if (currentMonthMini < 0) {
        currentMonthMini = 11;
        currentYearMini--;
    }
    refreshCalendarMini();
});

nextMonthMini.addEventListener("click", function() {
    currentMonthMini++;
    if (currentMonthMini > 11) {
        currentMonthMini = 0;
        currentYearMini++;
    }
    refreshCalendarMini();
});

function refreshCalendarMini() {
    const calendarMini = document.getElementById("minicalendar");
    const calendarHeadingMini = document.getElementById("minimonthheading");
    const currentDateMini = new Date(currentYearMini, currentMonthMini, 1)
    const monthNameMini = currentDateMini.toLocaleString('default', { month: 'long' });
    const yearMini = currentDateMini.getFullYear();
    calendarHeadingMini.innerText = monthNameMini + ' ' + yearMini;

    const lastDayOfMonthMini = getLastDayOfMonth(currentYearMini, currentMonthMini);
    const firstDayOfMonthMini = new Date(currentYearMini, currentMonthMini, 1).getDay();

    let date = 1;
    const tbody = calendarMini.querySelector('tbody'); // table body
    tbody.innerHTML = ''; // clear previous content

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonthMini) {  // empty cells before the start of the month
                cell.classList.add('blank');
                cell.textContent = '';
            } else if (date > lastDayOfMonthMini) {  // empty cells after the end of the month
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