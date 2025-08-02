import React, { useEffect } from 'react'
import { useState } from 'react'

const Form = () => {

      const[username, setUserName] = useState("");
      const[password, setPassword] = useState("");

      const[userAllData,setUserAllData] = useState([])

      function handleForm(e){
         e.preventDefault();
         const formdata = {UserName: username, UserPassword: password};

         fetch("/api/user",{
           method: "POST",
           headers: {"Content-Type":"application/json"},
           body:JSON.stringify(formdata)
         }).then((res)=>{
            return res.json();
         }).then((result)=>{
            console.log(result);
         });
      }

      function handleDelete(id){
        fetch(`/api/userdatadelete/${id}`,{
           method: "DELETE",
        }).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result);
            // Refresh the data after deletion
            fetchUserData();
        }).catch((error) => {
            console.error("Delete error:", error);
        });
      }

      function fetchUserData() {
        fetch("/api/useralldata").then((res)=>{
          return res.json();
        }).then((result)=>{
           console.log(result);
           setUserAllData(result.Data);
        }).catch((error) => {
            console.error("Fetch error:", error);
        });
      }

      useEffect(()=>{
        fetchUserData();
      },[]);

  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={handleForm}>

        <label>Username</label>
        <input type="text" name="" id="" value={username} onChange={(e)=>{
            setUserName(e.target.value)
            }}
        />

        <label>Password</label>
        <input type="text" name="" id="" value={password} onChange={(e)=>{
            setPassword(e.target.value)
            }} 
        />

        <input type="submit" value="Submit" />
      </form>
      {
        userAllData.map((items) =>(
           <ul key={items._id}>
              <span>{ items.user }</span>

              {/*Delete function*/}
              <button onClick={() => {
                handleDelete(items._id)}}
                >Delete
              </button>

              {/*Update function*/}
              <button onClick={() => {
                handleUpdate(items._id)}}
                >Update
              </button>           
            </ul>
        ))
      }
    </div>
  )
}

export default Form
