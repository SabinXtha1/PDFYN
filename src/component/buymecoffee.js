"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Heart, CupSoda, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BuyMeCoffee() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="">
      <section className="w-full flex justify-center  py-12 md:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container overflow-x-hidden px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative m-4 "
              animate={{ rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute -inset-1 rounded-full blur-md bg-amber-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovering ? 0.7 : 0,
                  scale: isHovering ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative bg-gray-800 p-4 rounded-full"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Coffee className="h-12 w-12 text-amber-400" />
              </motion.div>
            </motion.div>

            <div className="space-y-3">
              <motion.h2
                className="text-3xl font-bold tracking-tighter  sm:text-4xl md:text-5xl text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Fuel My Creativity
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                If you enjoy my work and want to support me, consider buying me
                a coffee. Every cup helps me create more awesome content!
              </motion.p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/payment-method/coffee">
                <motion.button
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-8 text-sm font-medium text-gray-200 shadow-sm transition-colors hover:bg-gray-700  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 hover:text-yellow-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CupSoda className="h-5 w-5 hover:text-amber-800 hover:animate-bounce " />

                  <span>Buy Me a Coffee</span>
                  <motion.div
                    className=" -right-1 -top-1  flex   h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-amber-500 shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",

                      stiffness: 500,

                      damping: 15,

                      delay: 0.8,
                    }}
                  >
                    <Heart className="h-3 w-3 fill-current" />
                  </motion.div>
                </motion.button>
              </Link>

              <Link href="/payment-method/support">
                <motion.button
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-8 text-sm font-medium text-gray-200 shadow-sm transition-colors hover:bg-gray-700 hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Become a Supporter</span>
                </motion.button>
                </Link>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="flex -space-x-2"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-gray-800 bg-gray-700"
                  />
                ))}
              </motion.div>
              <span>Joined by 142 coffee lovers</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
