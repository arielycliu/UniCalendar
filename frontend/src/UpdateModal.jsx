import { useState, useEffect } from 'react';
import Tags from './Tags';
import './Modal.css';

export default function UpdateModal({ show, updateModalTask = {}, onUpdateModalClose }) {
    const [name, setName] = useState(updateModalTask.name || "");;
    const [description, setDescription] = useState(updateModalTask.description || "");
    const [gradeWeight, setGradeWeight] = useState(updateModalTask.gradeWeight || 0);
    const [gradeAchieved, setGradeAchieved] = useState(updateModalTask.gradeAchieved || 0);
    const [courseCode, setCourseCode] = useState(updateModalTask.courseCode || "");
    const [status, setStatus] = useState(updateModalTask.status || "");
    const [timeStart, setTimeStart] = useState(updateModalTask.timeStart || "");
    const [timeEnd, setTimeEnd] = useState(updateModalTask.timeEnd || "");
    const [tags, setTags] = useState(updateModalTask.tags || []);
    let transformedDateStart = '';
    let transformedDateEnd = '';

    useEffect(() => {
        if (show) {
            setName(updateModalTask.name || '');
            setDescription(updateModalTask.description || '');
            setGradeWeight(updateModalTask.gradeWeight || 0);
            setGradeAchieved(updateModalTask.gradeAchieved || 0);
            setCourseCode(updateModalTask.courseCode || '');
            setStatus(updateModalTask.status || '');
            setTimeStart(updateModalTask.timeStart || '');
            setTimeEnd(updateModalTask.timeEnd || '');
            setTags(updateModalTask.tags || []);
            if (updateModalTask.timeStart && !isNaN(new Date(updateModalTask.timeStart))) {
                transformedDateStart = new Date(updateModalTask.timeStart).toISOString().slice(0, 16);
            }
            if (updateModalTask.timeEnd && !isNaN(new Date(updateModalTask.timeEnd))) {
                transformedDateEnd = new Date(updateModalTask.timeEnd).toISOString().slice(0, 16);
            }
    
            setTimeStart(transformedDateStart);
            setTimeEnd(transformedDateEnd);
        }
    }, [updateModalTask]);

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

    const updateTask = async(e) => {
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
            "tags": tags.map(tag => tag.tag_value)
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        alert(updateModalTask.id);
        const response = await fetch(`http://127.0.0.1:5000/update/task/${updateModalTask.id}`, options)
        const response_data = await response.json()
        alert(response_data);
        onUpdateModalClose();
    }

    if (!show) {
        return null;
    }

    const transformedTags = tags.map(tag => tag.tag_value);

    return (
        <div className="modal-overlay" onClick={onUpdateModalClose}>
            {/* prevents clicks inside the modal content from triggering anything behind it */}
            <div className="modal" onClick={e => e.stopPropagation()}> 
            <button className="close-button" onClick={onUpdateModalClose}>
                &times;
            </button>
            <div>
                <h3>Update task</h3>
                <form className="update-form" onSubmit={updateTask}>
                    <div>
                        <label htmlFor="name">Name of task:</label>
                        <input
                            type="text"
                            id="name"
                            required={true}
                            value={name}
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
                            value={description}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="grade_weight">Grade weight:</label>
                        <input
                            type="number"
                            min="0" max="100"
                            id="grade_weight"
                            onChange={(e) => setGradeWeight(e.target.value)}
                            value={gradeWeight}
                        />
                    </div>
                    <div>
                        <label htmlFor="grade_achieved">Grade achieved:</label>
                        <input
                            type="number"
                            min="0" max="100"
                            id="grade_achieved"
                            onChange={(e) => setGradeAchieved(e.target.value)}
                            value={gradeAchieved}
                        />
                    </div>
                    <div>
                        <label htmlFor="course_code">Course code:</label>
                        <input
                            type="text"
                            id="course_code"
                            onChange={(e) => setCourseCode(e.target.value)}
                            value={courseCode}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <select id="status" name="status" 
                                onChange={(e) => setStatus(e.target.value)}
                                className={getStatusStyle()}
                                value={status}>
                            <option value="TODO">Todo</option>
                            <option value="IN PROGRESS">In progress</option>
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
                        <Tags tags={transformedTags} setTags={(newTags) => setTags(newTags.map(tag_value => ({ id: tags.length + 1, tag_value })))} />
                    </div>
                    <br></br>
                    <br></br>
                    <button type="submit">Update</button>
                </form>
            </div>
            </div>
        </div>
    );
}