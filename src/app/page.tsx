import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <Link href="/customer/homerole" className="flex flex-col items-center gap-4">home_role_inventor</Link>
      <Link href="/customer/home" className="flex flex-col items-center gap-4">home</Link>
      
    </div>
  )
}

export default page