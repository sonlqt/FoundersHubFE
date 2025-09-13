import React from 'react'

export default function HeroSection() {
  return (
    <div className="py-10  flex flex-col items-center bg-gradient-to-b from-[#3967F2] to-[#C5D8FF] gap-15">
        <p className=" text-amber-50 text-5xl w-3xl font-bold text-center">Discover the most potential startups in Vietnam</p>
        <div  className="px-10 flex flex-row gap-16">
            <button className="w-[200px] bg-amber-50 text-2xl font-bold rounded-md px-6 py-4">Explore Now</button>
            <button className="w-[200px] bg-gradient-to-l from-[#3967F2] to-[#6992e5] border-3 boder-amber-50 text-2xl text-amber-50 font-bold rounded-md px-6 py-4">Contact</button>
        </div>
    </div>
  )
}
