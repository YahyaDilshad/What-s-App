import React from 'react'
import useAuthStore from "../store/useauthstore.js";

const Settingpage = () => {
  const { authuser } = useAuthStore();
  return (
    <div>Settingpage</div>
  )
}

export default Settingpage