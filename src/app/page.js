
import Features from '@/component/Feature'
import { Cover } from '@/components/ui/cover'
import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'

const page = () => {
  return (
    <div className='bg-black w-full'>
    <HeroParallax products={products}/>
    <div className='w-full flex justify-center'>

    <Features/>
    </div>
    <div>
    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 h-[300px] py-6 bg-clip-text  bg-gradient-to-b text-white from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing Certificate with Your & Company Name <br /> at <Cover>warp speed</Cover>
      </h1>
    </div>
    </div>
  )
}

export default page

export const products = [
  {
    title: "Employee Certificate",
    link: "/certificates",
    thumbnail:
      "/n1.png",
  },
  {
    title: "Certificate of Achievement",
    link: "/cert",
    thumbnail:
      "/n2.png",
  },
  {
    title: "Domain Registration Letter",
    link: "/nepal-domain",
    thumbnail:
      "/n3.png",
  },

  {
    title: "Certificate of Appreciation",
    link: "/certificates",
    thumbnail:
      "/n4.png",
  },
  {
    title: "Participation Certificate",
    link: "/certificates",
    thumbnail:
      "n5.png",
  },
  {
    title: "Mooooo",
    link: "/certificates",
    thumbnail:
      "/N6.png",
  },
  
  {
    title: "Profession Certificate",
    link: "/certificates",
    thumbnail:
      "/N8.png",
  },

  {
    title: "Membership Certificate",
    link: "/certificates",
    thumbnail:
      "/N9.png",
  },
  {
    title: "Rooooo",
    link: "/certificates",
    thumbnail:
      "N10.png",
  },
  {
    title: "Edit Sec",
    link: "/certificates",
    thumbnail:
      "N11.png",
  },
]
