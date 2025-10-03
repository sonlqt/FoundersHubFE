import { ServicePackage } from "@/api/service/type";

export default function PackageFeatures({ pkg }: { pkg: ServicePackage }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Features</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <h2 className="text-lg font-semibold mt-4 mb-2">Service Scope</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {pkg.serviceScope.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h2 className="text-lg font-semibold mt-4 mb-2">Estimated Delivery</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {pkg.estimatedDelivery.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
    </div>
  );
}
