import React, {  useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'


const Signup = () => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        fullname:"", 
        email:"", 
        password:"", 
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCredentials({...credentials, [name]:value});
    }

    const handleSubmit = async(e) => {   
        e.preventDefault();
        
        const reponse = await fetch('https://spicy-algorithm.onrender.com/api/createUser', {
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
        if(!json.success)
        {
            alert('something went wrong')
        }
        if(json.success){
            navigate('/login');
        }

    }


  return (
    <main className='form'>
      <div className='form-box'>
        <h1>SIGNUP</h1>
        <form onSubmit={handleSubmit} className='inner-form'>
            <div>
                    <input type="text" name='fullname' placeholder='Full Name' value={credentials.fullname} onChange={handleChange}/>
                </div>
            <div>
                <input type="text" name='email' placeholder='Email' onChange={handleChange} value={credentials.email} />
            </div>
            <div>
                <input type="text" name='password' placeholder='Password' onChange={handleChange} value={credentials.password} />
            </div>
                <Link to={'/login'}>Already a user?</Link>
                <input type='submit' placeholder='Submit'/>
        </form>
      </div>
    </main>
  )
}

export default Signup