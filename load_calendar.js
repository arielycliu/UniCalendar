function populateCalendar(calendar, calendarHeading) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

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

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

window.onload = function() {
    let calendar = document.getElementById("calendar");
    let calendarHeading = document.getElementById("monthheading");

    populateCalendar(calendar, calendarHeading);

    calendar = document.getElementById("minicalendar");
    calendarHeading = document.getElementById("minimonthheading");

    populateCalendar(calendar, calendarHeading);
};
