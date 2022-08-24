import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Tasks.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as MdIcons from 'react-icons/md'
import * as ImIcons from 'react-icons/im'
import * as HiIcons from 'react-icons/hi'
import * as RiIcons from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router';
 
const Tasks = () => {
    var curr = new Date();
    const navigate = useNavigate();
     curr.setDate(curr.getDate() + 1);
     var date = curr.toISOString().substring(0,10);
     const [addTask, setAddTask] = useState(false);
    const [type, setType] = useState('personal');
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [theDate, setTheDate] = useState(date);
    const [email, setEmail] = useState("");
    const [tasks, setTasks] = useState([]);
    var mail = localStorage.getItem("email");

    const deleteHandler = (id) => {
       Axios.delete(`http://localhost:3001/delete/${id}`).then(window.location.reload())
    }

    const toggleHandler = () => {
      setAddTask(!addTask);
    }

    const Logout = () => {
      localStorage.clear();
      navigate('/')
    }
    const MarkDone = (id) => {
      Axios.put('http://localhost:3001/setDone', {
        id: id
      }).then(window.location.reload())
    }

    const MarkUndone = (id) => {
      Axios.put('http://localhost:3001/setUndone', {
        id: id
      }).then(window.location.reload())
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/read/${mail}`).then(response => setTasks(response.data))
    },[])

    const submitHandler = (e) => {
        Axios.post("http://localhost:3001/tasks", {
            taskType: type, taskName: taskName,  date: theDate, desc: taskDesc, email: mail, status: false
        });
    };
    
    return (
        <div>
          {!mail && navigate('/')}
          <button style = {{background: "none", border: "none" ,position: "relative", left: "47%"}} onClick = {toggleHandler}>Add Task <HiIcons.HiOutlinePlusCircle/></button><button onClick={Logout} className='logout' >Logout
          <RiIcons.RiLogoutBoxRLine/></button>
          <br/>
        {addTask && <form  style ={{justifyContent: "center", textAlign: "center"}} onSubmit ={submitHandler}  >
           <p>Please select type of task:</p>
            <input type="radio" id="personal" name="type" checked  = {type == 'personal'} onChange = {e => setType('personal')} />
            <label for="personal"  >personal</label> 
            <input type="radio" onChange={e => setType('work')} id="work" name="type" checked  = {type == 'work'} />
            <label for="work">work</label>
            <input type="radio" id="others" name="type" onChange={e => setType('others')} checked  = {type == 'others'} />
            <label for="others" >others</label>
            <br/><br/>

            <label> Task Name: </label><br/>
            <input type = 'text' className='inp' required value = {taskName} onChange = {e => setTaskName(e.target.value)}/><br/>

            <label> Description: </label><br/>
            <input type = 'text' className='inp' required value = {taskDesc} onChange = {e => setTaskDesc(e.target.value)}/><br/>

            <label> Due Date: </label><br/>
            <input type = 'date' defaultValue = {date} className='inp' required value = {theDate}
            onChange = {e => setTheDate(e.target.value)}/><br/><br/>
            
            <button  style={{width: "250px", height: "25px", borderRadius: "10px",  
            cursor: "pointer", borderWidth: "1px" }}  type ="submit"> Add Task</button>
            
        </form>}
      <br/>
        <table className= " table table-bordered table-striped  "  style ={{width: "90%", left:"5%", position: "relative"}}>
        <thead>
          <tr>
            <th>Mark</th>
            <th>Task Type</th>
            <th>Task Name</th>
            <th>Task description </th>
            <th>Due Date</th>
            <th>Delete</th>
            
          </tr>
        </thead>
        <tbody>
            {tasks.map(task =>
              <tr key={task._id}>
                <td>{!task.status &&<button style ={{background: "none", border: "none", justifyContent:"center"}}
                onClick = {() => MarkDone(task._id)}><ImIcons.ImCheckboxUnchecked/></button>}

                {task.status &&<button onClick={() => MarkUndone(task._id)} style ={{background: "none", border: "none", justifyContent:"center"}}><ImIcons.ImCheckboxChecked/></button>}
                 </td>

                <td>{task.taskType} </td> 
                <td>{!task.status ? task.taskName : <strike>{task.taskName}</strike>}</td>
                <td>{task.description}</td>
                <td>{task.dueDate.substring(0,10)}</td>
                <td><button style = {{background:"none", border: "none", color:"red"}} onClick = {() => deleteHandler(task._id)}><MdIcons.MdDelete/></button></td>
              </tr>
            )}
        </tbody>
        
        </table>
        </div>
    )
}

export default Tasks;