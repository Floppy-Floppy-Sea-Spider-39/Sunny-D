import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState(0)
  const navigate = useNavigate();

  const validateFormFields = () => nameEntry !== '' && password !== '';

  const submitUserInfo = (e) => {
    e.preventDefault()
    fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      .then((data) => {
        console.log(data);
        navigate('/home', { state:{ zipcode: zipcode, name: username, password: password }});
      })
      // TODO: Link use on successful creation to home page
  }

  return (
    <div id="loginElements">
      <form onSubmit={submitUserInfo} className="flex">
        <input
          id="nameInput"
          name="username"
          type='text'
          placeholder="username"
          required
          onChange={(e) => setUserName(e.target.value)}
        ></input>

        <input
          id="password"
          name="password"
          placeholder="password"
          type='password'
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          id="zipcode"
          name="zipcode"
          placeholder="zipcode"
          type='text'
          required
          onChange={(e) => setZipcode(e.target.value)}
        ></input>
          <button id="submitButton" type="submit">
              Submit
          </button>
      </form>


    </div>
  );
}

export default SignUp;
