import { SearchResponse, ServicePackage } from "./type";


export type SearchParams = {
  page?: number;          
  size?: number;          
  sortBy?: string;        
  sortDir?: "asc" | "desc";
};

export async function searchServicePackages({
  page = 1,
  size = 9,
  sortBy = "createdAt",
  sortDir = "desc",
}: SearchParams = {}) {
  const url = new URL(`https://foundershub.nducky.id.vn/api/service-packages/search`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));
  url.searchParams.set("sortBy", sortBy);
  url.searchParams.set("sortDir", sortDir);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as SearchResponse;
  return json.data;
}


export async function fetchServicePackageById(id: string): Promise<ServicePackage> {
  const res = await fetch(`https://foundershub.nducky.id.vn/api/service-packages/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch package ${id}`);
  }
  const json = await res.json(); // { code, message, data }
  return json.data as ServicePackage;
}

