import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../provider/AuthContext';
import { useContext, useEffect } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email : "", 
        password: ""
    })

    const {
      user,
      setUser,
      isLoading,
      authenticated,
      setAuthenticated,
    } = useContext(AuthContext);

    const handleChange =(e) => {
        const {name, value } = e.target;
        setCredentials({...credentials, [name] : value})
    }

    useEffect(() => {
      if (!isLoading) {
        if (authenticated) {
          navigate(`/`);
        }
      }
    }, [isLoading, authenticated]);

    const handleLogin =async (e) => {
      e.preventDefault();

      const response = await fetch ('http://localhost:5000/api/loginUser',
      {
        method: 'POST', 
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const json = await response.json();
      
      if(!json.success)
      {
        console.log('invalid user');
      }
      if(json.success){
        setUser(json.user);
        setAuthenticated(true);
        localStorage.setItem('token', json.token);
        console.log("login successful");
        navigate('/')
      }
    }


  return (
    <div>
      <form>
        <input type="text" name='email' placeholder='Email...' onChange={handleChange}/>
        <input type="text" name='password' placeholder='Password' onChange={handleChange}/>
        <input type="submit" onClick={handleLogin} />
      </form>
    </div>
  )
}

export default Login
