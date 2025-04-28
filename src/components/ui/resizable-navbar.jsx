"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Home, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScroll } from "framer-motion"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollState = () => {
      // Check if scrolled past threshold
      setIsScrolled(window.scrollY > 50)

      // Hide navbar on scroll down, show on scroll up
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", updateScrollState)
    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [lastScrollY])

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Certificates", href: "/certificates", icon: <FileText size={18} /> },
    { name: "Domain CL", href: "/nepal-domain", icon: <FileText size={18} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={18} /> },
  ]

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/100 backdrop-blur-md border-b border-black/80 ",
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-black/80" : "border-black/80",
        )}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="container mx-auto px-4 flex justify-between items-center"
          initial={{ height: 80 }}
          animate={{ height: isScrolled ? 70 : 80 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href="/"
            className="flex items-center gap-2"
            initial={{ scale: 1 }}
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          >
           
            <span className=" text-white text-2xl  logo">PDFBY</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-4">
              <motion.button
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
