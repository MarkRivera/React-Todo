import React from 'react';

function TodoForm(props) {
    return (
        <>
            <input 
                type="text" 
                name="task" 
                value={props.userInput} 
                onChange={ e => props.onUserInput(e) }
                onKeyDown={ e => props.onUserKeyDown(e) }
            />

            <button onClick={e => props.addTask(e)}> Add Todo </button>

            <button onClick={e => props.clearCompletedTasks(e)}> Clear List </button>
        </>
    )
}

export default TodoForm;