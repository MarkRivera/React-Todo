import React from 'react';
import './Todo.css';

function Todo(props) {
    const handleClick = e => {
        props.completeTask(props.item.id);
    }

    return (
        <li
            className={`task ${props.item.completed? 'completed': ''}`} 
            onClick={ handleClick }
        >
            {props.item.task}
        </li>
    )
}

export default Todo;