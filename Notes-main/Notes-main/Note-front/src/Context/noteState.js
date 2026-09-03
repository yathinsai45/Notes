import { useState } from "react";
import noteContext from "./noteContect";

const NoteState = (props)=>{
    const s1 = {
        "name": "cwh",
        "id":"fee"
    }
    const [state,setstate] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setstate({
                "name" : "ss",
                "id":"03"
            })
        },1000);
    }
    return(
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;