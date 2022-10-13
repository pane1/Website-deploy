import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home"
import Search from "./Components/SearchPage"

function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/stock-addition" element={<Search/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/sign-up" element={<SignUp/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
