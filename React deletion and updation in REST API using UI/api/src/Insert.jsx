
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import './insert.css'
export default function Insert() {
     const [arrData,setArrData]=useState([])
    const [nam,setnam]=useState("")
    const [contac,setcontac]=useState("")
    const [purpos,setpurpos]=useState()
    const [assigne,setassigne]=useState("")
    const [statu,setstatu]=useState("")


    function api(){
        axios.get("http://127.0.0.1:3000/visitor")
        .then(Response=>{
            let l=Response.data.visitorlist
          setArrData(l)
        
        })
      }
      useEffect(()=>{
        api();
      })

    function getnam(e){
        setnam(e.target.value)
      }
      function getcontac(e){
        setcontac(e.target.value)
      }
      function getassigne(e){
        setassigne(e.target.value)
      }
      function getpurpos(e){
        setpurpos(e.target.value)
      }
      function getstatu(e){
        setstatu(e.target.value)
      }
      
      
      //it is for insertion of the data in database through UI in Rest API calling
      
      function InsertData(){
      
        const InsD={
          fullnamee:nam,
          contactt:contac,
          purposee:purpos,
          assignedtoo:assigne,
          statuss:statu 
        }
        //here left side name,city,mobileno,age,gender are of databese's column while at rightsight-> name,city,mobile,age,gender is of user inputvalue(variable)
       if(nam==''||contac==''||purpos==''||assigne==''||statu=='')
       {
        alert("Enter all Data Properly")
       }
       else{
        axios.post("http://127.0.0.1:3000/insertD",InsD)
        .then(Response=>{
        let sts=Response.data.status
        if(sts==200){
          alert("Insert Successfully")
        }
         
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
          alert("Failed to insert data");
        });
      }
      
        }
  return (
    <>
   <>
  <div className="center-container">
    <h1>Fill Visitor Details</h1>
    
    <div className="form-group">
      <label>Name:</label>
      <input type="text" onChange={getnam} />
    </div>

    <div className="form-group">
      <label>Contact No:</label>
      <input type="text" onChange={getcontac} />
    </div>

    <div className="form-group">
      <label>Purpose:</label>
      <input type="text" onChange={getpurpos} />
    </div>

    <div className="form-group">
      <label>Assigned To:</label>
      <input type="text" onChange={getassigne} />
    </div>

    <div className="form-group">
      <label>Status:</label>
      <input type="text" onChange={getstatu} />
    </div>

    <button onClick={InsertData}>Insert/Save</button>
  </div>

  <div className="table-container">
    <Table striped bordered hover  variant="dark">
      <thead>
        <tr>
          <th>Visitor ID</th>
          <th>Full Name</th>
          <th>Contact</th>
          <th>Purpose</th>
          <th>Assign To</th>
          <th>Status</th>
          <th>Date of Visit</th>
        </tr>
      </thead>
      <tbody>
        {arrData.map((item) => (
          <tr key={item.vid}>
            <td>{item.vid}</td>
            <td>{item.fullname}</td>
            <td>{item.contact}</td>
            <td>{item.purpose}</td>
            <td>{item.assignedto}</td>
            <td>{item.status}</td>
            <td>{item.dateofvisit}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</>

{/* <h1>{nam}</h1>
<h1>{contac}</h1>
<h1>{purpos}</h1>
<h1>{assigne}</h1>
<h1>{statu}</h1> */}

</>
  )
}
