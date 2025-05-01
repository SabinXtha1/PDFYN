"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const paymentMethods = [
  { name: "eSewa", color: "bg-green-500" },
  { name: "Khalti", color: "bg-purple-500" },
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
}

export default function PaymentMethods({add}) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const { push } = useRouter()

  const handlePayment = (method) => {
    switch (method) {
      case "eSewa":
        push(`/esewa-payment/${add}`)
        break
      case "Khalti":
        push(`/khalti-payment/${add}`)
        break
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-black to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-30"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <Card className="w-full border-slate-700 bg-slate-900 shadow-lg">
          <CardHeader className="pb-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CardTitle className="text-2xl font-bold text-white">Choose Payment Method</CardTitle>
              <CardDescription className="mt-2 text-slate-300">Select your preferred payment option</CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="grid gap-4 pb-2">
            <AnimatePresence mode="wait">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.name}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  
                >
                  <Button
                    variant="outline"
                    className={cn(

                      "w-full justify-start  text-left font-normal relative overflow-hidden transition-all duration-300 h-14 text-white hover:text-black",
                      selectedMethod === method.name
                        ? "border-2 bg-primary/20 border-primary"
                        : "border border-slate-700 bg-slate-800/50",
                    )}
                    onClick={() => setSelectedMethod(method.name)}
                  >
                   

                    <motion.div
                      className={`mr-3 h-5 w-5 rounded-full ${method.color} hover:text-black`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      />
                    <span className="text-base font-medium text-yellow-600 hover:text-black">{method.name}</span>
                    {selectedMethod === method.name && (
                      <motion.div
                      className="absolute right-4"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </motion.div>
             
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="pt-4 pb-6">
            <AnimatePresence mode="wait">
              {selectedMethod && (
                <motion.div
                  className="w-full"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 shadow-primary/20"
                    onClick={() => handlePayment(selectedMethod)}
                  >
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                      Pay with {selectedMethod}
                    </motion.span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
