import { fetchServicePackageById } from "@/api/service/api";
import PackageInfo from "@/app/customer/service/[id]/component/PackageInfo";


export default async function PackageDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
  const pkg = await fetchServicePackageById(id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <PackageInfo pkg={pkg} />
    </div>
  );
}
