import { Project } from '@/type/project'
import { Package } from '@/type/service'

export async function getProjects(): Promise<Project[]> {
  const res = await fetch('https://670f54293e7151861657584e.mockapi.io/SE180427', {
    cache: 'no-store', // luôn fetch mới, có thể đổi sang { next: { revalidate: 60 } }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }

  return res.json()
}

export async function getPackage(): Promise<Package[]> {
  const res = await fetch('http://206.189.86.37:2609/api/service-packages', {
    cache: 'no-store', // luôn fetch mới, có thể đổi sang { next: { revalidate: 60 } }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch service packages')
  }
  const json = await res.json()
  return json.data
}
