import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Instructor from "./pages/Instructor/Instructor";
import Student from "./pages/Student/Student";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route 
          path="/admin" 
          element={userRole === "admin" ? <Admin /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/instructor" 
          element={userRole === "instructor" ? <Instructor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/student" 
          element={userRole === "student" ? <Student /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
