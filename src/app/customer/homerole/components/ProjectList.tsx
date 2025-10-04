import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/api/project/api'
import { Project } from '@/api/project/type'

function getValidImage(url?: string) {
  if (!url) return "/default_project_image.jpg";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return "/default_project_image.jpg";
}

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
            {/* <p className="text-sm py-1 px-2 bg-amber-200 inline-block absolute rounded-br-lg top-0 left-0 text-gray-500">{p.category}</p> */}
            <div className="mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={getValidImage(p.managerId?.image)}
                alt={p.name}
                width={400}
                height={225}
                className="h-full w-full object-cover object-center"
              />
            </div>


            <p className="font-extrabold line-clamp-1 text-3xl">{p.name}</p>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3 h-[4.5em]">
              {p.description}
            </p>
            <div className="flex justify-between text-xs font-bold mt-2">
              <span>{p.managerId?.fullName}</span>
              <span>{p.startDate}</span>
            </div>
            <div className="mt-3 bg-[#0081FE] p-2 text-center rounded-tl-[30px] rounded-bl-[10px] rounded-br-[30px] rounded-tr-[10px]">
              <Link className=" text-amber-50 " href={`/customer/project/${p.id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
