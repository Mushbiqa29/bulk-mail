import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Admindashboard = () => {
  const [groupedUserDetails, setGroupedUserDetails] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("https://bulkmai-backend-3.onrender.com/admindashboard")
      const data = response.data

      const grouped = data.reduce((acc, item) => {
        if (!acc[item.email]) {
          acc[item.email] = []
        }
        acc[item.email].push(item)
        return acc
      }, {})
      setGroupedUserDetails(grouped)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bulkmai-backend-3.onrender.com/admindashboard/${id}`)

      fetchData()
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/loginadmin')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary to-accent2 p-4 md:p-6'>
      <div className='max-w-full md:max-w-7xl mx-auto b rounded-xl shadow-2xl p-6 md:p-10 '>
        <div className='flex  md:flex-row justify-between items-center mb-6 md:mb-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-white font-neue-machina mb-4 md:mb-0'>Admin Dashboard</h1>
          <button
            className='btn-3d py-2 px-6 md:py-3 md:px-8 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {Object.keys(groupedUserDetails).length === 0 ? (
          <p className='text-center text-white mt-8 font-neue-machina'>No user details available.</p>
        ) : (
          <div className='space-y-6 md:space-y-10'>
            {Object.entries(groupedUserDetails).map(([email, mails]) => (
              <div key={email} className='border border-gray-300 rounded-xl p-4 md:p-8 hover-effect bg-gray-50'>
                <h2 className='text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6 font-neue-machina'>User: {mails[0].username} ({email})</h2>
                <div className='overflow-x-auto'>
                  <table className='w-full table-auto border-collapse border border-gray-300 bg-white rounded-lg'>
                    <thead>
                      <tr className='bg-primary text-white'>
                        <th className='border border-gray-300 p-2 md:p-4 font-neue-machina text-left'>Subject</th>
                        <th className='border border-gray-300 p-2 md:p-4 font-neue-machina text-left'>Message</th>
                        <th className='border border-gray-300 p-2 md:p-4 font-neue-machina text-left'>Recipient List</th>
                        <th className='border border-gray-300 p-2 md:p-4 font-neue-machina text-center'>Status</th>
                        <th className='border border-gray-300 p-2 md:p-4 font-neue-machina text-center'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mails.map((mail) => (
                        <tr key={mail._id} className='hover:bg-gray-100 transition-colors '>
                          <td className='border border-gray-300 p-2 md:p-4 font-neue-machina'>{mail.subject || 'Not sent yet'}</td>
                          <td className='border border-gray-300 p-2 md:p-4 max-w-xs break-words font-neue-machina'>{mail.message || 'Not sent yet'}</td>
                          <td className='border border-gray-300 p-2 md:p-4 max-w-xs break-words'>
                            {mail.recipientList && mail.recipientList.length > 0 ? (
                              <div className='flex flex-wrap gap-1 md:gap-2'>
                                {mail.recipientList.map((recipient, index) => (
                                  <span key={index} className='bg-accent1 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-neue-machina'>
                                    {recipient}
                                  </span>
                                ))}
                              </div>
                            ) : <span className='font-neue-machina'>No recipients</span>}
                          </td>
                          <td className='border border-gray-300 p-2 md:p-4 text-center '>
                            <span className={`    font-semibold  font-neue-machina text-xs md:text-sm ${mail.status === 'sent' ? 'text-accent2' : 'text-secondary'}`}>
                              {mail.status === 'sent' ? 'Sent' : 'Not Sent'}
                            </span>
                          </td>
                          <td className='border border-gray-300 p-2 md:p-4 text-center'>
                            <button
                              className='btn-3d py-2 px-6 text-black font-semibold rounded-lg hover:bg-secondary-dark transition-colors font-neue-machina'
                              onClick={() => handleDelete(mail._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admindashboard
