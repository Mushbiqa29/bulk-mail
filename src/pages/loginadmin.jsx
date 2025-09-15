import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Loginadmin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const logindata = await axios.post("https://bulkmai-backend-3.onrender.com/loginadmin", { "email": email, "password": password })
    if (logindata.data === false) {
      alert("Invalid email or password")
    } else {
      navigate("/admin")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-accent4 p-4'>
      <div className='bg-white rounded-lg shadow-2xl p-8 w-full max-w-md '>
        <h1 className='text-3xl font-bold text-center text-secondary mb-6 font-neue-machina'>Admin Login</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type="email"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-secondary transition-colors'
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-secondary transition-colors'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className='btn-3d py-3 px-6 bg-secondary text-black font-semibold rounded-lg hover:bg-secondary-dark transition-colors'
            type='submit'
          >
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <Link to="/" className='text-secondary hover:underline'>User Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Loginadmin
