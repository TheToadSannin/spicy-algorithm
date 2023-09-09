import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../provider/AuthContext';
import { useContext, useEffect } from 'react';
const Login = () => {

    document.title = "Login";

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email : "", 
        password: ""
    })

    const {
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
    }, [isLoading, authenticated, navigate]);

    const handleLogin =async (e) => {
      e.preventDefault();

      const response = await fetch ('https://spicy-algorithm.onrender.com/api/loginUser',
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
        alert('invalid user');
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
    <main className='form'>
          <div className='form-box'> 
          <h1>LOGIN</h1>
            <form className='inner-form' onSubmit={handleLogin}>
              <div>
                <input required type="email" name='email' placeholder='Email...' onChange={handleChange}/>
              </div>
              <div>
                <input required type="text" name='password' placeholder='Password' onChange={handleChange}/>
              </div>
               <Link to={'/signup'}>new user?</Link>
                <input type='submit' placeholder='submit'/>
            </form>
          </div>
    </main>
  )
}

export default Login
