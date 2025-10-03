import { ServicePackage } from "@/api/service/type";
import { BriefcaseBusiness, CalendarDays, CircleCheckBig } from "lucide-react";
import Image from "next/image";

export default function PackageInfo({ pkg }: { pkg: ServicePackage }) {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center">{pkg.name}</h1>

            <section className="bg-white border rounded-lg p-6 space-y-6">
                {/* Ảnh */}
                <div className="relative w-full h-64">
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover" // không rounded
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Overview */}
                <div>
                    <h2 className="text-xl font-bold">Overview & Benefit</h2>
                    <p className="mt-2 text-gray-700">{pkg.description}</p>
                </div>

                {/* Key Benefit */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Key Benefit</h3>
                    <ul className="space-y-2">
                        {pkg.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-500">
                                    <CircleCheckBig />
                                </span>
                                <span className="text-gray-700">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* What's included */}
            <section className="bg-white border rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-bold">What’s Included</h2>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Service Scope</h2>
                    <ul className="text-gray-700 space-y-1">
                        {pkg.serviceScope.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-500">
                                    <BriefcaseBusiness />
                                </span>
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Estimated Delivery Time</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {pkg.estimatedDelivery.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-500"><CalendarDays /></span>
                                <span>{d}</span>
                                </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-gray-50 border rounded-lg p-6 space-y-3">
                <h2 className="text-xl font-bold">Pricing and Next Step</h2>
                <div className="space-y-2">
                    <p className="font-medium text-blue-600 text-xl">
                        {pkg.price.toLocaleString()} VND{" "}
                        {pkg.discountPercent > 0 && (
                            <span className="ml-2 text-green-600">-{pkg.discountPercent}%</span>
                        )}
                    </p>
                    <p className="text-sm text-gray-600">
                        Duration: {pkg.durationMonths} months
                    </p>
                </div>
            </section>

        </div>
    );
}
