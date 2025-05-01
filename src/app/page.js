"use client";
import BuyMeCoffee from "@/component/buymecoffee";
import { Feature } from "@/component/NewFeat";

import { HeroParallax } from "@/components/ui/hero-parallax";
import axios from "axios";

import React, { useEffect } from "react";

const Page = () => {
   useEffect(()=>{
    const fetchuser=async()=>{

      const data =await axios.get('/api/userdata')
      console.log(data.data.data);
      data.data.data.map((user,id)=>{
        console.log(user.name,user.amount,user.id,id)
      })
    }
    fetchuser()
       
   },[])

  return (
    <div className="bg-black ">
      <div>
        <HeroParallax products={products} />

        <div className="w-full flex justify-center overflow-hidden">
          <Feature />
        </div>
        <BuyMeCoffee />
      </div>
    </div>
  );
};

export default Page;

export const products = [
  {
    title: "Employee Certificate",
    link: "/certificates",
    thumbnail: "/n1.png",
  },
  {
    title: "Certificate of Achievement",
    link: "/cert",
    thumbnail: "/n2.png",
  },
  {
    title: "Domain Registration Letter",
    link: "/nepal-domain",
    thumbnail: "/n3.png",
  },

  {
    title: "Certificate of Appreciation",
    link: "/certificates",
    thumbnail: "/n4.png",
  },
  {
    title: "Participation Certificate",
    link: "/certificates",
    thumbnail: "n5.png",
  },
  {
    title: "Mooooo",
    link: "/certificates",
    thumbnail: "/N6.png",
  },

  {
    title: "Profession Certificate",
    link: "/certificates",
    thumbnail: "/N8.png",
  },

  {
    title: "Membership Certificate",
    link: "/certificates",
    thumbnail: "/N9.png",
  },
  {
    title: "Rooooo",
    link: "/certificates",
    thumbnail: "N10.png",
  },
  {
    title: "Edit Sec",
    link: "/certificates",
    thumbnail: "N11.png",
  },
];
