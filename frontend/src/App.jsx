import { useEffect, useState } from "react";
import Calendar from "./Calendar"
import Floaters from "./Floaters";
import Colors from "./Colors";
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal'

const colors = {
	"CSC207": "#8E7AB5",
	"MAT237": "#B784B7",
	"CSC236": "#E493B3",
	"STA237": "#EEA5A6"
}

function App() {
	const [selectedDay, setSelectedDay] = useState("");
	const [tasks, setTasks] = useState([]);
	
	useEffect(() => {
		// addTask()
		fetchTasks();
	}, []);

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const handleOpenCreateModal = (day) => {
		setIsCreateModalOpen(true);
		setSelectedDay(day);
	}
	const handleCloseCreateModal = () => setIsCreateModalOpen(false);

	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [updateModalTask, setUpdateModalTask] = useState({});

	const handleOpenUpdateModal = (taskData) => {
		setIsUpdateModalOpen(true);
		setUpdateModalTask(taskData);
	}
	const handleCloseUpdateModal = () => {
		setUpdateModalTask(0);
		setIsUpdateModalOpen(false);
	}

	const fetchTasks = async() => {
		const apiResponse = await fetch("http://127.0.0.1:5000/read/list_tasks");
		const data = await apiResponse.json();
		setTasks(data.tasks);
	}

	const onCreateModalClose = () => {
		handleCloseCreateModal();
		fetchTasks();
	}

	const onUpdateModalClose = () => {
		handleCloseUpdateModal();
		fetchTasks();
	}

	const addTask = async() => {
		const data = {
			"name": "Learn React",
			"time_start": "2024-06-01T04:00:00.000Z",
			"time_end": "2024-06-07T21:19:06.158Z",
			"tags": ["Learning"],
			"course_code": "Self"
		}
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}
		const response = await fetch(`http://127.0.0.1:5000/create/task`, options)
		if (response.status === 201) {
			alert("Success!");
		} else {
			alert(response);
		}
	}

	const deleteTask = async() => {
		const options = {
			method: "DELETE"
		}
		const response = await fetch(`http://127.0.0.1:5000/delete/task/5`, options)
		if (response.status === 200) {
			alert("Success!");
		} else {
			alert(response);
		}
	}

	return (
		<>
			<Calendar tasks={tasks} handleOpenCreateModal={handleOpenCreateModal} handleOpenUpdateModal={handleOpenUpdateModal}/>
			<Floaters tasks={tasks}/>
			<Colors colors={colors}/>
			<CreateModal show={isCreateModalOpen} onCreateModalClose={onCreateModalClose} selectedDay={selectedDay} />
			<UpdateModal show={isUpdateModalOpen} updateModalTask={updateModalTask} onUpdateModalClose={onUpdateModalClose} />
		</>
	)
}
export default App;