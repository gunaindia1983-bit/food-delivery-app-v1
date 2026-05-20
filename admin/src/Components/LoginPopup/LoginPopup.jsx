import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = () => {

  const {showLogin, setShowLogin,token,setToken} = useContext(StoreContext);
  //const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log("Form", formData);

    const response = await axios.post('http://localhost:4000/api/user/login', formData);
  

    if (response.data.success) {

      const token = response.data.token
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Login Successfull");
      console.log("Token", token); 
      setShowLogin(false);
      
    }
    else{
      toast.error(response.data.message);
    }


  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value })
  }

  //setData((data) => ({ ...data, [name]: value }));
  return (

    <div className="login-popup">

      <form onSubmit={submitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2 >Admin Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input name="email" type="email" onChange={onChangeHandler} value={formData.email} placeholder='Email id' required />
          <input name="password" type="password" onChange={onChangeHandler} value={formData.password} placeholder='Password' required />
          <br />
          {/* <button onClick={() => setShowLogin(false)}>Login</button> */}
          <button>Login</button>
        </div>

      </form>
    </div>
  )
}

export default LoginPopup;;
