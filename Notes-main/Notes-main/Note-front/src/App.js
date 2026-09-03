// import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Addnote from './components/Addnote';
import Notestate2 from './Context/noteState2';
import Signin from './components/Signin';
import Login from './components/Login';

function App() {
  return (
    <>
      {/* here ROUTER is used to browse router
and SWITCH helps to change the path accc the link
*** ROUTE and EXACT are very imp . because if they were not used then it checks all the occurance pf the path */}
      <Notestate2>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addnote" element={<Addnote />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      </Notestate2>
    </>
  );
}

export default App;
