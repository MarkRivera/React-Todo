import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      tasks: [
        {
          task: 'Organize Garage',
          id: 1528817077286,
          completed: false
        },
        {
          task: 'Bake Cookies',
          id: 1528817084358,
          completed: false
        }
      ],

      userInput: ""
    }
  }

  onChange = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  onUserKeyDown = e => {
    if(e.key === "Enter") {
      this.addTask(e);
    }
  }

  clearUserInput = () => {
    this.setState({
      userInput: ''
    });
  };

  addTask = e => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          task: this.state.userInput,
          id: Date.now(),
          completed: false
        }
      ]
    })

    this.clearUserInput();
  }

  clearCompletedTasks = e => {
    this.setState({
      tasks: this.state.tasks.filter(element => {
        return element.completed ? null : element
      })
    })
  }

  completeTask = taskId => {

    this.setState({
      tasks: this.state.tasks.map(element => {
        if(taskId === element.id) {
          return {
            ...element,
            completed: !element.completed
          }
        }
      
        return element
      })
    })
  };
  

  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  render() {
    return (
      <>
        <header>
          <h2>Welcome to your Todo App!</h2>
        </header>

        <TodoList 
          list={ this.state.tasks } 
          completeTask={this.completeTask}  
        />

        <TodoForm 
          userInput={this.state.userInput} 
          onUserInput={this.onChange}
          onUserKeyDown={this.onUserKeyDown}
          addTask={this.addTask}
          clearCompletedTasks={this.clearCompletedTasks}
        />
      </>
    );
  }
}

export default App;
