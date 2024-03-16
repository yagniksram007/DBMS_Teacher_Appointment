import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function TRequest() {
    let tidx = useParams()
  let tid = tidx.id
  let [reqData,setReqData] = useState([])
  let navigate = useNavigate()
  let noReq = useRef()
  useEffect(()=>{
    let getAllTeacherRequests = async ()=>{
      let data = await axios.get("http://127.0.0.1:5000/get/all/teacher/requests/"+tid)
      // console.log(data);
      if(data.data.length<=0){
        noReq.current.style.display="block"
      }else{
        noReq.current.style.display="none"
      }
      setReqData(data.data)
    }
    getAllTeacherRequests()
  },[])
  let handleTeacherreqAccept = async(fid)=>{
    console.log(fid);
    let  data = await axios.put("http://127.0.0.1:5000/teacher/accept/student/request/"+fid)
    window.location.reload()
    // console.log(data);
  }
  let handleTeacherreqReject = async (fid)=>{
    console.log(fid);
    let  data = await axios.put("http://127.0.0.1:5000/teacher/reject/student/request/"+fid)
    window.location.reload()
    // console.log(data);
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <p class="navbar-brand" style={{marginLeft:"10px"}}>Teacher Dashboard</p>
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
  <h3 className='m-5' style={{display:"none"}} ref={noReq}>NO REQUEST FOUND!</h3>
    <div className='d-flex flex-wrap'>

            {
              reqData.map((item,i)=>(
                    <div class="card" style={{width:"250px",margin:"10px"}}>
                  <div class="card-body">
                <h5 class="card-title">Studner Name : {item[0]}</h5>
                <h6 class="card-subtitle mb-2 text-muted">date : {item[1]}</h6>
                <p class="card-text">time: {item[2]}</p>
                <div class="card-footer d-flex">
                <button class="card-link btn btn-success" onClick={()=>handleTeacherreqAccept(item[3])}>Accept</button>
                <button class="card-link btn btn-danger" onClick={()=>handleTeacherreqReject(item[3])}>Reject</button>
                </div>
                  </div>
                </div>
              ))
            }

    </div>
</div>
    </>
  )
}

export default TRequest
