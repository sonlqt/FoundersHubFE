import HeroSection from '@/app/customer/service/component/HeroSection'
import PackageList from '@/app/customer/service/component/PackageList'

export default async function Service({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; size?: string }>
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const size = Number(params?.size ?? 6);

  return (
    <div className="flex flex-col gap-10">
      <HeroSection />
      <div className="px-20">
        <PackageList page={page} size={size} />
      </div>
    </div>
  );
}

