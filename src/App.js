import './App.css';
import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home"
import Search from "./Components/SearchPage"
import { AuthProvider } from './contexts/AuthContext';

function App() {
  /*
  <Router>
      <Navbar/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route exact={true} path="/stock-addition" element={<Search/>} />
            <Route exact={true} path="/login" element={<Login/>} />
            <Route exact={true} path="/sign-up" element={<SignUp/>} />
          </Routes>
          
        </AuthProvider>
        


    </Router>
  */
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/stock-addition" element={<Search/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
