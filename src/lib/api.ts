import { Project } from '@/type/project'

export async function getProjects(): Promise<Project[]> {
  const res = await fetch('https://670f54293e7151861657584e.mockapi.io/SE180427', {
    cache: 'no-store', // luôn fetch mới, có thể đổi sang { next: { revalidate: 60 } }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }

  return res.json()
}
