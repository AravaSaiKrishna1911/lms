import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;
