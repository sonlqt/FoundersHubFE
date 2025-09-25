import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/api'
import { Project } from '@/type/project'

export default async function ProjectList() {
  let projects: Project[] = []

  try {
    projects = await getProjects()
  } catch {
    return <p className="text-red-500">Failed to load projects</p>
  }

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Projects You Might Be Interested In</h2>
      <div className="grid grid-cols-3 gap-10">
        {projects.map((p) => (
          <div key={p.id} className="card relative overflow-hidden border p-4 rounded-lg">
            <p className="text-sm py-1 px-2 bg-amber-200 inline-block absolute rounded-br-lg top-0 left-0 text-gray-500">{p.category}</p>
            <Image
              src={p.image}
              alt={p.title}
              width={200}
              height={200}
              className="rounded-lg w-full"
            />
            <p className="font-extrabold line-clamp-1 text-3xl">{p.title}</p>
            <p className="text-gray-600 line-clamp-3">{p.description}</p>
            <div className="flex justify-between text-xs font-bold mt-2">
              <span>{p.owner}</span>
              <span>{p.date}</span>
            </div>
            <div className="mt-3 bg-[#0081FE] p-2 text-center rounded-tl-[30px] rounded-bl-[10px] rounded-br-[30px] rounded-tr-[10px]">
              <Link className=" text-amber-50 " href={`/customer/projects/${p.id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
