import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Button from 'react-bootstrap/Button'
import './App.css'
export default function Contact() {
  const [arrData,setArrData]=useState([])// [] means we are fetching array

 
  const [nm,setnm]=useState("")
  const [city,setcity]=useState("")
  const [mobile,setmobile]=useState()
  const [age,setage]=useState()
  const [gender,setgender]=useState("")

  const [IdTodelete,setIdtodelete]=useState(0)
  const [IdToUpdate,setIdtoUpdate]=useState(0)

  function api(){
    axios.get("http://127.0.0.1:3000/contact")
    .then(Response=>{
      // console.log(Response.data)
      let l=Response.data.contactlist
       setArrData(l)
      console.log(l)
    })
  }
  useEffect(()=>{
    api();
  },[])

//it is for deletion of the data in rest api through UI

function deleteD(){
  const del={
    id:IdTodelete
  }

  axios.delete("http://127.0.0.1:3000/deleteD",{data:del})
  .then(Response=>{
    let l=Response.data.status
    if(l=="200")
    {
      alert("delete successful")
      api();
    }
    //  setArrData(l)
    // console.log(l)
  })
}


function getDataToDelete(e){
  setIdtodelete(e.target.value)
}


function getnm(e){
  setnm(e.target.value)
}
function getcity(e){
  setcity(e.target.value)
}
function getmobile(e){
  setmobile(e.target.value)
}
function getage(e){
  setage(e.target.value)
}
function getgender(e){
  setgender(e.target.value)
}


//it is for insertion of the data in database through UI in Rest API calling

function InsertData(){

  const InsD={
    name:nm,
    city:city,
    mobileno:mobile,
    age:age,
    gender:gender 
  }
  //here left side name,city,mobileno,age,gender are of databese's column while at rightsight-> name,city,mobile,age,gender is of user inputvalue(variable)
  alert(nm+city+mobile+age+gender)
  axios.post("http://127.0.0.1:3000/insertD",InsD)
  .then(Response=>{
  let sts=Response.data.status
  if(sts==200)
  {
   alert("Successful Insertion")
   api();
  }
   
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    alert("Failed to insert data");
  });

  }

  //it is for updation of data


  function getidToUpdate(e){
    setIdtoUpdate(e.target.value)
  }

  function updateData(){

    const updtD={
      name:nm,
      city:city,
      mobileno:mobile,
      age:age,
      gender:gender,
      id:IdToUpdate
    }
    //here left side name,city,mobileno,age,gender are of databese's column while at rightsight-> name,city,mobile,age,gender is of user inputvalue(variable) and extra id given which means which id is to delete
    alert(nm+city+mobile+age+gender)
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






  return (
  <>
  <center>
    <h2>Table of JSON Array</h2>
    <br />
    <h1>Insertion of data in table</h1>

Name:<input className='btnn' type="text" onChange={getnm} />
<br />
City:<input className='btnn' type="text" onChange={getcity} />
<br />
Mobile No:<input className='btnn' type="number" onChange={getmobile} />
<br />
Age:<input className='btnn' type="number" onChange={getage} />
<br />
Gender:<input className='btnn' type="text" onChange={getgender} />
<br />
<button onClick={InsertData}>Insert/Save</button>
<br />
<br />
<h1>DELETION OF DATA FROM DATABASE </h1>
Enter Id to Delete Data:<input className='btnn' type="text" onChange={getDataToDelete} />
<br />
<button onClick={deleteD}>delete</button>

<br />



<br />
<h1>Updation of data</h1>
<br />
Which Id's value we want to Update:<input className='btnn' type="text" onChange={getidToUpdate} />
<br />
Name:<input className='btnn' type="text" onChange={getnm} />
<br />
City:<input className='btnn' type="text" onChange={getcity} />
<br />
Mobile No:<input className='btnn' type="number" onChange={getmobile} />
<br />
Age:<input className='btnn' type="number" onChange={getage} />
<br />
Gender:<input className='btnn' type="text" onChange={getgender} />
<br />
<button onClick={updateData}>Update Data</button>
<br />
<br />

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>id</th>
          <th> name</th>
          <th>city</th>
          <th>mobile no</th>
          <th>age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>

{/* here we are using filterration */}

{arrData.map((item)=>{
  return(
    <tr>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.city}</td>
    <td>{item.mobile_no}</td>
    <td>{item.age}</td>
    <td>{item.gender}</td>
  
  </tr>
  )
})}       
      </tbody>
    </Table>
<h1>{nm}</h1>
<h1>{city}</h1>
<h1>{mobile}</h1>
<h1>{age}</h1>
<h1>{gender}</h1>


  </center>
  </>
  )
}
