import { React, useEffect, useState } from 'react'
import { useContext } from 'react'
import noteContext2 from '../Context/notecontext2'
import { useNavigate } from 'react-router-dom';
import './Addnote.css'

function Addnote() {

    let navigate = useNavigate();
    let userId;
    useEffect(() => {
        if (localStorage.getItem("requiredId")) {
            userId = localStorage.getItem("requiredId");
        }
        else if (localStorage.getItem("siginId")) {
            userId = localStorage.getItem("siginId");
        }
        else {
            navigate("/Login");
        }
        // eslint-disable-next-line
    }, [])

    const context = useContext(noteContext2);
    const { addednote } = context;

    const [name, newName] = useState("");
    const onChangeName = (e) => {
        e.preventDefault();
        newName(e.target.value);
    }
    const [desc, newdesc] = useState("");
    const onChangeDesc = (e) => {
        e.preventDefault();
        newdesc(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        addednote(name, desc,userId);
        newName("");
        newdesc("");
        navigate("/");
    }

    return (
        <div className='container'>
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>ADD NOTE</h3>
            <form >
                <div className="mb-3 my-3">
                    <label htmlFor="exampleInputText" className="form-label">Title</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={onChangeName} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputText" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={desc} onChange={onChangeDesc} />
                </div>
                <button type="submit" disabled={name.length < 1 || desc.length < 1} className="btn btn-dark" onClick={submit} >ADD NOTE</button>
            </form>
        </div>
    )
}

export default Addnote
