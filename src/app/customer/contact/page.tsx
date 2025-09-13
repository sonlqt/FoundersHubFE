import React from 'react'
import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPinned } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
    return (
        <div className="  px-40 py-10 ">
            <div className="grid grid-cols-7 gap-5 shadow-xl  rounded-md">
                <div className="information relative overflow-hidden col-span-3 bg-[#0095FF] rounded-l-md p-8">
                    <p className="font-semibold text-3xl text-amber-50 mb-3">Contact Information</p>
                    <p className="text-amber-50 mb-20">Say something to start a live chat!</p>
                    <div className="text-amber-50 flex gap-2 mb-10">
                        <PhoneCall className="mx-2" />
                        <p>+1012 3456 789</p>
                    </div>
                    <div className="text-amber-50 flex gap-2 mb-10">
                        <Mail className="mx-2" />
                        <p>Foundershub.se@gmail.com</p>
                    </div>
                    <div className="text-amber-50 flex gap-2 mb-50">
                        <MapPinned size={38} className="mx-2" />
                        <p>Lot E2a-7, D1 Street, High-Tech Park, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City, Vietnam.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-sky-400 rounded-full">
                            <Image
                                src="/twitter.svg"
                                alt="twitter"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full">
                            <Image
                                src="/ins.svg"
                                alt="instagram"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-full">
                            <Image
                                src="/discord.svg"
                                alt="discord"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#024A98] opacity-23 rounded-full"></div>
                    <div className="absolute bottom-10 right-20 w-36 h-36 bg-[#68AEFF] opacity-53 rounded-full"></div>
                </div>
                <div className="form col-span-4 p-4">
                    <p className="font-bold text-3xl text-center mb-3">Contact Us</p>
                    <p className="text-center font-semibold text-gray-700">Any question or remarks? Just write us a message!</p>
                    <form className="grid grid-cols-2 gap-8 mt-8">
                        <div className="mb-4">
                            <label className="block mb-2">First Name</label>
                            <input type="text" placeholder="First Name" className=" border-b-2 w-full focus:outline-none" />
                        </div>
                        <div>
                            <label className="block mb-2">Last Name</label>
                            <input type="email" placeholder="Last Name" className=" border-b-2 w-full focus:outline-none" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input type="text" placeholder="Email" className="border-b-2 w-full focus:outline-none" />
                        </div>
                        <div>
                            <label className="block mb-2">Phone Number</label>
                            <input type="text" placeholder="Phone Number" className="border-b-2 w-full focus:outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2">Message</label>
                            <textarea placeholder="Write your message" className="border-b-2 w-full focus:outline-none"></textarea>

                        </div>
                    </form>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-32 ">Send Message</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
