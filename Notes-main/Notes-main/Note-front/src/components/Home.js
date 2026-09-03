import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext2 from '../Context/notecontext2'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {
  let navigate = useNavigate();
  const context = useContext(noteContext2);
  const { notes, getnotes } = context;
  useEffect(() => {
    if(localStorage.getItem("requiredId")){
      getnotes();
    }
    else {
      navigate("/Login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h3 className="page-title">NoteState</h3>
      <div className='notes-container'>
        <div className='empty-notes-message'>
          {notes.length === 0 ? "YOUR NOTES IS EMPTY" : ""}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note}/>
        })}
        <div className="notes-count">
          {notes.length !== 0 && `Number of notes available: ${notes.length}`}
        </div>
      </div>
    </div>
  )
}

export default Home
