import { body } from 'express-validator';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        fullname:"", 
        email:"", 
        password:"", 
    })
    const [errors, setErrors] = useState(null);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCredentials({...credentials, [name]:value});
    }

    const handleSubmit = async(e) => {   
        e.preventDefault();
        
        const reponse = await fetch('http://localhost:5000/api/createUser', {
            method:"POST", 
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname:credentials.fullname,
                email:credentials.email,
                password:credentials.password
            })
        });

        const json = await reponse.json();
        console.log(json);
        if(!json.sucess)
        {
            setErrors(json);
        }
        if(json.success){
            navigate('/login');
        }

    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <input type="text" name='fullname' placeholder='Full Name' value={credentials.fullname} onChange={handleChange}/>
        <input type="text" name='email' placeholder='Email' onChange={handleChange} value={credentials.email} />
        <input type="text" name='password' placeholder='Password' onChange={handleChange} value={credentials.password} />
        </div>
        <button type='submit'>
            Submit
        </button>
      </form>
    </div>
  )
}

export default Signup