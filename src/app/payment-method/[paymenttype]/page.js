"use client"
import PaymentMethods from '@/component/paymentMethod'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const {paymenttype} = useParams()
  console.log("Hello",paymenttype);
  
  return (
    <div>
        <PaymentMethods add={paymenttype}/>
    </div>
  )
}

export default Page