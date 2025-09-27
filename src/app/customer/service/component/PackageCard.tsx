// components/PackageCard.tsx
import Link from "next/link";
import { ServicePackage } from "@/api/service/type";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";


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
        <Link href={p.providerId.website}>
          <span className="font-semibold text-emerald-600">{p.providerId?.name}</span>
        </Link>
      </div>

      <h3 className="line-clamp-1 text-base font-semibold">{p.name}</h3>

      <p className="mt-1 text-sm text-gray-600 line-clamp-2 h-[3em]">
        {p.description}
      </p>

     <ul className="mt-3 space-y-3 text-sm leading-6 text-gray-400">
  {Array.from({ length: 3 }).map((_, i) => {
    const feature = p.features[i]; // undefined nếu thiếu
    return (
      <li key={i} className="flex items-start gap-3" aria-hidden={!feature}>
        <CircleCheckBig
          aria-hidden
          className={`mt-0.5 size-5 shrink-0 text-blue-500 ${!feature ? "invisible" : ""}`}
          strokeWidth={2.4}
        />
        <span>{feature ?? "\u00A0"}</span>
      </li>
    );
  })}
</ul>


      <div className="mt-3 border-t pt-3 text-lg text-center font-bold">
        {p.price} {p.currency}/service
      </div>

      <div className="mt-3">
        <Link
          href={`/customer/service/${p.id}`}
          className="block rounded-md bg-[#0081FE] py-2 text-center font-semibold text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
