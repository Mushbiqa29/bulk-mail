import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Loginuser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const logindata = await axios.post("https://bulkmai-backend-3.onrender.com/loginuser", { "email": email, "password": password })
    if (logindata.data === false) {
      alert("Invalid email or password")
    } else {
      localStorage.setItem('userEmail', email)
      navigate("/home")
    }
  }

  return (
    <>
   
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent1 p-4'>
          <div className='bg-white rounded-lg shadow-2xl p-8 w-full max-w-md hover-effect'>
            <h1 className='text-3xl font-bold text-center text-primary mb-6 font-neue-machina'>User Login</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <input
                type="email"
                className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors'
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className='btn-3d py-3 px-6 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors'
                type='submit'
              >
                Login
              </button>
            </form>
            <div className='mt-4 text-center'>
              <p className='text-gray-600'>Don't have an account? <Link to="/signup" className='text-primary hover:underline'>Sign Up</Link></p>
              <Link to="/loginadmin" className='block mt-2 text-accent1 hover:underline'>Admin Login</Link>
            </div>
          </div>
        </div>
    
    </>
  )
}

export default Loginuser




