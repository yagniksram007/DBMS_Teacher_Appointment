/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

function SHome() {
    let sidx = useParams()
    let sid = sidx.id
    let navigate = useNavigate()
    useEffect(()=>{
        let goTecahrr = ()=>{
            navigate("/home/student/teacher/"+sid)
        }
        goTecahrr()
    })
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <p class="navbar-brand" >Navbar</p>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <NavLink to={"/home/student/teacher/"+sid} class="" >Teachers <span class="sr-only"></span></NavLink>
      </li>
      <li class="nav-item">
        <NavLink to={"/home/student/request/"+sid}  class="" >Requests</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default SHome
