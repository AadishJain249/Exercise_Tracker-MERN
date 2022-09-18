import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(props) {
  const [input,setInput]=useState({
    username: '',
    description: '',
    duration: 0,
    users:[]
  })
  const [startDate, setStartDate] = useState(new Date());
  const handleChange=(event)=>{
   setInput({ ...input, [event.target.name]: event.target.value});
  }
  useEffect(() => {
    axios.get('http://localhost:3000/user/')
    .then(response => {
      if (response.data.length > 0) {
        setInput({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])
  
  const handleClick=(event)=>{
    event.preventDefault()
    console.log(input);// to see the data
    const newInput={
      username:input.username,
      description:input.description,
      duration:input.duration,
      date:startDate
    }
    axios.post('http://localhost:3000/exercise/add',newInput)
    window.location = '/'
    // setInput({ username: "", description: "", duration:'',date:''})
  }
  return (
    <div className='container'>
      <h2>Add Exercises</h2>
      <form>
        <div className='form-group'>
          <label>UserName</label>
          <select  name="username" onChange={handleChange} 
          value={input.username}
          className='form-control' 
          placeholder="enter the username" >
            {
              input.users.map(function(user){
                return<option
                  key={user} value={user||' '}>
                    {user}
                </option>
              })
            }
          </select>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <input name="description" className='form-control' value={input.description ||' '} onChange={handleChange} type="text" placeholder="enter description" ></input>
        </div>
        <div className='form-group'>
          <label>Duration</label>
          <input name="duration" onChange={handleChange} value={input.duration ||' '} className='form-control' type="text" placeholder="enter duration of exercise" ></input>
        </div>
        <div className='form-group'>
          <label>Date</label>
          <div>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" onClick={handleClick} className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise