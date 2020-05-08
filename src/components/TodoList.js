import React from 'react';
import Todo from './Todo';
import './TodoList.css';

function TodoList (props) {
    return (
        <ol className="app-list">
          {props.list.map((item, index) => {
            return (
                <Todo 
                    item={item}
                    completeTask={props.completeTask}
                    key={index}
                />
            )
            })}
        </ol>
    )
}


/*

I wanted to make the smaller functions into functional components but if for the assignment the smaller components need to be class components here is the code:

class TodoList extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <ol>
                {}
            </ol>
        )
    }
}

*/

export default TodoList;