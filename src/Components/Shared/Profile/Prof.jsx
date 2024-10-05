import { useState } from "react"

export default function Prof({name,email,role}) {
    const [userName,setUserName]=useState(name)
    const [useremail,setUserEmail]=useState(email)
    const [userrole,setUserRole]=useState(role) 
    const [flag,setFlag]=useState(false)
    const handleChange=(e)=>{
        setUserName(e.target.value)
        setFlag(true)
    }
    const handleChange1=(e)=>{
        setUserEmail(e.target.value)
        setFlag(true)

    }
  return (
    <div className="bg-white p-16 rounded-lg border-r-2git w-96 mb-6">
    <h2 className="text-3xl font-extrabold   mb-6">Profile</h2>
    <div className="space-y-4 h-3/4">
      <div>
        <label className="block text-lg  font-medium text-gray-700">Username</label>
        <input type="text" value={userName} className="mt-1 block w-full text-xl font-bold border  p-2 rounded-xl" onChange={handleChange}/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="text" value={useremail} className="mt-1 block w-full text-xl font-bold border  p-2 rounded-xl" onChange={handleChange1}/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <p className="mt-1 text-lg font-semibold text-gray-900">{userrole}</p>
      </div>
    </div>
    <div className="flex gap-5 w-full">
      <button className={`bg-blue-100 text-white py-1  px-9  rounded-3xl text-xl hover:bg-blue-400 cursor-pointer ${flag ? "block" : "hidden"}`}>Update</button>
      <button className="bg-red-100 text-white px-9 py-1 w-40 rounded-3xl text-xl hover:bg-red-400 cursor-pointer">Delete Account</button>
    </div>
  </div>
  )
}
