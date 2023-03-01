import React, {useState} from "react";

function LogInForm(props){
    const [person, setPerson] = useState(
        {
            name: "",
            username: "",
            password: "",
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
        setPerson({
            username: "",
            password: "",
          });
      }
      
      

    return (
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={person.username}
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
      
          <input type="button" value="Submit" onClick={submitForm} />
        </form>
      );
      
}



export default LogInForm;