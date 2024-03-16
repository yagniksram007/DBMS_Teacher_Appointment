import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

function TLogin() {
    let [tlogindata,setTLoginData] = useState({
        "email":"",
        "password":""
    })

    let navigate = useNavigate()
    let handleTeacherLogin = async()=>{
        let data = await axios.post("http://127.0.0.1:5000/login-teacher",tlogindata)
        // console.log(data);
        if (data.data.length>0) {
            console.log("success");
            let id = data.data[0][0]
            navigate("/home/teacher/"+id)
        }else{
            console.log("failed");
        }
        console.log(data);
    }
  return (
   <>
   <div className="container-fluid">
    <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>
        {/* <!-- The content half --> */}
        <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">

                {/* <!-- Demo content--> */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                            <h3 className="display-4">Teacher Login</h3>
                            
                            <form className='mt-5'>
                                <div className="form-group mb-3">
                                    <input id="inputEmail" type="email" placeholder="Email address" required=""  className="form-control rounded-pill border-0 shadow-sm px-4" onChange={(e)=>{
                                        setTLoginData((prev)=>{
                                            prev.email = e.target.value
                                            return prev
                                        })
                                    }}/>
                                </div>
                                <div className="form-group mb-3">
                                    <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e)=>{
                                        setTLoginData((prev)=>{
                                            prev.password = e.target.value
                                            return prev
                                        })
                                    }}/>
                                </div>
                               
                                <button type="button" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={handleTeacherLogin}>Login</button>
                                <Link to={"/"} type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Student Login</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
   </>
  )
}

export default TLogin
