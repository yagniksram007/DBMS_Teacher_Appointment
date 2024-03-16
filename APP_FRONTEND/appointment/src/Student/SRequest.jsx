import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function SRequest() {
    let sidx = useParams()
    let sid = sidx.id
    let [reqData,setReqData] = useState([])
    let navigate = useNavigate()
    useEffect(()=>{
      let getAllStudentRequests = async()=>{
        let data = await axios.get("http://127.0.0.1:5000/get/all/studnet/requests/"+sid)
        // console.clear()
        // console.log(data);
        setReqData(data.data)
      }
      getAllStudentRequests()
    },[])
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
    

    <div>
    <table class="table">
  <thead class="">
    <tr>
      <th scope="col">Teacher ID</th>
      <th scope="col">Teacher Name</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
      reqData.map((item,i)=>(
          <tr key={i}>
        <th>{i+1}</th>
        <td>{item[1]}</td>
        <td>{item[2]}</td>
        <td>{item[3]}</td>
        <td>{item[4]}</td>
      </tr>
      ))
    }
   
  </tbody>
</table>

    </div>
</div>
   </>
  )
}

export default SRequest
