function populateCalendarMini() {
    const calendarMini = document.getElementById("minicalendar");
    const currentDateMini = new Date();
    const currentYearMini = currentDateMini.getFullYear();
    const currentMonthMini = currentDateMini.getMonth();

    const calendarHeadingMini = document.getElementById("minimonthheading");
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

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

window.onload = populateCalendarMini;