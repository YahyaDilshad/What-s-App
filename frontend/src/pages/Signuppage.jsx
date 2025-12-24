import React, { useState } from 'react'
import useAuthStore from "../store/useauthstore.js";
import { MessageSquare , Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Signuppage = () => {
  
 
  const [Formdata, setFormdata] = useState({
    fullname: { firstname: "", lastname: "" },
    email: "",
    password: "",
  })

 const { signup , isSignup } = useAuthStore();
 const formvalidate = () => {
  if (!Formdata.fullname.firstname.trim() || !Formdata.fullname.lastname.trim()) {toast.error("fullname is required");return false;}
  if (!Formdata.email.trim()) {toast.error("email is required");return false;}
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Formdata.email)) {toast.error("email is invalid");return false;}
  if (!Formdata.password.trim()) {toast.error("password is required");return false;}
  if (Formdata.password.length < 6) {toast.error("password must be at least 6 characters long"); return false;}
  return true;
  
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = formvalidate();
    if(!success) return;  // agar validation fail hai to return karo
     
const payload = {
  fullname: {
    firstname: Formdata.fullname.firstname,
    lastname: Formdata.fullname.lastname,
  },
  email: Formdata.email,
  password: Formdata.password,
  profilepic: ""   // agar optional bhi hai to bhejna acha hai
};

signup(payload);
}
  return (
    

    <div className='signup-container flex items-center justify-center h-screen w-full'>
      {/* right */}
      <div className='w-[40%] flex text-center flex-col items-center justify-center h-screen'>

       <div className='flex flex-col items-center mb-10 '>

         <MessageSquare className='text-purple-500 mb-4 h-12 w-12 p-3 rounded-md bg-gray-800' />
        <h1 className='text-3xl font-bold'>Create Account</h1>
        <p className='text-gray-600 mt-1 text-lg'>Sign up to get started For free</p>
       </div>
        <form className='signup-form w-[70%] text-left' onSubmit={handleSubmit}>
  <p className='text-lg mb-2'>Fullname</p>
  <div className='flex gap-5'>
    <input
      className='w-[47%] p-3 mb-4 outline-none border border-gray-300 rounded-md'
      type="text"
      placeholder="First Name"
      value={Formdata.fullname.firstname}
      onChange={(e) => setFormdata({ ...Formdata, fullname: { ...Formdata.fullname, firstname: e.target.value } })}
    />
    <input
      className='w-[47%] p-3 mb-4 outline-none border border-gray-300 rounded-md'
      type="text"
      placeholder="Last Name"
      value={Formdata.fullname.lastname}
      onChange={(e) => setFormdata({ ...Formdata, fullname: { ...Formdata.fullname, lastname: e.target.value } })}
    />
  </div>

  <p className='text-lg mb-2'>Email</p>
  <input
    className='w-full p-3 mb-4 outline-none border border-gray-300 rounded-md'
    type="email"
    placeholder="Email"
    value={Formdata.email}
    onChange={(e) => setFormdata({ ...Formdata, email: e.target.value })}
  />

  <p className='text-lg mb-2'>Password</p>
  <div className='w-full flex items-center rounded-md border border-gray-300'>
    <input
      className='w-full p-3 mb-1 outline-none'
      type="password"
      placeholder="Password"
      value={Formdata.password}
      onChange={(e) => setFormdata({ ...Formdata, password: e.target.value })}
    />
    <Eye className='text-gray-500 mr-2 cursor-pointer' />
  </div>

  <button
    type="submit"
    disabled={isSignup}
    className='cursor-pointer w-full p-3 mt-4 text-white bg-purple-500 rounded-md'
  >
    {isSignup ? "Signing up..." : "Sign Up"}
  </button>
</form>

      <p className='mt-7'>You already have an account? <Link to="/signin" className='text-purple-500'>Login</Link></p>
      </div>

      {/* left */}
      <div className='w-[60%] rounded-l-4xl bg-[#141b22a8] h-screen flex flex-col items-center justify-center '>
      <h1 className='text-4xl font-bold text-center text-white'>Welcome to What's App</h1>
      <p className='text-lg text-center text-white'>Please sign up to continue</p>
      </div>
      </div>

  )

}

export default Signuppage