import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import './delete.css'

export default function Select() {
  const [arrData, setArrData] = useState([]);
   const [namee,setname]=useState("")
  // Function to fetch data
  function api() {
    axios.get("http://127.0.0.1:3000/visitor")
      .then(Response => {
        let l = Response.data.visitorlist;
        setArrData(l);
      });
  }

  useEffect(() => {
    api();
  }, []);



  function getname(e){
    setname(e.target.value)
  }

  function nameis() {
    if (!namee) {
        alert("Please enter a name to search");
        return;
    }

    axios.get(`http://127.0.0.1:3000/getname?name=${encodeURIComponent(namee)}`)
        .then(response => {
            let data = response.data.data;
            let sts = response.data.status;

            if (sts === "200" && data.length > 0) {
                setArrData(data); // ✅ Update table with search results
                alert("Search successful");
            } else {
                setArrData([]); // ✅ Clear table
                alert("No record found");
            }
        })
        .catch(error => {
            console.error("Error searching data:", error);
            alert("Failed to search data");
        });
}

  


  return (
    <div className="table-container">
      <h1 className="title">All Data Of Visitors</h1>
     Search Visitor: <input type="text" placeholder='Enter Visitor Name 'onChange={getname} /> <br />
     <button onClick={nameis} >Search</button>
      <Table striped bordered hover className="visitor-table">
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
  );
}
