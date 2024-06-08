import { useState } from 'react';
import './CreateModal.css'

export default function CreateModal({ show, onClose }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gradeWeight, setGradeWeight] = useState(0);
    const [gradeAchieved, setGradeAchieved] = useState(0);
    const [courseCode, setCourseCode] = useState("");
    const [status, setStatus] = useState("");
    const [timeStart, setTimeStart] = useState(new Date());
    const [timeEnd, setTimeEnd] = useState();
    const [tags, setTags] = useState([]);
    

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
                <form className="create-form">
                    <div>
                        <label htmlFor="name">Name of task:</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
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