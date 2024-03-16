import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function TTimeTable() {
    let tidx = useParams()
  let tid = tidx.id
  // console.log(tid);
  let [tecaherFreeSlot,setTecaherFreeSlot] = useState([])
  let [addFreeSlot,setAddFreeSlot] = useState({
    "tid":tid,
    "date":"",
    "time":""
  })
  useEffect(()=>{
    let getTeacherFreeSlot = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/get/teacher/free/slot/"+tid)
        // console.log(data.data);
        setTecaherFreeSlot(data.data)
    }
    getTeacherFreeSlot()
},[])
let navigate = useNavigate()
  let handletecaherAddFreeSlot = async()=>{
    let data = axios.post("http://127.0.0.1:5000/teacher/add/free/slut",addFreeSlot)
    // console.log(data);
    window.location.reload()
  }
  let hanldeTeacherFreeSlotDelete = async(fid)=>{
    let data = await axios.delete("http://127.0.0.1:5000/teacher/delete/free/slot/"+fid)
    // console.log(data);
    if (data.data['message']=="slut deleted"){
      console.log("deleted ");
      window.location.reload()
    }else{
      console.log("failed");
    }
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <p class="navbar-brand" style={{marginLeft:"10px"}} >Teacher Dashboard</p>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" style={{position: "relative", left: "40px"}}>
        <NavLink to={"/teacher/timetable/"+tid} class="" >Time Table </NavLink>
      </li>
      <li class="nav-item" style={{position: "relative", left: "80px"}}>
        <NavLink to={"/teacher/student/request/"+tid}  class="" >Requests</NavLink>
      </li>
    </ul>
    <button class="btn btn-outline-danger my-2 my-sm-0" onClick={()=>{
        navigate("/teacher/login")
      }} style={{position:"relative",left:"800px"}} type="button">Logout</button>
  </div>
</nav>

<div className='container' style={{position:"relative",top:"10px"}}>
    {/* modallll */}

<h2>Your Free time</h2>
<br />

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Free Slot</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body mt-3 ">
        <label className='mx-3'>Date</label><input className='mx-1' type='date' onChange={(e)=>{
            setAddFreeSlot((prev)=>{
                prev.date = e.target.value
                return prev
            })
        }} />
        <br className='m-5'/>
        <label className='mt-3 mx-3'>Time</label><input className='mt-3' type='time' onChange={(e)=>{
            setAddFreeSlot((prev)=>{
                prev.time = e.target.value
                return prev
            })
        }}/>
      </div>
      <div class="modal-footer mt-3">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handletecaherAddFreeSlot}>Add</button>
      </div>
    </div>
  </div>
</div>

<table class="table table-striped">
<thead class="thead-light">
    <tr>
      <th scope="col">Free Date</th>
      <th scope="col">Free Time</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

  {
      tecaherFreeSlot.map((data,i)=>(
        <tr key={i}>
      <td>{data[1]}</td>
      <td>{data[2]}</td>
      <td><button onClick={()=>hanldeTeacherFreeSlotDelete(data[0])}>Delete</button></td>
    </tr>
      ))
    }
  </tbody>
</table>

<br />
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Click here to add slots
</button>


</div>
    </>
  )
}

export default TTimeTable
