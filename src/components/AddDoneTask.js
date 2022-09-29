import React, { useState } from 'react';
import '../css/AddCard.css';
import Input from './Input';

function AddDoneTask(props) {

    const [input, setInput] = useState({});

    function handleChange(e) {
        let cardObj = Object.assign({}, input);
        cardObj[e.target.name] = e.target.value;
        setInput(cardObj);
    }

    function onClickClose() {
        props.onClose();
    }

    function handleAddTask() {
        props.onAddDoneTask(input);
        props.onClose();
    }

    return (
        <div className="add_page">
            <div className="add_container">
                <div className="add_header">
                    <h2 className="add_heading">ADD TASK</h2>
                </div>

                <div className="add_form">
                    <div style={{ width: "80%" }}>
                        <Input
                            title="Title"
                            onChange={handleChange}
                            value={input.title}
                            type="text"
                            placeholder="Enter title.."
                            name="title"
                        />
                        <Input
                            title="Description"
                            onChange={handleChange}
                            value={input.desc}
                            type="text"
                            placeholder="Enter description"
                            name="desc"
                        />
                    </div>
                    <div className="add_actions">
                        <button
                            className="butn"
                            onClick={handleAddTask}
                        >
                            Add
                        </button>
                        <button
                            className="can_btn"
                            onClick={onClickClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDoneTask;