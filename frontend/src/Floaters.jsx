import { useEffect } from "react";
import "./Floaters.css";

export default function Floaters({ tasks, setTasks, handleOpenUpdateModal }) {
    const noDateTasks = tasks.filter((task) => {
		return (task.time_end === null && task.time_end === null) || (task.time_end === "" && task.time_end === "");
	});

	const getStatusStyle = (status) => {
        switch (status) {
            case 'TODO':
                return 'todo';
            case 'IN PROGRESS':
                return 'in-progress';
            case 'DONE':
                return 'done';
            default:
                return '';
        }
    };

    return (
        <>
            <div className="floating-tasks">
				<h2>Floating Tasks</h2>
				<p>Tasks with no start or end date go here</p>
				<table className="float-task-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Status</th>
							<th>Course code</th>
							<th>Tags</th>
						</tr>
					</thead>
					<tbody>
						{noDateTasks.map((task) => (
							<tr key={`floating-${task.id}`} onClick={() => handleOpenUpdateModal(task)}>
								<td>{task.name}</td>
								<td>
									<div className={getStatusStyle(task.status)}>
										{task.status}
									</div>
								</td>
								<td>{task.course_code}</td>
								<td>
									<div className="float-tags">
									{
										task.tags.map((tag, index) => (
											<li key={index} className="float-tag">{tag.tag_value}</li>
                                    	)
									)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
        </>
    )
}