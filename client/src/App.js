import Tasks from "./Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Auth/RegLog'

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: "center", color:"red"}}><i><u>TO DO APPLICATION</u></i></h1>
      <Router>
        <Routes>
       <Route exact path = '/tasks' element = {<Tasks />}  />
       <Route exact path = '/' element = {<Login />}  />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
