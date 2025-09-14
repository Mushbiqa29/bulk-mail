import React, { useState } from 'react'
import axios from 'axios' 
import * as XLSX from 'xlsx'
const mail = () => {
const[message,setMessage]=useState('')
const[sendingmail,setSendingMail]=useState(false)
const[emaillist,setEmailList]=useState([])
 async function sendMail(){
  try{
       if(message.trim()===''){
      alert("Please type your message")
    }
    else if(emaillist.length===0){
      alert("Please upload your xl file That have emails")
    }
    else{
 setSendingMail(true)
  let responce= await axios.post("http://localhost:8000/messagesend",{"message":message,"emaillist":emaillist})
  if(responce.data===true){
    console.log("message send successfully")
    setSendingMail(false)
    alert("mail send successfully")
  }
  else{
    console.log("failed to send")
  }
    }
   
  }
catch(err){
  console.log("request not send",err.message)
}

 }

  return (
    <div>
        <h1 className='p-5 bg-blue-950 text-white font-bold text-xl'>BulkMail</h1>
        <p className='p-2 bg-blue-700 text-white '>We can help business with sending multiple emails at once </p>
        <p className='p-3 bg-blue-800 text-white font-bold'> Drag and Drop your CSV file</p>
        <div className='p-5 bg-blue-500 flex  flex-col items-center '>
        <textarea name="" id="" placeholder='Enter Your Mail Text ' className='border border-black rounded-md w-[40vw] h-[20vw] p-2' onChange={(e)=>{setMessage(e.target.value)}}></textarea>
    <div className='border border-dashed border-white p-3 mt-5'>
      <input type="file" onChange={(e)=>{
        const file=e.target.files[0]
        const reader = new FileReader()
        reader.onload=function(event){
         const data= event.target.result
          const workbook=XLSX.read(data,{type:"binary"})
          const sheetname= workbook.SheetNames[0]
const worksheet=workbook.Sheets[sheetname]
const emailsdata=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
const emails=emailsdata.map((item)=>item.A)
console.log(emails)
setEmailList(emails)
        }
        reader.readAsBinaryString(file)
      }}/>
      </div>
      <p className='mt-5 font-medium'>
        Total Email in This File:{emaillist.length}
      </p>
      <button className='bg-blue-950 font-medium px-4 py-2 rounded-md hover:bg-blue-800 text-white mt-5'onClick={sendMail}>{sendingmail===true?"sending....":"send"}</button>
        </div>
        <div className='bg-blue-300 p-9'>

        </div>
        <div className='bg-blue-400 p-8'>

        </div>
    </div>
  )
}

export default mail