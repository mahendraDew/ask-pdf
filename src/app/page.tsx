import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Quintessential, Charm } from 'next/font/google'

const quintessential = Quintessential({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
})
const charm = Charm({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
})

export default function Home () {
  return (
    <div className='min-h-screen bg-background bg-[linear-gradient(180deg,_#5e79f044_0%) flex flex-col'>
      <Header />

      <main className='flex-1  flex flex-col items-center justify-center px-4 py-16 md:py-24'>
        <div className='w-full max-w-3xl mx-auto text-center space-y-8'>
          <div className='w-full  flex justify-center items-center'>
            <div className='relative flex justify-center gap-2 bg-blue-500/10 text-blue-500 p-2 rounded-lg'>
              <div className='absolute top-1 left-1 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute top-1 right-1 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute bottom-1 left-1 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute bottom-1 right-1 size-1 bg-blue-500/40 rounded-full' />
              <span className='inline-flex items-center rounded-lg px-2 py-1 text-xs bg-white shadow-sm'>
                Waitlist v1
              </span>
              <span className='inline-flex items-center rounded-lg px-2 py-1 text-xs bg-white shadow-sm'>
                Coming Soon
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between w-full h-full gap-32'>
            <div className='flex gap-3 flex-col'>
              <h1
                className={`text-4xl md:text-7xl font-normal tracking-tight text-gray-900 dark:text-white`}
              >
                ask your{' '}
                <em className={`italic ${quintessential.className}`}>pdf</em>
              </h1>
              <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                Get instant answers to your questions <br />
                Simplify questions and Amplify understanding
              </p>
            </div>
            {/* <WaitlistForm /> */}
            <div className=' w-full h-full  flex justify-center items-center'>
              <h1
                className={`${charm.className} text-4xl text-gray-900 dark:text-gray-300 flex`}
              >
                Launching Soon
                <div className='flex items-end p-1 space-x-1'>
                  <span className='w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-100'></span>
                  <span className='w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-200'></span>
                  <span className='w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-300'></span>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
