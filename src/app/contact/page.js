"use client"

import { motion } from "framer-motion"
import { Dot, Loader2, Star, Github, Linkedin, Mail, MessageCircle, Send, User } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setFormData({ name: '', email: '', message: '' })
      // Show success message
      alert("Message sent successfully!")
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 400, damping: 10 } },
  }

  return (
    <div className='text-white overflow-x-hidden'>
      <motion.div 
        className='w-screen flex items-center justify-center flex-col font-serif gap-10 lg:h-screen md:h-screen lg:mt-10'
        style={{
          backgroundColor: "black",
          backgroundImage: `radial-gradient(circle, rgba(6,128,212,0.4) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundRepeat: "repeat",
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className='w-[80%] gap-2 flex flex-col mt-[100px] lg:mt-0' variants={itemVariants}>
          <motion.h1 
            className='text-green-400 flex items-center gap-2'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Star className='text-green-400' />
            <span className='text-3xl font-bold'>Connect With Me</span>
          </motion.h1>
          <motion.h1 
            className='text-white text-4xl'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's Start A Project Together
          </motion.h1>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 w-[80%] gap-10'>
          <motion.div 
            className='bg-black p-2 rounded-xl'
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <motion.div 
                className='flex flex-col'
                variants={itemVariants}
              >
                <span className="flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </span>
                <input 
                  name='name' 
                  placeholder='Enter Your Name' 
                  value={formData.name} 
                  onChange={handleChange} 
                  className='bg-black rounded border-[0.5px] border-opacity-55 p-2 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all' 
                />
              </motion.div>

              <motion.div 
                className='flex flex-col'
                variants={itemVariants}
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </span>
                <input 
                  name='email' 
                  placeholder='Enter Your Email' 
                  value={formData.email} 
                  onChange={handleChange} 
                  className='bg-black rounded border p-2 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all' 
                />
              </motion.div>

              <motion.div 
                className='flex flex-col'
                variants={itemVariants}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  Message
                </span>
                <textarea 
                  name='message' 
                  placeholder='Enter Your Message' 
                  value={formData.message} 
                  onChange={handleChange} 
                  className='bg-black rounded border p-2 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-green-400 transition-all' 
                />
              </motion.div>

              <motion.button 
                className='border rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-green-400 hover:text-black hover:border-green-400 transition-all'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                variants={itemVariants}
              >
                {loading ? 
                  <Loader2 className='animate-spin'/> : 
                  <>
                    <Send size={16} />
                    Submit
                  </>
                }
              </motion.button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div 
              className='bg-gray-900 rounded-xl p-4' 
              style={{ backgroundColor: 'rgb(17,17,22)' }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <span className='rounded-xl flex relative items-center'>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Dot className='text-green-400 w-20 h-20 absolute -left-5 -top-10 opacity-70' />
                  </motion.div>
                  <Dot className='text-green-400 w-10 h-10' /> Available For Work
                </span>
              </div>
              <div>
                <motion.div 
                  className='w-20 h-20 rounded-full m-4 bg-gradient-to-r from-green-400 to-blue-500'
                  animate={{ 
                    boxShadow: ['0 0 0 rgba(74, 222, 128, 0.4)', '0 0 20px rgba(74, 222, 128, 0.6)', '0 0 0 rgba(74, 222, 128, 0.4)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
               
                />
                <p className='p-4 opacity-70 font-serif font-extralight'>
                  My inbox is always open, Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I'll get back to you.
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <motion.div variants={iconVariants} whileHover="hover" initial="initial">
                  <Link href="https://github.com/SabinXtha1" target="_blank">
                    <span className="p-2 bg-black rounded-full inline-block">
                      <Github className="w-5 h-5" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div variants={iconVariants} whileHover="hover" initial="initial">
                  <Link href="https://www.linkedin.com/in/sabin-nayaju-72438a204/" target="_blank">
                    <span className="p-2 bg-black rounded-full inline-block">
                      <Linkedin className="w-5 h-5" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div variants={iconVariants} whileHover="hover" initial="initial">
                  <Link href="pdfyn@gmail.org">
                    <span className="p-2 bg-black rounded-full inline-block">
                      <Mail className="w-5 h-5" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
