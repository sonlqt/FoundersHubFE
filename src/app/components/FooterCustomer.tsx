import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function FooterCustomer() {
    return (

        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 ">
                <p className="text-[#505050] font-semibold">
                    KHƠI Ý TƯỞNG, KHỞI THÀNH CÔNG
                </p>
                <p className="font-semibold font-serif text-3xl">
                    Request More Information
                </p>
                <p className="w-[400px] text-center text-[#0A142F]">
                    Lot E2a-7, D1 Street, High-Tech Park, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City, Vietnam.
                </p>
                <p className="text-[#0A142F]">
                    Foundershub.se@gmail.com
                </p>
                <div className=" bg-[#0081FE] p-4 inline-block rounded-[30px]">
                    <Link className="px-4 text-amber-50" href="/customer/contact"> Contact us</Link>
                </div>
                
            </div>
            <p className="text-[#505050] text-center">
                    © All rights reserved 2024 Founders Hub
                </p>
            <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    <p className="font-bold  text-[#480000]">FoundersHub</p>
                </div>

                <div className="flex items-center gap-7 text-sm">
                    <Link href="/customer/blog">Team</Link>
                    <Link href="/customer/myproject">Case Studies</Link>
                    <Link href="/customer/service">Publications</Link>
                </div>

                <div className="flex items-center gap-2">
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                </div>
            </div>
        </div>
    )
}
