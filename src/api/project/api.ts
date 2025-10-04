import { Project } from '@/api/project/type'

export async function getProjects(): Promise<Project[]> {
  const res = await fetch('https://foundershub.nducky.id.vn/api/projects', {
    cache: 'no-store', // luôn fetch mới, có thể đổi sang { next: { revalidate: 60 } }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
const json = await res.json(); // { code, message, data }
  return json.data;
}

export async function fetchProjectById(id: string): Promise<Project> {
  const res = await fetch(`https://foundershub.nducky.id.vn/api/projects/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch package ${id}`);
  }
  const json = await res.json(); // { code, message, data }
  return json.data as Project;
}