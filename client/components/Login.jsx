import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
 

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  


  // const handleChange = () => {
  //   setZipcode(document.getElementById("zipcodeInput").value);
  //   setName(document.getElementById("nameInput").value.toUpperCase());

  // };

  async function handleOnClickLogin() {
    await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
    // .then((response) => {
    //   console.log('this is the response --> ', response);
    //   response.json()})
    .then((data) => {
      console.log(data);
      console.log('this is data.status ---> ', data.status)
      if (data.status === 200) {
        console.log('correct data status')
        setIsLoggedIn(true);
        navigate('/home', {state:{ name: name, password: password }});
        // window.location.href = 'http://localhost:8080/home';
      } else {
        navigate('/signup')
        console.error();
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div id="loginElements">
      <form className="flex">
        <input
          id="nameInput"
          name="username"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type='password'
          id="passwordInput"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        
      </form>
      <button id="loginButton" onClick={handleOnClickLogin}
          state={{ name: name, password: password }}>
          <div className="sunnyD-img"></div>
      </button>
      <button id='signupButton'>
        <Link to="/signup">
          Signup for the Sunny D
        </Link>
      </button>
    </div>
  );
}

export default Login;
