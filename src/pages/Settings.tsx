// src/pages/Settings.tsx
import { useState } from "react";
import { Settings } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Settings saved:", { fullName, email });
    alert("✅ Settings updated successfully!");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Settings className="mr-2 text-gray-700" /> Account Settings
      </h1>

      <Card className="max-w-lg p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Profile Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
