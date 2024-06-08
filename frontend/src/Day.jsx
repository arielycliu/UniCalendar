import { useState } from 'react';
import './Day.css'

export default function Day ({ namedTasks, barTasks, i }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <div 
                className="calendar-day" key={`day-${i}`}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
					<div className="day-number">{i}</div>
					<div className="day-tasks">
						{
							namedTasks.map((task) => (
								<div key={task.id} className="task-spanner">
									{task.name}
								</div>
							))
						}
						{
							barTasks.map((task) => (
								<div key={task.id} className="task-spanner-extended">
								</div>
							))
						}
					</div>
					{isHovered && <div className="create-task">Create task</div>}
            </div>
        </>
    );
};