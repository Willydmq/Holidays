import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Router>
      <div className="todo-app">
        <TodoList />
      </div>
    </Router>
  );
}

export default App;
