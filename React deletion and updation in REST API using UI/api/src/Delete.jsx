import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import './delete.css'

export default function Delete() {
  const [arrData, setArrData] = useState([]);
  const [IdTodelete, setIdtodelete] = useState(0);

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

  // Function to delete data
  function deleteD() {
    const del = {
      id: IdTodelete
    };
    if(IdTodelete==''){
      alert("Please enter Id to Delete")
    }
    else{


    axios.delete("http://127.0.0.1:3000/deleteD", { data: del })
      .then(Response => {
        let l = Response.data.status;
        if (l === "200") {
          alert("Delete successful");
          api();
        }
      });
    }
  }

  // Handle change of input field
  function getDataToDelete(e) {
    setIdtodelete(e.target.value);
  }

  return (
    <div className="table-container">
      
      <div className="input-container">
        <label htmlFor="deleteId" className="input-label">Enter Visitor ID to Delete:</label>
        <input 
          id="deleteId" 
          className="input-field" 
          type="text" 
          required
          onChange={getDataToDelete} 
        />
        <button className="delete-button" onClick={deleteD}>Delete</button>
      </div>

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
