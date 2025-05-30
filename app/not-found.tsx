import React from 'react'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
      <Image
            src="/notfound.png"
            alt="Not Found"
            width={500}
            height={500}
          />
    </div>
  )
}

export default NotFound
