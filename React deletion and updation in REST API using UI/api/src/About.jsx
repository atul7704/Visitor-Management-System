import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
export default function About() {
  const [arrData,setArrData]=useState([])// [] means we are fetching array
  const [sts,setSts]=useState()
  function api(){
    axios.get("https://api.rootnet.in/covid19-in/stats/latest")
    .then(Response=>{
      // console.log(Response.data)
      let l=Response.data.data.regional
       setArrData(l)
      console.log(l)
    })
  }
  useEffect(()=>{
    api();
  },[])
  return (
  <>
  <center>
    <h1>Here we are calling json array in a table</h1>
    <h2>Table of JSON Array(Covid-19 for all State)</h2>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Location</th>
          <th> ConfirmedCaseOfIndia</th>
          <th>ConfirmedCaseFforeign</th>
          <th>Discharged</th>
          <th>Deaths</th>
          <th>TotalConfirmed</th>
        </tr>
      </thead>
      <tbody>

{/* here we are using filterration */}
 
{arrData.map((item)=>{
  return(
    <tr>
    <td>{item.loc}</td>
    <td>{item.confirmedCasesIndian}</td>
    <td>{item.confirmedCasesForeign}</td>
    <td>{item.discharged}</td>
    <td>{item.deaths}</td>
    <td>{item.totalConfirmed}</td>
  </tr>
  )
})} 

      </tbody>
    </Table>
  </center>
  </>
  )
}

