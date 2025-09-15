import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'

const Mail = () => {
  const [message, setMessage] = useState('')
  const [sendingmail, setSendingMail] = useState(false)
  const [emaillist, setEmailList] = useState([])
  const [subject, setSubject] = useState('')
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (email) {
      fetchUser(email)
    } 
  }, [])

  const fetchUser = async (email) => {
    try {
      console.log("Fetching user for email:", email)
      const response = await axios.get(`https://bulkmai-backend-3.onrender.com/user/${email}`)
      console.log("User fetch response:", response.data)
      setUser(response.data)
    } catch (err) {
      console.log("Error fetching user:", err.message)
      setStatusMessage("Failed to load user information. Please login again.")
    } finally {
      setLoadingUser(false)
    }
  }

  async function sendMail() {
    if (loadingUser) {
      setStatusMessage("Loading user information. Please wait.")
      return
    }
 
    if (subject.trim() === '') {
      setStatusMessage("Please enter your subject")
      return
    }
    if (message.trim() === '') {
      setStatusMessage("Please type your message")
      return
    }
    if (emaillist.length === 0) {
      setStatusMessage("Please upload your Xlsx file that has emails")
      return
    }

    try {
      setSendingMail(true)
      const response = await axios.post("https://bulkmai-backend-3.onrender.com/messagesend", {
        "message": message,
        "emaillist": emaillist,
        "subject": subject,
        "user": user
      })
      if (response.data === true) {
        console.log("message send successfully")
        setStatusMessage("Mail sent successfully!")
        setMessage('')
        setSubject('')
        setEmailList([])
      } else {
        console.log("failed to send")
        setStatusMessage("Failed to send mail.")
      }
    } catch (err) {
      console.log("request not send", err.message)
      setStatusMessage("Request not sent.")
    } finally {
      setSendingMail(false)
    }
  }

  return (
    <div>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8 hover-effect'>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-lg font-semibold text-primary font-neue-machina'>
            {user ? `Hi ${user.name}!` : 'Loading...'}
          </div>
          <div></div>
        </div>
        <h1 className='text-4xl font-bold text-center text-primary mb-4 font-neue-machina'>Bulk Mail</h1>
        <p className='text-center text-gray-700 mb-6'>We help businesses send multiple emails at once efficiently.</p>

        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <label className='text-lg font-semibold text-gray-800 font-neue-machina'>Subject:</label>
            <input
              type="text"
              placeholder='Enter your subject'
              className='flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors'
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <textarea
            placeholder='Enter Your Mail Text'
            className='w-full h-40 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none'
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className='border-2 border-dashed border-primary p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-colors'>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = function (event) {
                  const data = event.target.result
                  const workbook = XLSX.read(data, { type: "binary" })
                  const sheetname = workbook.SheetNames[0]
                  const worksheet = workbook.Sheets[sheetname]
                  const emailsdata = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
                  const emails = emailsdata.map((item) => item.A)
                  console.log(emails)
                  setEmailList(emails)
                }
                reader.readAsBinaryString(file)
              }}
              className='hidden'
              id='file-upload'
            />
            <label htmlFor='file-upload' className='cursor-pointer text-primary font-semibold hover:text-primary-dark'>
              Click to upload your xlsx file
            </label>
          </div>

          <p className='text-center text-lg font-medium text-gray-800'>
            Total Emails in This File: <span className='text-primary'>{emaillist.length}</span>
          </p>

          <div className='text-center'>
            <button
              className='btn-3d py-3 px-8 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors'
              onClick={sendMail}
              disabled={sendingmail}
            >
              {sendingmail ? "Sending..." : "Send"}
            </button>
          </div>

          {statusMessage && (
            <p className={`text-center text-lg font-medium mt-4 ${statusMessage.includes('successfully') ? 'text-accent2' : 'text-secondary'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mail
