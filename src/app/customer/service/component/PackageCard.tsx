// components/PackageCard.tsx
import Link from "next/link";
import { ServicePackage } from "@/api/service/type";
import Image from "next/image";


export default function PackageCard({ p }: { p: ServicePackage }) {

  return (
    <div className="relative flex flex-col rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
        {/* <Image
          src={p.image}
          alt={p.name}
          width={400}
          height={225}
          className="h-full w-full object-cover object-center"
        >

        </Image> */}
      </div>

      <div className="mb-1 text-xs text-gray-500">
        <span className="font-semibold text-emerald-600">{p.providerId?.name}</span>
      </div>

      <h3 className="line-clamp-1 text-base font-semibold">{p.name}</h3>

      <p className="mt-1 line-clamp-3 text-sm text-gray-600">{p.description}</p>

      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        {p.features.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-blue-500" />
            <span className="line-clamp-1">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t pt-3 text-sm font-bold">
        {p.price}{p.currency}/service
      </div>

      <div className="mt-3">
        <Link
          href={`/customer/projects/${p.id}`}
          className="block rounded-tl-[30px] rounded-tr-[10px] rounded-br-[30px] rounded-bl-[10px] bg-[#0081FE] py-2 text-center text-sm font-semibold text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
