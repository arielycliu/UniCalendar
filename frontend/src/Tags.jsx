import React, { useState } from 'react';
import './Tags.css';

export default function Tags({ tags, setTags }) {
    const [currentText, setCurrentText] = useState('');

    const handleInputChange = (e) => {
        setCurrentText(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && currentText) {
            e.preventDefault(); // Prevent the default form submission on enter button
            if (!tags.includes(currentText)) {
                setTags([...tags, currentText]);
                setCurrentText('');
            } else {
                alert('Tag already exists');
            }
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="tag-input-container">
            <ul className="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        {tag}
                        <button
                            id="remove-btn"
                            onClick={() => removeTag(index)}
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Type out a tag, and press enter to add it"
                value={currentText}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
        </div>
    );
}
