import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [mail, setMail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Confirm password must be the same as the previous one")
    } else if (password.length < 6) {
      alert("Password length must be at least 6 digits")
    } else {
      try {
        const signupdata = await axios.post("https://bulkmai-backend-3.onrender.com/signup", { "name": name, "password": password, "email": mail })
        if (signupdata.data === true) {
          localStorage.setItem('userEmail', mail)
          navigate("/home")
        } else {
          alert('User already exists')
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-accent2 to-accent3 p-4'>
      <div className='bg-white rounded-lg shadow-2xl p-8 w-full max-w-md '>
        <h1 className='text-3xl font-bold text-center text-accent2 mb-6 font-neue-machina'>User Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type="text"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-accent2 transition-colors'
            placeholder='Enter your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-accent2 transition-colors'
            placeholder='Enter your email'
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <input
            type="password"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-accent2 transition-colors'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className='border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-accent2 transition-colors'
            placeholder='Repeat your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className='btn-3d py-3 px-6 bg-accent2 text-black font-semibold rounded-lg hover:bg-accent2-dark transition-colors'
            type='submit'
          >
            Sign Up
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-600'>Already have an account? <Link to="/" className='text-accent2 hover:underline'>Log in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
