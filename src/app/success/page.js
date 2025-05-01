"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import axios from "axios"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  useEffect(() => {
    let isMounted = true
    const handleapi = async () => {
      try {
        const amount = localStorage.getItem("amount")
        const name = localStorage.getItem("username")
  
        const res = await axios.post("/api/userdata", { amount, name })
        if (isMounted && res.status === 200) {
          localStorage.removeItem("amount")
          localStorage.removeItem("username")
        }
      } catch (e) {
        console.error(e)
      }
    }
  
    handleapi()
  
    return () => {
      isMounted = false
    }
  }, [])
  useEffect(() => {
    if (method) {
      console.log(`Payment successful via ${method}`)
    }
  }, [method])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="w-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="relative"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(34, 197, 94, 0)",
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                      "0 0 0px rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 rounded-full"
                />
                <CheckCircle className="w-20 h-20 text-green-500" />
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <CardTitle className="text-center text-2xl font-bold text-green-400">Payment Successful!</CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center text-zinc-300">
                <p className="mb-3">Thank you for your payment. Your transaction has been completed successfully.</p>
                {method && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="inline-block px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700"
                  >
                    <p className="text-sm text-zinc-300">
                      Payment method: <span className="font-semibold text-purple-400">{method}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                asChild
                className="w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white text-zinc-200 group"
              >
                <Link href="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Return to Home
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
            className="text-zinc-400"
          >
            Loading...
          </motion.div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
