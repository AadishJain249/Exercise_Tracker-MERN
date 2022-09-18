/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
function CreateUser() {
  const [list,setlist]=useState({
    exercise:[]
  })
  useEffect(() => {
    axios.get('http://localhost:3000/exercise/')
    .then(response => {
      setlist({ exercise: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])
  const deleteExercise=(id)=>
  {
    axios.delete('http://localhost:3000/exercise/'+id).then(res=>{
      console.log(res.data);
    })
    setlist({exercise:list.exercise.filter(el=>el._id!==id)})
  }
  return (
    <div className='container'>
    <h3>Logged Exercises</h3>
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th>Username</th>
          <th>Description</th>
          <th>Duration</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
          list.exercise.map(ex =>
              <tr key={ex._id}>
               <td>{ex.username}</td>
               <td>{ex.description}</td>
               <td>{ex.duration}</td>
               <td>{ex.date}</td>
               <td><Link to={"/edit/"+ex._id}>edit</Link> | <a href="#"onClick={() =>{deleteExercise(ex._id) }}>delete</a></td>
               </tr>)
              
          }
      </tbody>
      
    </table>
  </div>  )
}

export default CreateUser