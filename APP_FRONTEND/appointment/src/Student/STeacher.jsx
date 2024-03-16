import  axios  from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function STeacher() {
    let sidx = useParams()
    let sid = sidx.id
    let tid_ref = useRef()
    let alertText = useRef()
    let alertBox = useRef()
    let selectTeaher = useRef()
    let noTeacherAvailable = useRef()
    let navigate = useNavigate()
    let [tecaherData,setTecaherData] = useState([])
    let [tecaherFreeSlot,setTecaherFreeSlot] = useState([])
useEffect(()=>{
    let getAllTeacher = async ()=>{
        let data = await axios.get("http://127.0.0.1:5000/all/teacher")
        // console.log(data.data);
        setTecaherData(data.data)
    }
    getAllTeacher()
},[])
let handleTeacherFreeSlot = async (e)=>{
  let tid = e.target.value
  // console.log(e.target.value);
  let data = await axios.get("http://127.0.0.1:5000/get/teacher/free/slot/"+tid)
  setTecaherFreeSlot(data.data)
  // console.log(data.data.length);
  if(data.data.length<=0){
    noTeacherAvailable.current.style.display="block"
  }else{
    noTeacherAvailable.current.style.display="none"
  }
}
let handleStudentTeacherAppoitment = async(fid)=>{
  let tid = tid_ref.current.value
  let data = await axios.post("http://127.0.0.1:5000/student/request/teacher",{sid,tid,fid,"status":"request"})
  // console.log(data);
  if(data.data["message"]=="successs req"){
    alertBox.current.style.display = "block"
    alertText.current.textContent = "Request has been sent"
    setTimeout(()=>{
      alertBox.current.style.display = "none"
    },2000)
  }else{
    alertBox.current.style.display = "block"
    alertText.current.textContent = "Request failed to srnf"
    setTimeout(()=>{
      alertBox.current.style.display = "none"
    },2000)
  }
}
  return (
   <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <p class="navbar-brand" style={{marginLeft:"10px"}}>Student Dashboard</p>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" style={{position: "relative", left: "40px"}}>
        <NavLink to={"/home/student/teacher/"+sid} class="" >Teachers <span class="sr-only"></span></NavLink>
      </li>
      <li class="nav-item" style={{position: "relative", left: "80px"}}>
        <NavLink to={"/home/student/request/"+sid}  class="" >Requests</NavLink>
      </li>
    </ul>
    <button class="btn btn-outline-danger my-2 my-sm-0" onClick={()=>{
        navigate("/")
      }} style={{position:"relative",left:"800px"}} type="button">Logout</button>
  </div>
</nav>

<div className='container' style={{position:"relative",top:"10px"}}>
{/* style="position: relative; min-height: 200px;" */}


<h2>List of teachers</h2><br />

<table class="table container">
  <thead class="thead-light">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">EMAIL</th>
    </tr>
  </thead>
  <tbody>
    {
      tecaherData.map((data,i)=>(
        <tr key={i}>
      <th>{data[0]}</th>
      <td>{data[1]}</td>
      <td>{data[2]}</td>
    </tr>
      ))
    }
    
  </tbody>
</table>

<br />
<h3>Choose teacher for an appointment </h3><br />
<select class="form-select" aria-label="Default select example" ref={tid_ref} onChange={(e)=>{handleTeacherFreeSlot(e)
selectTeaher.current.style.display = "none"
}}>
  
  <option defaultChecked>Select Teacher</option>
  {
    tecaherData.map((item,i)=>(
      <option key={i} value={item[0]}>{item[1]}</option>
    ))
  }
</select>

<div class="alert alert-warning alert-dismissible fade show" role="alert" ref={alertBox} style={{display:"none"}}>
  <strong ref={alertText}></strong>  
</div>

<table class="table container mt-3">
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
      <th>{data[1]}</th>
      <td>{data[2]}</td>
      <td><button className='btn btn-info' onClick={()=>handleStudentTeacherAppoitment(data[0])}>REQ</button></td>
    </tr>
      ))
    }
    </tbody>
</table>
<p ref={selectTeaher}>Please Select A Teacher</p>
<p ref={noTeacherAvailable} style={{display:"none"}}>Teacher is not Available</p>
</div>
<br />
   </>
  )
}

export default STeacher
