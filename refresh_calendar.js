const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
const prevMonth = document.getElementById("monthbtn1");
const nextMonth = document.getElementById("monthbtn2");

prevMonth.addEventListener("click", function() {
    currentMonth--; 
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    refreshCalendar();
});

nextMonth.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    refreshCalendar();
});

function refreshCalendar() {
    const calendar = document.getElementById("calendar");
    const calendarHeading = document.getElementById("monthheading");
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