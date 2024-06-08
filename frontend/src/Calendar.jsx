import React, { useState } from "react";
import "./Calendar.css";
import Day from "./Day"

export default function Calendar({ tasks, handleOpenModal }) {

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

	const isSameDay = (date1, date2) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
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
			const namedTasks = tasks.filter((task) => { // used to figure out which tasks to display the name of
				const taskEnd = new Date(task.time_end);
				const taskStart = new Date(task.time_start);
				const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
				return isSameDay(taskEnd, currentDay) || isSameDay(taskStart, currentDay);
			});
			
			const barTasks = tasks.filter((task) => {
				const taskEnd = new Date(task.time_end);
				const taskStart = new Date(task.time_start);
				taskStart.setHours(0, 0, 0, 0); // round to start of the day
				taskEnd.setHours(0, 0, 0, 0); // round to end of day
				const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
				currentDay.setHours(0, 0, 0, 0);
				const inRange = taskStart < currentDay && currentDay < taskEnd;
				return inRange;
			});
		
			days.push(
				<Day key={`day-${i}`}namedTasks={namedTasks} barTasks={barTasks} i={i}  handleOpenModal={handleOpenModal} />
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
		<>	
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
		</>	
  	);
}
