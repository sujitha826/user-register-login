import React, { useState } from 'react';
import '../css/Dnd.css';

export default function DragNDrop(props) {
    const initialState = props.tasks[0] ? props.tasks :
        {
            tasks: [
                { name: "Angular", category: "wip", bgcolor: "yellow" },
                { name: "React", category: "wip", bgcolor: "pink" },
                { name: "Vue", category: "complete", bgcolor: "skyblue" },
                { name: "Next", category: "complete", bgcolor: "green" }
            ]
        }

    const [state, setState] = useState(initialState);

    const onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        let tasks = state.tasks.filter((task) => {
            if (task.name === id) {
                task.category = cat;
            }
            return task;
        });

        setState({
            ...state,
            tasks
        });
    }

    var tasks = {
        wip: [],
        complete: []
    }

    state.tasks.forEach((t) => {
        tasks[t.category].push(
            <div key={t.name}
                onDragStart={(e) => onDragStart(e, t.name)}
                draggable
                className="draggable"
                style={{ backgroundColor: t.bgcolor }}
            >
                {t.name}
            </div>
        );
    });

    return (
        <div className="container-drag">
            <h2 className="header">DRAG & DROP DEMO</h2>
            <div className="wip"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => { onDrop(e, "wip") }}>
                <span className="task-header">WIP</span>
                {tasks.wip}
            </div>
            <div className="droppable"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, "complete")}>
                <span className="task-header">COMPLETED</span>
                {tasks.complete}
            </div>
        </div>
    );
}