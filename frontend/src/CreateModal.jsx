import { useState } from 'react';
import './CreateModal.css'
import Tags from './Tags';


export default function CreateModal({ show, onClose }) {
    const [name, setName] = useState("");
    const [numberOfTasks, setNumberOfTasks] = useState(1);
    const [description, setDescription] = useState("");
    const [gradeWeight, setGradeWeight] = useState(0);
    const [gradeAchieved, setGradeAchieved] = useState(0);
    const [courseCode, setCourseCode] = useState("");
    const [status, setStatus] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [tags, setTags] = useState([]);

    const getStatusStyle = () => {
        switch (status) {
            case 'TODO':
                return 'todo';
            case 'IN_PROGRESS':
                return 'in-progress';
            case 'DONE':
                return 'done';
            default:
                return '';
        }
    };
    
    const addTask = async(e) => {
        e.preventDefault()
        const data = {
            "name": name,
            "description": description,
            "grade_weight": gradeWeight,
            "grade_achieved": gradeAchieved,
            "course_code": courseCode,
            "status": status,
            "time_start": timeStart,
            "time_end": timeEnd,
            "tags": tags
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`http://127.0.0.1:5000/create/task`, options)
        const response_data = await response.json()
        alert(response_data.message);
        
    }

    if (!show) {
        return null;
    }
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* prevents clicks inside the modal content from triggering anything behind it */}
            <div className="modal" onClick={e => e.stopPropagation()}> 
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
            <div>
                <h3>Create task(s)</h3>
                <p>The only required field is "Name of task", everything else is optional.</p>
                <form className="create-form" onSubmit={addTask}>
                    <div className="horizontal-group">
                        <div>
                            <label htmlFor="name">Name of task:</label>
                            <input
                                type="text"
                                id="name"
                                required="true"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* <div>
                            <label htmlFor="number_of_tasks">Number of tasks to create:</label>
                            <input
                                type="number"
                                min="1" max="50"
                                id="numberOfTasks"
                                value="1"
                                onChange={(e) => setNumberOfTasks(e.target.value)}
                            />
                        </div> */}
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            type="text"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3" cols="50"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="grade_weight">Grade weight:</label>
                        <input
                            type="number"
                            min="1" max="100"
                            id="grade_weight"
                            onChange={(e) => setGradeWeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="course_code">Course code:</label>
                        <input
                            type="text"
                            id="course_code"
                            onChange={(e) => setCourseCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <select id="status" name="status" 
                                onChange={(e) => setStatus(e.target.value)}
                                className={getStatusStyle()}>
                            <option value="TODO">Todo</option>
                            <option value="IN_PROGRESS">In progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="time_start">Task start time:</label>
                        <input
                            type="datetime-local"
                            id="time_start"
                            value={timeStart}
                            onChange={(e) => setTimeStart(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="time_end">Task deadline:</label>
                        <input
                            type="datetime-local"
                            id="time_end"
                            value={timeEnd}
                            onChange={(e) => setTimeEnd(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <Tags tags={tags} setTags={setTags} />
                    </div>
                    <br></br>
                    <br></br>
                    <button type="submit">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}