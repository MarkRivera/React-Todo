import React from 'react';
import './App.css';
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
          completed: false,
          displayTask: true
        },
        {
          task: 'Bake Cookies',
          id: 1528817084358,
          completed: false,
          displayTask: true
        }
      ],
      displayed: [],
      userInput: "",
      searchInput: ""
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onUserKeyDown = e => {
    if(e.key==="Enter") {
      this.addTask(e);
    }
  }

  clearUserInput = () => {
    this.setState({
      userInput: ''
    });
  };

  addStateToLocalStorage = state => {
    let taskString = JSON.stringify(state.tasks);
    let userInputString = JSON.stringify(state.userInput);

    localStorage.setItem("userTasks", taskString);
    localStorage.setItem("userInput", userInputString);
  }

  addTask = e => {

    if(this.state.userInput.length <= 0) {
      return 
    } else {
        this.setState({
          tasks: [
            ...this.state.tasks,
            {
              task: this.state.userInput,
              id: Date.now(),
              completed: false,
              displayTask: true
            }
          ]
        })
        this.clearUserInput();
    }

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


  // Serach Bar Functions
  checkTask = (task, str) => {
    let pattern = str.split("").map((x)=>{
        return `(?=.*${x})`
    }).join("");
    let regex = new RegExp(`${pattern}`, "g")
    return task.match(regex);
  }


  findTask = value => {
    let substring = value.toLowerCase().substring(0, 3);
    let filteredTasks = this.state.tasks.filter(item => {
      const taskSubString = item.task.substring(0, 3).toLowerCase();
      
      return taskSubString.split("").includes(substring) || this.checkTask(taskSubString, substring)
    })

    if(value.length === 0) {
      this.setState({
        displayed: []
      })
    } else {
      this.setState({
        displayed: filteredTasks
      })  
    }    
  };

  // Life Cycle Methods

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.addStateToLocalStorage(this.state);
  }

  componentDidMount() {
    this.addStateToLocalStorage(this.state);
  }
  

  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  render() {
    return (
      <main className="app">
        <header className="app-header">
          <h2 className="app-title">
            Welcome to your Todo App!
          </h2>

          <form onSubmit={e => e.preventDefault()} autoComplete="off">
            <input 
                  type="text" 
                  name="searchInput" 
                  value={this.searchInput} 
                  onChange={e => {
                    this.onChange(e)
                    this.findTask(e.target.value);
                  }}
                  className="app-input"
                  placeholder="Search Tasks"
              />
          </form>
        </header>

        <TodoList 
          list={
            this.state.displayed.length !== 0? this.state.displayed : this.state.tasks
          }
          completeTask={this.completeTask}
        />

        <TodoForm 
          userInput={this.state.userInput} 
          onUserInput={this.onChange}
          onUserKeyDown={this.onUserKeyDown}
          addTask={this.addTask}
          clearCompletedTasks={this.clearCompletedTasks}
        />
      </main>
    );
  }
}

export default App;
