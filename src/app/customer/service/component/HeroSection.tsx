import React from 'react'

export default function HeroSection() {
    return (
        <div className="py-10  flex flex-col items-center bg-[#F2F2F2] gap-15">
            <p className="text-5xl w-3xl font-bold text-center">Discover the most potential startups in Vietnam</p>
            <p className="px-100 text-center text-gray-800">Explore our carefully selected service packages,
                designed to support the growth and success of your startup.
                Find the ideal partners to expand your horizons.</p>
            <div className="px-10 flex flex-row gap-16">
                <button className="w-[200px] bg-[#0095FF] text-amber-50 text-2xl font-bold rounded-md px-6 py-4">Explore Now</button>
            </div>
        </div>
    )
}
