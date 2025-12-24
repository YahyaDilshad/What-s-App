import React from 'react'

const ProfileInfo = () => {
    
// const handleImageUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
  
//   reader.readAsDataURL(file);
//   reader.onload = async () => {
//     const profileimage = reader.result;
//     setSelectedImage(profileimage);
//     // Here you can set the profile picture in the auth store
//     await updateprofile({ profilepic: profileimage });
//   };
// };
  return (
    <div>
            {/* Profile avatar */}
   {/* <div className='profileImage relative'>
      <img src={selectedImage ? selectedImage : authuser?.profilepic || 'https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg'} 
      alt="Profile picture"
      className='mb-4 w-24 h-24 border-1 rounded-full' />
      <label 
      htmlFor="Upload Image"
      className={`
      mb-2 absolute bottom-0 right-0 p-2 rounded-full hover:scale-105 transition-all ease-in cursor-pointer bg-gray-700 
      ${isupdatingprofile ? 'text-gray-300' : ''}`}>
      <Camera />
      <input 
      type="file"
      id="Upload Image"
      className='hidden'
      onChange={handleImageUpload}
      accept="image/*"
      disabled={isupdatingprofile}
       />
</label>
      </div> */}
    </div>
  )
}

export default ProfileInfo