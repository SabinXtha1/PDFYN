"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { FileText, Download, ImageIcon, BadgeCheck } from "lucide-react"
import { Cover } from "@/components/ui/cover"

const features = [
  {
    name: "Easy Certificate Creation",
    description: "Create stunning certificates in just a few clicks with ready-to-use templates.",
    icon: FileText,
  },
  {
    name: "Download as PDF File",
    description: "Export certificates as high-quality PDFs instantly.",
    icon: Download,
  },
  {
    name: "Background Customization",
    description: "Personalize certificates with custom backgrounds, colors, and logos.",
    icon: ImageIcon,
  },
  {
    name: "Usage Limit & Plans",
    description: "Track free uses and upgrade to premium plans for unlimited access.",
    icon: BadgeCheck,
  },
]

export function Feature() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={sectionRef} className="container space-y-16 p-10 relative overflow-hidden flex flex-col justify-center">
      
      {/* Section heading with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold max-w-7xl mx-auto text-center mt-20 relative z-20  bg-clip-text text-white space-y-6" >
          <span className="text-4xl font-bold font-serif md:text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Powerful Features
          </span>
          <br /> Everything you need to create professional certificates in minutes <Cover>warp speed</Cover>
        </h2>
      
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />

      {/* Features grid with staggered animation */}
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 place-items-center text-white text-center justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants} className="w-full">
            <CardSpotlight className="flex flex-col items-center w-[300px] md:w-[500px] lg:w-[100%] justify-center gap-6 p-6 min-h-[280px]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <feature.icon className="h-10 w-10 text-blue-400" />
                <h3 className="font-bold text-xl">{feature.name}</h3>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="mt-4 text-muted-foreground"
              >
                {feature.description}
              </motion.p>
            </CardSpotlight>
          </motion.div>
        ))}
      </motion.div>

      {/* Steps section with animation */}
    
         <motion.div variants={itemVariants}  className="flex flex-col items-center">
         <CardSpotlight className={" flex flex-col items-center py-20  min-w-[350px] md:min-w-[600px]  justify-center gap-6 p-6 "}>

        <h3 className="text-2xl font-bold text-white  text-center">How It Works</h3>
        <ul className="space-y-4">
          <Step title="Choose from our professionally designed certificate templates" />
          <Step title="Customize with your content, colors, and branding" />
          <Step title="Preview your certificate in real-time" />
          <Step title="Download as a high-quality PDF ready for printing or sharing" />
        </ul>
         </CardSpotlight>
         </motion.div>
    
    </section>
  )
}

const Step = ({ title }) => {
  return (
    <motion.li
      className="flex gap-2 items-start"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <CheckIcon />
      <p className="text-white">{title}</p>
    </motion.li>
  )
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  )
}
