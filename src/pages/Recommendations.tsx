// src/pages/Recommendations.tsx
import { Target } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

export default function RecommendationsPage() {
  const recommendations = [
    "Learn GraphQL to complement your React skills",
    "Build a portfolio project with TypeScript",
    "Practice system design for senior-level interviews",
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Target className="mr-2 text-emerald-600" /> Career Recommendations
      </h1>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <Card key={idx} className="p-4">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Recommendation {idx + 1}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{rec}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
