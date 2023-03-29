import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [zipcodeEntry, zipcodeUpdate] = useState(0);
  const [nameEntry, nameUpdate] = useState("");
  const [password, setPassword] = useState('');

  const validateFormFields = () => nameEntry !== '' && password !== '';

  const submitUserInfo = (e) => {
    e.preventDefault()
    fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: nameEntry,
          password: password,
          zipcode: zipcodeEntry
        }),
      })
      .then((data) => console.log(data));
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
          onChange={(e) => nameUpdate(e.target.value)}
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
          id="zipcodeInput"
          name="zipcode"
          placeholder="Zip Code"
          required
          onChange={(e) => zipcodeUpdate(e.target.value)}
        ></input>
            <button id="submitButton" type="submit">
                Submit
            </button>
      </form>


    </div>
  );
}

export default SignUp;
