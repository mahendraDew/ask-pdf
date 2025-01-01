'use client'
import { motion } from 'framer-motion'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FileCheck2, FileUp, LogOut, Menu, X } from 'lucide-react'
import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import ModeToggle from './mode-toggle'
import { redirect } from 'next/navigation'

// import { redirect } from 'next/navigation'

export function Header () {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const { signOut } = useClerk()

  const { user } = useUser()
  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (shimmerRef.current) {
      shimmerRef.current.style.left = '-100%'
      shimmerRef.current.style.transition = 'left 0.3s ease-out'
      setTimeout(() => {
        if (shimmerRef.current) {
          shimmerRef.current.style.left = '100%'
        }
      }, 50)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (shimmerRef.current) {
      shimmerRef.current.style.left = '100%'
      shimmerRef.current.style.transition = 'left 0.3s ease-out'
      setTimeout(() => {
        if (shimmerRef.current) {
          shimmerRef.current.style.left = '-100%'
        }
      }, 50)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full px-2 py-2 flex justify-center items-center z-40 fixed'
    >
      <nav className=' w-full bg-blue-400/20 p-1 mx-auto rounded-lg flex items-center justify-between '>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='size-8 flex justify-center items-center rounded bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]'>
            <FileCheck2 className='text-white' />
          </div>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className='md:hidden'>
          <button onClick={toggleMobileMenu} className='focus:outline-none'>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className='hidden md:flex items-center justify-center  space-x-4'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={'/chats'}>
              <Button
                variant='ghost'
                size='icon'
                className=' w-7 h-7 bg-transparent border-none rounded-full'
              >
                <FileUp />
              </Button>
            </Link>
          </motion.div>
          <ModeToggle />
          <div>
            {/* <SignOutButton /> */}
            {/* <Signout /> */}
          </div>
          {/* <div className='w-full h-full flex justify-center items-center'>
             <SignedIn>
               <UserButton afterSignOutUrl='/' />
             </SignedIn>
           </div> */}
          {user && (
            <div
              className='relative flex justify-center items-center'
              ref={dropdownRef}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full  h-full flex justify-center items-center'
              >
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={toggleExpand}
                  className='focus:outline-none  w-7 h-7 '
                  aria-expanded={isExpanded}
                  aria-haspopup='true'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className='relative overflow-hidden rounded-full'>
                    <Image
                      src={user.imageUrl}
                      alt='User profile'
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <div
                      ref={shimmerRef}
                      className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent'
                      style={{
                        left: '-100%',
                        opacity: isHovering ? 0.5 : 0,
                        transition: 'opacity 0.3s ease-out'
                      }}
                    />
                  </div>
                </Button>
              </motion.div>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='absolute right-0 top-8 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-md shadow-lg py-1 z-10'>
                    <div className='px-4 py-2 border-b'>
                      <div className='flex items-center space-x-3'>
                        <Image
                          src={user.imageUrl}
                          alt='User profile'
                          width={40}
                          height={40}
                          className='rounded-full'
                        />
                        <div>
                          <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {user?.fullName}
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {user?.emailAddresses[0].emailAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                      <Button
                        variant={'default'}
                        className='mt-1 bg-transparent hover:bg-gray-300 text-gray-800  dark:text-gray-200 dark:hover:text-gray-900  px-4 py-2 text-sm w-full '
                        onClick={async () => {
                          await signOut({ redirectUrl: '/' })
                          redirect('/')
                        }}
                      >
                        <span className='flex justify-left items-center gap-2'>
                          <LogOut /> Sign out
                        </span>
                      </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-neutral-900 shadow-md z-20'>
            <div className='flex flex-col items-center py-4 space-y-4'>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={'/chats'}>
                  <Button
                    variant='ghost'
                    size='icon'
                    className=' w-7 h-7 bg-transparent border-none rounded-full'
                  >
                    <FileUp />
                  </Button>
                </Link>
              </motion.div>
              <ModeToggle />
              {user && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* <SignOutButton redirectUrl='/'> */}
                      <Button
                        variant={'default'}
                        className='mt-1 bg-transparent hover:bg-gray-300 text-gray-800  dark:text-gray-200 dark:hover:text-gray-900  px-4 py-2 text-sm w-full '
                        onClick={async () => {
                          await signOut({ redirectUrl: '/' })
                          redirect('/')
                        }}
                      >
                        <span className='flex justify-left items-center gap-2'>
                          <LogOut /> Sign out
                        </span>
                      </Button>
                    {/* </SignOutButton> */}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='flex items-center space-x-3'>
                      <Image
                        src={user?.imageUrl}
                        alt='User profile'
                        width={40}
                        height={40}
                        className='rounded-full'
                      />
                      <div>
                        <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                          {user?.fullName}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {user?.emailAddresses[0].emailAddress}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  )
}
