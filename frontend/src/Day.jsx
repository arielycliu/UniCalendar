import { useState } from 'react';
import './Day.css'

export default function Day ({ namedTasks, barTasks, i, handleOpenModal }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <>
            <div 
                className="calendar-day" key={`day-${i}`}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenModal}
            >
					<div className="day-number">{i}</div>
					<div className="day-tasks">
						{
							namedTasks.map((task) => (
								<div key={`named-${task.id}`} className="task-spanner">
									{task.name}
								</div>
							))
						}
						{
							barTasks.map((task) => (
								<div key={`bar-${task.id}`} className="task-spanner-extended">
								</div>
							))
						}
					</div>
					{isHovered && <div className="create-task">Create task</div>}
            </div>
        </>
    );
};