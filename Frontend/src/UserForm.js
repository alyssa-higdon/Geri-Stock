import React, {useState} from "react";
var SHA256 = require("crypto-js/sha256");

function UserForm(props){
    const [person, setPerson] = useState(
        {
            name: "",
            username: "",
            password: "",
            role: "",
        }
    );
    
    function handleChange(event) {
        const { name, value } = event.target;
        setPerson((prevPerson) => ({
          ...prevPerson,
          [name]: value,
        }));
      }
      

      function submitForm() {
        if (person.password === person.passwordReentry) {
          if (person.password.length >= 8) {
            person.password = String(SHA256(person.password));
            props.handleSubmit(person);
            setPerson({
              name: "",
              username: "",
              role: "",
              password: "",
              passwordReentry: "",
            });
          } else {
            alert("Password must be at least 8 characters long!");
          }
        } else {
          alert("Passwords do not match!");
        }
      }
      
      

    return (
        <form>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={person.name}
            onChange={handleChange}
          />
      
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={person.username}
            onChange={handleChange}
          />
      
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            id="role"
            value={person.role}
            onChange={handleChange}
          />
      
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={person.password}
            onChange={handleChange}
          />
      
          <label htmlFor="passwordReentry">Re-enter Password</label>
          <input
            type="password"
            name="passwordReentry"
            id="passwordReentry"
            value={person.passwordReentry}
            onChange={handleChange}
          />
      
          <input type="button" value="Submit" onClick={submitForm} />
        </form>
      );
      
}



export default UserForm;