'use client'

import { FileText, Download, Image, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

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
    icon: Image,
  },
  {
    name: "Usage Limit & Plans",
    description: "Track free uses and upgrade to premium plans for unlimited access.",
    icon: BadgeCheck,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem]  text-center text-white">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Powerful Certificate Generator</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Design and deliver beautiful certificates effortlessly with our intuitive tools.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 place-items-center">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-blue-100 p-8 text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-4">
              <feature.icon className="h-10 w-10 text-primary" />
              <h3 className="font-bold text-xl">{feature.name}</h3>
            </div>
            <p className="mt-4 text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
