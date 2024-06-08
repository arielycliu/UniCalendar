import { useEffect, useState } from "react";
import Calendar from "./Calendar"
import Floaters from "./Floaters";
import Colors from "./Colors";
import CreateModal from './CreateModal';

const colors = {
	"CSC207": "#8E7AB5",
	"MAT237": "#B784B7",
	"CSC236": "#E493B3",
	"STA237": "#EEA5A6"
}

function App() {

	const [tasks, setTasks] = useState([]);
	
	useEffect(() => {
		// addTask()
		fetchTasks();
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const fetchTasks = async() => {
		const apiResponse = await fetch("http://127.0.0.1:5000/read/list_tasks");
		const data = await apiResponse.json();
		setTasks(data.tasks);
	}

	const onModalClose = () => {
		handleCloseModal();
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
			<Calendar tasks={tasks} handleOpenModal={handleOpenModal} />
			<Floaters tasks={tasks}/>
			<Colors colors={colors}/>
			<CreateModal show={isModalOpen} onModalClose={onModalClose} />
		</>
	)
}
export default App;