/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function THome() {
  let tidx = useParams()
  let tid = tidx.id
  // console.log(tid);
  let navigate = useNavigate()
    useEffect(()=>{
        let goTecahrr = ()=>{
            navigate("/teacher/timetable/"+tid)
        }
        goTecahrr()
    })
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <p class="navbar-brand" style={{marginLeft:"10px"}}>Teacher Dashboard</p>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <NavLink to={"/teacher/timetable/"+tid} class="" >Time Table </NavLink>
      </li>
      <li class="nav-item">
        <NavLink to={"/teacher/student/request/"+tid}  class="" >Requests</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default THome
