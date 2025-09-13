import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bell } from 'lucide-react';
import { Settings } from 'lucide-react';

export default function NavbarCustomer() {
    return (
        <div>
            <div className="flex justify-between ">
                <Link href="/customer/homerole" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    <p className="font-bold text-4xl text-[#480000]">FoundersHub</p>
                </div>
                </Link>
                <div className="flex items-center gap-7 text-[#480000] font-semibold">
                    <Link href="/customer/blog">Blog</Link>
                    <Link href="/customer/myproject">My Project</Link>
                    <Link href="/customer/about">About Us</Link>
                    <Link href="/customer/service">Service</Link>
                </div>

                <div className="flex items-center gap-2">
                    <Bell />
                    <Settings />
                    <Link href="/customer/profile">
                    <Image src="/globe.svg" alt="Avatar" width={30} height={30} className="rounded-full" />
                    </Link>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
