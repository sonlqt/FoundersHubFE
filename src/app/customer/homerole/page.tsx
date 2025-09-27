import Advertisements from '@/app/customer/homerole/components/Advertisements'
import FilterSearch from '@/app/customer/homerole/components/FilterSearch'
import HeroSection from '@/app/customer/homerole/components/HeroSection'
import ProjectList from '@/app/customer/homerole/components/ProjectList'
import React from 'react'

export default function Homepage() {
    return (
        <div>
            <HeroSection />
            <FilterSearch />
            <div className="grid grid-cols-6 px-20 gap-10">
               <div className="col col-span-4">
                 <ProjectList />
               </div>
               <div className=" col col-span-2 flex items-center">
                <Advertisements/>
               </div>
            </div>
        </div>
    )
}
