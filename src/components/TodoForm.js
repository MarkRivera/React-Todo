import React from 'react';
import './TodoForm.css';

function TodoForm(props) {
    return (
        <form onSubmit={e => e.preventDefault()} className="app-form">
            <input 
                type="text" 
                name="task" 
                value={props.userInput} 
                onChange={ e => props.onUserInput(e) }
                onKeyDown={ e => {props.onUserKeyDown(e)} }
                className="app-input"
            />

           <section className="form-btn">
                <button 
                    onClick={e => props.addTask(e)} 
                    className="app-btn"> 
                        Add Todo 
                </button>

                <button 
                    onClick={e => props.clearCompletedTasks(e)} 
                    className="app-btn">
                        Clear List 
                </button>
           </section>
        </form>
    )
}

export default TodoForm;