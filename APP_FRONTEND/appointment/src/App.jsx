import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SLogin from "./Student/SLogin";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap"
import TLogin from "./Teacher/TLogin";
import SHome from "./Student/SHome";
import STeacher from "./Student/STeacher";
import SRequest from "./Student/SRequest";
import THome from "./Teacher/THome";
import TTimeTable from "./Teacher/TTimeTable";
import TRequest from "./Teacher/TRequest";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SLogin />}> </Route>
        <Route path="/teacher/login" element={<TLogin />}></Route>
        <Route path="/home/student/:id" element={<SHome />}></Route>
        <Route path="/home/teacher/:id" element={<THome />}></Route>
        <Route path="/teacher/timetable/:id" element={<TTimeTable />}></Route>
        <Route path="/teacher/student/request/:id" element={<TRequest />}></Route>
        <Route path="/home/student/teacher/:id" element={<STeacher />}></Route>
        <Route path="/home/student/request/:id" element={<SRequest />}></Route>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
