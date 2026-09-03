import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signin.css'
// import { useForm } from "react-hook-form"

const Signin = () => {

  // const { register, errors } = useForm();
  let navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "", confirmpassword: "" });

  const signin = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const mystyle = {
    "color": "red",
    "fonstSize": "20px",
  }

  const Submitting = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/routing/express/bscrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    });
    const details = await response.json();

    if (!details.success) {
      alert(
        details.message
      )
      navigate("/Signin")
    }
    else {
      console.log(details.data._id);
      localStorage.setItem("requiredId", details.data._id);
      localStorage.getItem("requiredId");
      navigate("/addnote");
    }

    // setData({...data ,[e.target.name] : ""});

  }
  return (
    <div className='container my-4'>
      <h4 className='my-4'>SIGN-IN now for secure NOTES </h4>
      <form onSubmit={Submitting}>
        <div className='mb-3'>
          <label htmlFor="input" className="form-label">User Name</label>
          <input type="name" className="form-control" id="exampleInputtext" aria-describedby="emailHelp" name="name" value={data.name} onChange={signin} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={signin} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" autoComplete='on' value={data.password} onChange={signin} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" name="confirmpassword" autoComplete='on' value={data.confirmpassword} onChange={signin} />
        </div>
        {data.password !== data.confirmpassword ? <div style={mystyle}>ENTER CONFIRM PASSWORD CORRECTLY </div> : ""}
        <button type="submit" disabled={data.password !== data.confirmpassword} className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

export default Signin
