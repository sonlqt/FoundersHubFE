import { BadgeDelta, Card, Metric, Text } from "@tremor/react";

type KpiCardProps = {
  title: string;
  metric: string;
  delta: string;
  sub: string;
  deltaType: "moderateIncrease" | "unchanged" | "moderateDecrease";
  icon: React.ElementType;
  iconBg: string;
};

export function KpiCard({ title, metric, delta, sub, deltaType, icon: Icon, iconBg }: KpiCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <Text className="text-gray-600">{title}</Text>
        </div>
        <BadgeDelta
          deltaType={deltaType as any}
          className="!bg-transparent !text-emerald-600 !px-2 !py-0.5"
        >
          {delta}
        </BadgeDelta>
      </div>
      <Metric className="mt-4">{metric}</Metric>
      <Text className="mt-2 text-sm text-gray-500">{sub}</Text>
    </Card>
  );
}
