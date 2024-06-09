import { useState } from 'react';
import './Day.css'

export default function Day ({ namedTasks, barTasks, i, handleOpenCreateModal, handleOpenUpdateModal }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

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
								<div key={`named-${task.id}`} className="task-spanner" onClick={() => handleOpenUpdateModal(task)}>
									{task.name}
								</div>
							))
						}
						{
							barTasks.map((task) => (
								<div key={`bar-${task.id}`} className="task-spanner-extended" onClick={() => handleOpenUpdateModal(task)}>
								</div>
							))
						}
					</div>
					{isHovered && <div onClick={handleOpenCreateModal} className="create-task">Create task</div>}
            </div>
        </>
    );
};