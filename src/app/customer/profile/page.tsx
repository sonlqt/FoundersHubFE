import React from 'react'
import Image from 'next/image'
import profiles from "../../mock/profile.json"
import { Profiles } from '@/type/profile'
import Link from 'next/link'

export default function Profile() {
    return (
        <div className='min-h-screen flex flex-col gap-4 px-10'>
            <div className=" bg-gradient-to-r from-[#b6d3f1] to-[#fdf7e1] h-32 "></div>

            <div className="px-10 ">
                {profiles.map((profile: Profiles) => (
                    <div key={profile.id} className="flex flex-col gap-6">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    width={150}
                                    height={150}
                                    className="w-[100px] h-[100px] rounded-full "
                                />
                                <div>
                                    <div className="font-bold">
                                        {profile.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {profile.email}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className=" bg-[#0081FE] rounded-[5px] px-2 py-1 text-amber-50 ">Change Password</p>
                            </div>

                        </div>
                        <div className="flex gap-3 ">
                            <div className="flex flex-col flex-1 gap-2">
                                <div>
                                    <label className="block mb-1">Date of birth</label>
                                    <input
                                        type="text"
                                        value={profile.dob}
                                        readOnly
                                        className="w-full rounded text-gray-500 px-3 py-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Gender</label>
                                    <input
                                        type="text"
                                        value={profile.gender}
                                        readOnly
                                        className="w-full text-gray-500 rounded px-3 py-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={profile.address}
                                        readOnly
                                        className="w-full text-gray-500 rounded px-3 py-2 bg-gray-100"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <div>
                                    <label className="block mb-1">Role</label>
                                    <input
                                        type="text"
                                        value={profile.role}
                                        readOnly
                                        className="w-full text-gray-500 rounded px-3 py-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={profile.phone}
                                        readOnly
                                        className="w-full text-gray-500 rounded px-3 py-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Social Network</label>
                                    <div className="flex gap-5">
                                        {profile.socials.github &&
                                            <Link href={profile.socials.github} className="">
                                                <Image src="/image 253.png" alt="gitHub" width={30} height={30} />
                                            </Link>
                                        }

                                        {profile.socials.linkedin &&
                                            <Link href={profile.socials.linkedin} className="">
                                                <Image src="/image 251.png" alt="linkedin" width={30} height={30} />
                                            </Link>
                                        }

                                        {profile.socials.twitter &&
                                            <Link href={profile.socials.twitter} className="">
                                                <Image src="/image 252.png" alt="twitter" width={30} height={30} />

                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Bio</label>
                            <input
                                type="text"
                                value={profile.bio}
                                readOnly
                                className="w-full text-gray-500 rounded px-3 py-2 bg-gray-100"
                            />
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
