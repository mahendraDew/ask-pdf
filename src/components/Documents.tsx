import React from 'react'
import UploadPDF from './UploadPDF'
import PDfCards from './PDfCards'

function Documents () {
  return (
    <div className='flex flex-wrap p-5 bg-zinc-100 dark:bg-zinc-800 justify-center lg:justify-start rounded-sm gap-5 max-w-6xl mx-auto mt-5'>
      {/* mapp through all the docs */}
      <UploadPDF />
      <div className=' w-full h-full flex justify-center items-center'>
        <PDfCards />
      </div>
    </div>
  )
}

export default Documents
