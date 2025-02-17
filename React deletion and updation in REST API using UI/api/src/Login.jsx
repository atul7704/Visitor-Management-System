import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginForm.css';  // Importing the CSS file
import NavbarR from './NavbarR';
import Home from './Home';
export default function Login() {
  const [inputemail, setinputemail] = useState("");
  const [inputpassword, setinputpassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => {
    api();
  }, []);

  function api() {
    axios.get("http://127.0.0.1:3000/user")
      .then(Response => {
        console.log(Response.data);
      });
  }

  function getemail(e) {
    setinputemail(e.target.value);
  }

  function getpassword(e) {
    setinputpassword(e.target.value);
  }

  function Loginform() {
    axios.get("http://127.0.0.1:3000/user")
      .then(Response => {
        let l = Response.data.userlist;
        let isUserFound = false;

        for (let i = 0; i < l.length; i++) {
          let email = l[i].email;
          let password = l[i].password;
        

          if (inputemail === email && inputpassword === password) {
            setIsLoggedIn(true);
            isUserFound = true;
            break;
          }
        }

        if (!isUserFound) {
          setmessage('Invalid Email or Password');
        }
      });
  }

  return (
    <>
      {isLoggedIn ? (
        <Home/>
      ) : (
        <div className="admin">
          <center>
            <h1>ADMIN LOGIN</h1>
            <input type="text" placeholder="Enter your Email" onChange={getemail} />
            <br />
            <input type="password" placeholder="Enter your Password" onChange={getpassword} />
            <br />
            <button onClick={Loginform}>Login</button>
            <br />
            <p className="messa">{message}</p>
          </center>
        </div>
      )}
    </>
  );
}
