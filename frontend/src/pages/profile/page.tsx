import React from 'react';
import { FaInfo, FaUser, FaCamera } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoMdMail } from "react-icons/io";

import { useAuth } from '../../store/useAuth'; // Assuming you have a useAuth hook to get user data

const Profile = () => {
  const { authUser, updateProfile } = useAuth();

  // format data with month and year
  const formattedDate = authUser?.createdAt ? new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(authUser.createdAt)) : '';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('profilePic', e.target.files[0]);
      const res = await updateProfile(formData);
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 dark:bg-base-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-base-200 p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <h2 className='dark:text-base-content text-2xl mb-3'>Profile</h2>
          <div className="relative">
            <img
              src={authUser?.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-base-200"
            />
            <label htmlFor="profilePic" className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full cursor-pointer shadow-lg">
              <FaCamera className="text-white" />
            </label>
            <input 
              type="file" 
              id="profilePic" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
          <h2 className="text-xl font-semibold text-base-content mt-4">{authUser?.fullname || 'Full Name'}</h2>
          <p className="text-gray-500">{authUser?.email || 'Email Address'}</p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              readOnly
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Full Name"
              value={authUser?.fullname || ''}
            />
            <FaUser className="absolute inset-y-0 left-3 top-4 text-gray-500" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              readOnly
              type="email"
              className="input input-bordered w-full pl-10"
              placeholder="Email Address"
              value={authUser?.email || ''}
            />
            <IoMdMail className="absolute inset-y-0 left-3 top-4 text-gray-500" />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-base-content">Account Information</h3>
          <div className="mt-4 flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between gap-2">
              <div className='flex items-center justify-center gap-1'>
                <SlCalender className="text-gray-500" />
                <span>Member Since:</span>
              </div>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className='flex items-center justify-center gap-1'>
                <FaInfo className="text-gray-500" />
                <span>Account status</span>
              </div>
              <span className='text-emerald-600'>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;