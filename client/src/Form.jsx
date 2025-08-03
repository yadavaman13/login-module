import React, { useEffect, useState } from 'react'
import './App.css'

import { RiUserLine , RiLockLine } from "@remixicon/react";

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
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" action="" onSubmit={handleForm}>
        <div className='input-wrapper '>
          <RiUserLine className="input-icon" />
          <input className="input-container" placeholder="Username" type="text" name="" id="" value={username} onChange={(e)=>{
              setUserName(e.target.value)
              }}
          />
        </div>
        <div className='input-wrapper'>
          <RiLockLine className="input-icon" />
          <input className="input-container" placeholder="Password" type="text" name="" id="" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} 
        />
        </div>

        <input className='submit-button' type="submit" value="Submit" />
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
