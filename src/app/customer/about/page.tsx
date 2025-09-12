import React from 'react'
import Image from 'next/image'

export default function About() {
    return (
        <div className="min-h-screen box-border text-center mx-36">
            <Image
                src="/about.svg"
                alt="Logo"
                width={200}
                height={200}
                className="w-full"
            >
            </Image>
            <div className="aboutus">
                <p className="font-bold text-3xl">ABOUT US</p>
                <p className="px-30 py-5">Welcome to Founders Hub – the comprehensive platform dedicated to empowering the Vietnamese startup ecosystem.
                    We firmly believe that every groundbreaking idea deserves robust support to flourish.
                    Founders Hub is meticulously designed to be the definitive companion for founders, guiding them from initial concept to successful realization.
                </p>
                <div className="relative flex h-64 mt-10 mb-10">
                    <div className="w-1/2  absolute left-3 z-20">
                        <p className="text-left px-6 font-bold text-2xl text-[#125B90] mt-12">
                            OUR VISION
                        </p>
                        <p className="  rounded-2xl bg-white shadow-2xl text-left px-6 py-4 ">
                            FoundersHub envisions becoming the preeminent and most trusted platform within Vietnam’s
                            startup landscape. We foresee a future where innovative concepts are meticulously nurtured,
                            high-potential ventures are strategically connected with optimal resources,
                            and the entire startup community collaborates synergistically to achieve sustainable growth,
                            ultimately contributing profoundly to the nation’s economic prosperity.
                        </p>
                    </div>

                    <div className="w-1/2 absolute right-3 z-10">
                        <p className="text-right px-6 font-bold text-2xl text-[#125B90]">
                            OUR MISSION
                        </p>
                        <p className=" rounded-2xl shadow-2xl text-right px-6 py-4">
                            FoundersHub’s mission is to build a strong startup ecosystem where founders can find all the resources
                            they need to grow their projects. We are committed to providing valuable tools, services, knowledge,
                            and connections that help reduce risk and increase the chances of success for startups.
                        </p>
                    </div>
                </div>

                <div className="problemsolve">
                    <p className="font-bold text-3xl">
                        WHAT PROBLEMS DO WE SOLVE?
                    </p>
                    <p className="px-30 py-5">
                        We recognize that the entrepreneurial journey is inherently complex and fraught with formidable challenges.
                        FoundersHub is purpose-built to strategically address the fundamental hurdles commonly encountered by founders
                    </p>
                    <div className="grid grid-cols-2 gap-15 my-10">
                        <div className="shadow-xl relative rounded-xl pt-5 pb-3 px-5">
                            <Image
                                src="/Document.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                                className=" absolute -top-6 left-1/2 bg-white"
                            >
                            </Image>
                            <p className=" pb-3 font-bold">Knowledge & Experience Gap</p>
                            <p> Bridging this gap through expert-led workshops, comprehensive courses, and bespoke mentorship programs</p>
                        </div>
                        <div className="shadow-xl relative rounded-xl pt-5 pb-3 px-5">
                            <Image
                                src="/Arrows.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                                className=" absolute -top-6 left-1/2 bg-white"
                            >
                            </Image>
                            <p className=" px-3 font-bold">Scaling difficulties</p>
                            <p> Providing tools and strategies for sustainable growth.</p>
                        </div>

                        <div className="shadow-xl relative rounded-xl pt-5 pb-3 px-5">
                            <Image
                                src="/dollar.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                                className=" absolute -top-6 left-1/2 bg-white"
                            >
                            </Image>
                            <p className="font-bold">Capital Access Barriers</p>
                            <p> Facilitating strategic introductions to a diverse network of angel investors, venture capitalists, and funding institutions.</p>
                        </div>
                        <div className="shadow-xl relative rounded-2xl pt-5 pb-3 px-5">
                            <Image
                                src="/person.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                                className=" absolute -top-6 left-1/2 bg-white"
                            >
                            </Image>
                            <p className=" font-bold">Lack of connections</p>
                            <p>  Creating an environment for learning, sharing, and collaboration among founders, experts, and mentors.</p>
                        </div>
                    </div>

                </div>
                <div className="feature">
                    <p className="font-bold text-3xl">KEY FEATURES OF FOUNDERS HUB</p>
                    <div className="grid grid-cols-2 gap-x-15 gap-y-5 my-10">
                        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-[#eef6ff] to-[#d2e6ff] p-5">
                            <p className="font-bold">Project Management</p>
                            <p> Tools to effectively organize, track progress, and manage resources.</p>
                        </div>
                        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-[#eef6ff] to-[#d2e6ff] p-5">
                            <p className="font-bold">Recruitment and Collaboration</p>
                            <p> A platform to connect team members, partners, and collaborators.</p>
                        </div>
                        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-[#eef6ff] to-[#d2e6ff] p-5">
                            <p className="font-bold">Service Library</p>
                            <p> A collection of essential services for startups (legal, accounting, marketing...).</p>
                        </div>
                        <div className="rounded-2xl shadow-xl bg-gradient-to-r from-[#eef6ff] to-[#d2e6ff] p-5">
                            <p className="font-bold">Community Forum</p>
                            <p>  A place to share knowledge, experiences, and seek support from the community.</p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <div className="rounded-2xl shadow-xl bg-gradient-to-r from-[#eef6ff] to-[#d2e6ff] p-5">
                                <p className="font-bold">User Profiles</p>
                                <p> Building personal brands and professional connections.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}
