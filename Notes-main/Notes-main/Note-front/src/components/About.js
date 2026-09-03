import React from 'react'
import { useContext,useEffect } from 'react'
import noteContext from '../Context/noteContect'

function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
  },[]);
  return (
    <div className='container my-3'>
      <h4>basic on <strong>UseContext</strong></h4>
      this is about page {a.state.name} and {a.state.id}
    </div>
  )
}

export default About

