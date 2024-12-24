'use client'
// import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Quintessential } from 'next/font/google'
import Image from 'next/image'
import { Features } from '@/data/landing/Features'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const quintessential = Quintessential({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
})

import { ReactNode } from 'react'
import Link from 'next/link'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
}

const AnimatedSection = ({ children, delay = 0 }: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Home () {
  return (
    <div className='h-full w-full flex flex-col'>
      {/* <div className='min-h-screen w-full flex flex-col bg-gradient-radial from-blue-400 via-blue-300  to-transparent'> */}
      {/* <Header /> */}

      <main className='flex-1  flex flex-col items-center justify-center '>
        <div className='w-full max-w-3xl mx-auto text-center space-y-28 '>
          <AnimatedSection>
            <div className='w-full mt-20 flex justify-center items-center'>
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
          </AnimatedSection>

          <AnimatedSection>
            <div className='relative flex flex-col items-center  justify-center gap-10'>
              <div className='flex gap-7 flex-col'>
                <h1
                  className={`text-4xl md:text-7xl font-normal tracking-tight text-gray-900 dark:text-white`}
                >
                  <em className={`italic ${quintessential.className}`}>
                    ask your pdf
                  </em>
                </h1>
                <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                  Get instant answers to your questions <br />
                  Simplify questions and Amplify understanding
                </p>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Link href={"/signin"}>
                <Button className='bg-blue-500/80 hover:bg-blue-600 text-white'>
                  Get Started
                </Button>
                </Link>
                <Link href={"/chats"}>
                <Button variant='outline' className='border-blue-500/50'>
                  Chats
                </Button>
                </Link>
              </div>

              <div className='absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl'>
                <div className='absolute top-24 left-24 w-56 h-56 bg-violet-600/80 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl'></div>
                <div className='absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600/80 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl'></div>
                <div className='absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600/80 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl'></div>
              </div>
            </div>
          </AnimatedSection>

          {/* hero image */}
          <AnimatedSection delay={0.2}>
            <div className='relative overflow-hidden pt-16'>
              <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <Image
                  src={'/hero-img.png'}
                  width={1920}
                  height={921}
                  alt='hero-img'
                  className='mr-[-0%] rounded-lg shadow-2xl dark:shadow-white/20 ring-1 ring-gray-900/10'
                />
                <div className='relative' aria-hidden='true'>
                  <div className='absolute bg-gradient-to-t from-white/95 dark:from-zinc-950 p-[5%] bottom-0 -inset-x-32' />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* features */}
          <AnimatedSection delay={0.3}>
            <div className='flex gap-3 flex-col'>
              <h1
                className={`text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white`}
              >
                <em className={`italic ${quintessential.className}`}>
                  PDF Interactions Made Simple
                </em>
              </h1>
              <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                Summarize, compare, and ask questions to any PDF. <br />
                Fast, free, and no sign-up required.
              </p>
            </div>
            <div className='mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8'>
              <dl className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'>
                {Features.map((feature, index) => (
                  <AnimatedSection
                    key={feature.title}
                    delay={0.4 + index * 0.1}
                  >
                    <div className='relative pl-9 text-left'>
                      <dt className='inline font-semibold text-gray-900'>
                        <feature.icon className='absolute left-1 top-1 h-5 w-5 text-blue-500' />
                      </dt>
                      <div>
                        <dd className='font-semibold'>{feature.title}</dd>
                        <dd>{feature.description}</dd>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </dl>
            </div>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection delay={0.5}>
            <div className='w-full flex flex-col gap-10'>
              <div className='flex gap-3 flex-col'>
                <h1
                  className={`text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white`}
                >
                  <em className={`italic ${quintessential.className}`}>
                    Frequently Asked Questions
                  </em>
                </h1>
              </div>
              <div className='w-full px-10'>
                <Accordion
                  type='single'
                  collapsible
                  className='w-full text-left'
                >
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>
                      What is askPDF and how can it help me?
                    </AccordionTrigger>
                    <AccordionContent>
                      askPDF brings the power of conversational AI to your
                      documents, letting you chat with your PDFs as easily as
                      using ChatGPT. Whether you&apos;re studying, researching, or
                      analyzing documents, our platform helps you understand and
                      extract information in seconds, backed up by the latest
                      PDF AI technology.{' '}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-2'>
                    <AccordionTrigger>Is askPDF free?</AccordionTrigger>
                    <AccordionContent>
                      We offer a free plan that lets you analyze 2 documents
                      every day. For power users, our askPDF Plus plan provides
                      unlimited document analysis, and more advanced features.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-3'>
                    <AccordionTrigger>
                      How does askPDF&apos;s AI technology work?
                    </AccordionTrigger>
                    <AccordionContent>
                      askPDF uses sophisticated AI to build a comprehensive map
                      of your document&apos;s content and meaning. When you chat with
                      your PDF, our system quickly identifies relevant
                      information and generates clear, accurate responses -
                      complete with citations to help you verify sources and
                      explore further.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-4'>
                    <AccordionTrigger>
                      Can I chat with multiple files at the same time?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! Simply create a folder, add your files, and askPDF
                      will understand relationships across all documents. Ask
                      questions that reference multiple sources, compare
                      content, or find connections between different documents -
                      all in one conversation.{' '}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-5'>
                    <AccordionTrigger>
                      Why use askPDF instead of ChatGPT for PDF analysis?
                    </AccordionTrigger>
                    <AccordionContent>
                      askPDF is purpose-built for document analysis with
                      features you won&apos;t find in general AI tools. Our intuitive
                      side-by-side interface displays your chat and document
                      together, while clickable citations instantly scroll to
                      the exact source in your PDF. This specialized design
                      makes document understanding faster and more reliable than
                      anywhere else.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.6}>
            <div className='relative w-full flex flex-col gap-6 py-52 bg-blue-500/10 rounded-lg'>
              <div className='absolute top-2 left-2 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute top-2 right-2 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute bottom-2 left-2 size-1 bg-blue-500/40 rounded-full' />
              <div className='absolute bottom-2 right-2 size-1 bg-blue-500/40 rounded-full' />
              <div className='flex gap-3 flex-col'>
                <h1
                  className={`text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white`}
                >
                  <em className={`italic ${quintessential.className}`}>
                    askPDF
                  </em>
                </h1>
                <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                  Get Accurate Answers About Any PDF with ChatGPT&apos;s AI-Powered
                  Platform
                </p>
              </div>
              <div className='w-full'>
                <Button className='bg-blue-500/80 hover:bg-blue-600 text-white'>
                  Try it Now
                </Button>{' '}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}
