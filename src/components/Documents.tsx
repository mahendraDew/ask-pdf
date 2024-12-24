import React from 'react'
import UploadPDF from './UploadDoc'

function Documents () {
  return (
    <div className='flex flex-wrap p-5 bg-zinc-100 dark:bg-zinc-800 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto'>
      {/* mapp through all the docs */}
      <UploadPDF />
    </div>
  )
}

export default Documents
