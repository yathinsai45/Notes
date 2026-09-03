import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [logindet,setelogindet] = useState({email:"",password:""});
  const login = (e)=>{
      setelogindet({...logindet,[e.target.name]:e.target.value});
  }
  const loginsubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/routing/express/login",{
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email : logindet.email,
          password: logindet.password,
        })
      });
      const logindetails =await response.json();
      console.log(logindetails);
      if(logindetails.success !== true){

        alert(logindetails.message);
      }
      else{
        console.log(logindetails.there._id);
        localStorage.setItem("requiredId",logindetails.there._id);
        navigate("/");
      }

  }
  return (
    <div className='container my-4'>
      <h4 className='my-4'>LOG-IN to your account</h4>
      <form onSubmit={loginsubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={logindet.email} onChange={login} placeholder='Enter your account Email'/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" autoComplete="on" value={logindet.password} onChange={login} placeholder='Enter your password'/>
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

export default Login
