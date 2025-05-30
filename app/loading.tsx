"use client"
import React from 'react'
import { SyncLoader } from "react-spinners";
const loading = () => {
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
      <SyncLoader />
    </div>
  )
}

export default loading
