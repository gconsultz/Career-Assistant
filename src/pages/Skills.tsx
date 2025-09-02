// src/pages/Skills.tsx
import { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SkillsPage() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <BookOpen className="mr-2 text-indigo-600" /> Skills Tracking
      </h1>

      {/* Add Skill Card */}
      <Card className="max-w-lg mb-6 p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Add New Skill</h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button onClick={addSkill} variant="secondary">
              <Plus size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, idx) => (
          <Card key={idx} className="p-4">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">{skill}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Tracking progress for {skill}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
