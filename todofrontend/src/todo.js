import e from "express";
import { set } from "mongoose";
import { useState } from "react";
const apiurl = "http://localhost:3000/todos";

export default function Todo() {

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [todos, settodos] = useState([]);
    const [error,setError]= useState("");
    const [message,setMessage]=useState("");

    const handlesubmit=()=>
    {
        //check inout values
        if(title.trim() !=="" && description.trim() !=="")
        {

                       fetch(apiurl+"/todos",   
                {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({title, description})       
                }
            
          
            .then((res)=>

            {
                if(res.ok)
                {
  settodos([...todos, {title, description}]);
  setMessage("item addedd successfully");
                }

                else
                {
                    setError (" unable to create todos item");}
                }
            }
            //add todo item
   

    return (
        <>
        <div className="row p-3 bg-success text-light" >
            <h1>Todo Component</h1>
        </div>

        <div className="row p-3">
            <h3>add item</h3>
           {message && <p className="text-success">{message}</p>}

            <div className="form-group d-flex gap-2">
            <input className="form-control"onChange={(e)=> settitle(e.target.value)} type ="text" placeholder="title" value={title}/>
             <input className="form-control" type ="text"  onChange={(e)=> setdescription(e.target.value)} placeholder="description" value={description}/>
            <button className="btn btn-dark" onClick={handlesubmit}>Add Todo</button>

            </div>

          {error &&  <p>{error}</p>}
            </div>


</>
 );
}  