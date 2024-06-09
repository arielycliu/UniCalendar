import { useState } from 'react';
import './Modal.css'
import Tags from './Tags';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function CreateModal({ show, onCreateModalClose, selectedDay }) {
    if (!show) {
        return null;
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gradeWeight, setGradeWeight] = useState(0);
    const [gradeAchieved, setGradeAchieved] = useState(0);
    const [courseCode, setCourseCode] = useState("");
    const [status, setStatus] = useState("");
    const [timeStart, setTimeStart] = useState(dayjs(selectedDay));
    const [timeEnd, setTimeEnd] = useState(dayjs(selectedDay));
    const [tags, setTags] = useState([]);
    const [hasTime, setHasTime] = useState(false);

    const getStatusStyle = () => {
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
    
    const addTask = async(e) => {
        e.preventDefault()
        const data = {
            "name": name,
            "description": description,
            "grade_weight": gradeWeight,
            "grade_achieved": gradeAchieved,
            "course_code": courseCode,
            "status": status,
            "time_start": hasTime ? timeStart : null,
            "time_end": hasTime ? timeEnd : null,
            "tags": tags
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`http://127.0.0.1:5000/create/task`, options)
        const response_data = await response.json()
        // Add error checking if 404 or 500 etc
        onCreateModalClose();
    }

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setHasTime(checked);
        if (!checked) {
            setTimeStart(null);
            setTimeEnd(null);
        } else {
            setTimeStart(dayjs(selectedDay));
            setTimeEnd(dayjs(selectedDay));
        }
    };
    
    return (
        <div className="modal-overlay" onClick={onCreateModalClose}>
            {/* prevents clicks inside the modal content from triggering anything behind it */}
            <div className="modal" onClick={e => e.stopPropagation()}> 
            <button className="close-button" onClick={onCreateModalClose}>
                &times;
            </button>
            <div>
                <h3>Create task(s)</h3>
                <p>The only required field is "Name of task", everything else is optional.</p>
                <form className="create-form" onSubmit={addTask}>
                    <div>
                        <label htmlFor="name">Name of task:</label>
                        <input
                            type="text"
                            id="name"
                            required={true}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            min="0" max="100"
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
                            <option value="IN PROGRESS">In progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="has_time">Add start/end times:</label>
                        <input
                            type="checkbox"
                            id="has_time"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    {hasTime && (
                        <>
                            <div>
                                <label htmlFor="time_start">Task start time:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={timeStart}
                                        onChange={(newTime) => setTimeStart(newTime)}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <label htmlFor="time_end">Task deadline:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={timeEnd}
                                        onChange={(newTime) => setTimeEnd(newTime)}
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <Tags tags={tags} setTags={setTags} />
                    </div>
                    <br></br>
                    <br></br>
                    <button className="create-btn" type="submit">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}