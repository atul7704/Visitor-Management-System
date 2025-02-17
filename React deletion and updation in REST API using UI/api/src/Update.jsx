
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
export default function Update() {
     const [arrData,setArrData]=useState([])
    const [nam,setnam]=useState("")
    const [contac,setcontac]=useState("")
    const [purpos,setpurpos]=useState()
    const [assigne,setassigne]=useState("")
    const [statu,setstatu]=useState("")

    const [IdToUpdate,setIdtoUpdate]=useState(0)

    function api(){
        axios.get("http://127.0.0.1:3000/visitor")
        .then(Response=>{
            let l=Response.data.visitorlist
          setArrData(l)
        
          // console.log(l)
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
      
      
      //it is for updation of the data in database through UI in Rest API calling
      function getidToUpdate(e){
        setIdtoUpdate(e.target.value)
      }

      function updateData(){

        const updtD={
            fullnamee:nam,
            contactt:contac,
            purposee:purpos,
            assignedtoo:assigne,
            statuss:statu,
            id:IdToUpdate
        }
        if(nam==''||contac==''||purpos==''||assigne==''||statu=='')
          {
           alert("Enter all Data Properly")
          }
          else{

        axios.put("http://127.0.0.1:3000/updateD",updtD)
        .then(Response=>{
        let sts=Response.data.status
        if(sts==200)
        {
         alert("Successful updation")
         api();
        }
         
        })
        .catch((error) => {
          console.error("Error updation data:", error);
          alert("Failed to update data");
        });
      }
      
        }
    
  return (
    <>
   <>
  <div className="center-container">
    <h1>Update Visitor Details</h1>
    
    <div className="form-group">

    <label>Enter Visitor Id which we want to Update:</label>
    <input type="text"  onChange={getidToUpdate}  />
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

    <button onClick={updateData}>Update Data</button>
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


</>
  )
}
