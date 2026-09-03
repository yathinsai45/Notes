import { useState } from "react";
import noteContext2 from "./notecontext2";

const Notestate2 = (props)=>{
// NOTES COMPONENT TO SEND THE NOTES TO HOME COMPONENT
    const initial = [];
    const [notes,setNotes] = useState(initial);
    
// FETCHING NOTES FROM DATABASE MEANS BACKEND
    const getnotes = async ()=>{
        const response = await fetch("http://localhost:5000/routing/express/getnotes", {
            method: "GET",
            headers: {
                "id": localStorage.getItem("requiredId"),
                "Content-Type" : "application/json"
            }
        });

        const data = await response.json();
        if(data.length !== 0)
            setNotes(data);
        console.log(data);
    }

// ADD NOTE 
    const addednote = async (title,description,userId)=>{

    // ADD NOTE BACKEND
        const response = await fetch("http://localhost:5000/routing/express/notes",{
            method: "POST",
            headers : {
                "id": localStorage.getItem("requiredId"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                title: title,
                description : description,
            })
        })
        const newnote2 = await response.json();

        // here no need to type the below statement because when we do the above statements then the newnote is added to database directly and then while getnotes executes in the home page then directly the data base items are accquired

        // and so no need of local storage "(which helps to do in frontend (contact project))"

        // await setNotes([...notes,newnote2]);
        console.log(newnote2)


    // ADD NOTE FRONTEND
        // const newnote ={
        //     "_id": "6770134512495f04cb51126c",
        //     "user": "676d03228d1e82c9b47d64e9",
        //     "title": title,
        //     "description": description,
        //     "date": "2024-12-28T15:02:00.486Z",
        //     "__v": 0
        // }
        // console.log(title);
        // console.log(description);
        // setNotes([...notes,newnote]);
        // setNotes(notes.concat(newnote));
    }
// DELETE NOTE
    const deletenote = async (id,userId)=>{

        // console.log(id);
    // BACKEND DELETING THE NOTE
        const response = await fetch(`http://localhost:5000/routing/express/deletenotes/${id}`,{
            method : "DELETE",
            headers : {
                "id" : localStorage.getItem("requiredId"),
                "content-type" : "application/json"
            },
        });
        console.log(response.json());

    //DELETING NOTE IN FRONTEND
        const deletednotes = notes.filter((note)=>{
            return note._id!== id
        });
        setNotes(deletednotes);
    }

    return(
        <noteContext2.Provider value={{notes,getnotes,addednote,deletenote}}>
            {props.children}
        </noteContext2.Provider>
    )
}

export default Notestate2;