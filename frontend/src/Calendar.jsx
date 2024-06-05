import React, { useState } from "react";
import "./Calendar.css";


export default function Calendar() {
	const today = new Date();
  	const [currentDate, setCurrentDate] = useState(today);

	const weekDayOfStartDay = (curdate) => {
		const start = new Date(curdate.getFullYear(), curdate.getMonth(), 1);
		return start.getDay();
	};

	const daysInMonth = (curdate) => {
		const lastDay = new Date(curdate.getFullYear(), curdate.getMonth() + 1, 0)
		return lastDay.getDate();
	};

	const generateCalendar = () => {
		const days = [];
		const curdate = new Date(currentDate);
		curdate.setDate(1);

		const spacerDays = weekDayOfStartDay(curdate);
		const totalDays = daysInMonth(curdate);

		for (let i = 0; i < spacerDays; i++) {
			days.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
		}

		for (let i = 1; i <= totalDays; i++) {
			days.push(
			<div className="calendar-day" key={`day-${i}`}>
				{i}
			</div>
			);
		}

		return days;
	};

	const prevMonth = () => {
		const date = new Date(currentDate);
		date.setMonth(date.getMonth() - 1);
		setCurrentDate(date);
	};
	
	const nextMonth = () => {
		const date = new Date(currentDate);
		date.setMonth(date.getMonth() + 1);
		setCurrentDate(date);
	};

	return (			
		<div className="calendar">
			<div className="calendar-header-div">
				<button onClick={prevMonth} id="prevmonth">
					<img src="images/arr.png" alt="arrow" />
				</button>
				<h2>
					{currentDate.toLocaleString('default', { month: 'short' })} {currentDate.getFullYear()}
				</h2>
				<button onClick={nextMonth} id="nextmonth">
					<img src="images/arr.png" alt="arrow" />
				</button>
			</div>
			<div className="calendar-grid">
				<div className="calendar-day-name">Sun</div>
				<div className="calendar-day-name">Mon</div>
				<div className="calendar-day-name">Tue</div>
				<div className="calendar-day-name">Wed</div>
				<div className="calendar-day-name">Thu</div>
				<div className="calendar-day-name">Fri</div>
				<div className="calendar-day-name">Sat</div>
				{generateCalendar()}
			</div>
		</div>
  	);
}
