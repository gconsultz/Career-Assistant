import React from "react";
import { TrendingUp } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

export default function ProgressPage() {
  const progressData = [
    { skill: "React", level: 80 },
    { skill: "TypeScript", level: 65 },
    { skill: "Node.js", level: 50 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" /> Progress Tracking
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {progressData.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <h2 className="text-lg font-semibold">{item.skill}</h2>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${item.level}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.level}% complete</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
