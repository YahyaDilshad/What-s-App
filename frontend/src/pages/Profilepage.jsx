import React from 'react'
import useAuthStore from "../store/useauthstore.js";

const Profilepage = () => {
   const { authuser } = useAuthStore();
  return (
    <div>Profilepage</div>
  )
}

export default Profilepage