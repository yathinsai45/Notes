import React, { useContext } from 'react'
import trash from "./recycle-bin.png";
// import Notestate2 from '../Context/noteState2';
import noteContext2 from '../Context/notecontext2'
import './Noteitem.css'
// import './Noteitem.css'

function Noteitem(props) {
    const { note } = props;
    const context = useContext(noteContext2);
    const {deletenote}= context;

    return (
        <div className='note-item'>
            <div className="note-card">
                <div className="note-content">
                    <div className='note-header'>
                        <h5 className="note-title">{note.title}</h5>
                        <img src={trash} alt="trash" className="trash-icon" onClick={()=>{deletenote(note._id) }}/>
                    </div>
                    <p className="note-description">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
