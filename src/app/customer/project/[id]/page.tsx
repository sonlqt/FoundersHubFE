import { fetchProjectById } from "@/api/project/api";
import Image from "next/image";

function getValidImage(url?: string) {
  if (!url) return "/default_project_image.jpg";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return "/default_project_image.jpg";
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchProjectById(id);

  // fallback nếu không có manager
  const manager = project.managerId || {
    fullName: "—",
    email: "—",
    address: "—",
    image: "",
    avatarUrl: "",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold">{project.name || "—"}</h1>
      </div>

      {/* Content 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Project Info */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-2">Project Info</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-sm">{project.description || "—"}</p>
              </div>
              <div>
                <p className="font-semibold">Business Model</p>
                <p className="text-sm">{project.businessModel || "—"}</p>
              </div>
              <div>
                <p className="font-semibold">Industry</p>
                <p className="text-sm">{project.industry || "—"}</p>
              </div>
              <div>
                <p className="font-semibold">Problem to Solve</p>
                {project.problemStatements?.length ? (
                  <ul className="list-disc list-inside text-sm">
                    {project.problemStatements.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">—</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Documents & Media</h2>
            <div className="bg-gray-100 h-40 flex items-center justify-center rounded-lg border">
              <span className="text-gray-500">📂 {project.media?.length ? "Preview" : "No Media"}</span>
            </div>
            <div className="flex gap-4 mt-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Slide</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Picture</button>
            </div>
          </section>
        </div>

        {/* Right side - Founder Info */}
        <div className="space-y-6">
          <section className="bg-white border rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold mb-4">Founder Info</h2>
            <div className="flex items-center gap-3">
              <Image
                src={getValidImage(manager.image || manager.avatarUrl)}
                alt={manager.fullName}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{manager.fullName}</p>
                <p className="text-sm text-gray-600">Email: {manager.email || "—"}</p>
                <p className="text-sm text-gray-600">Address: {manager.address || "—"}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700 text-sm">
              {manager.fullName !== "—"
                ? `Founder of ${project.name || "—"}, ${manager.fullName} brings strong expertise and vision.`
                : "—"}
            </p>
          </section>

          {/* Populate */}
          <section className="bg-blue-50 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Populate</h3>
            <p className="text-sm text-gray-600">👀 Views: {project.views ?? "—"}</p>
            <p className="text-sm text-gray-600">❤️ Favorites: {project.favorites ?? "—"}</p>
          </section>

          {/* Progress */}
          <section className="bg-blue-50 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Project Progress</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-blue-500 rounded"
                  style={{ width: `${project.progress || 0}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{project.progress ?? 0}%</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
