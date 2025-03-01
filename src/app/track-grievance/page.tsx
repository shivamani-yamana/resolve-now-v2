"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

export default function TrackGrievancePage() {
  const [grievanceId, setGrievanceId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!grievanceId.trim()) {
      setError("Please enter a grievance ID");
      return;
    }

    // Redirect to the specific grievance page
    router.push(`/track-grievance/${grievanceId.trim()}`);
  };

  return (
    <div className="container max-w-md py-10 mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Track Your Grievance</CardTitle>
          <CardDescription>
            Enter your grievance ID to check its status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="grievanceId"
                placeholder="Enter Grievance ID"
                value={grievanceId}
                onChange={(e) => {
                  setGrievanceId(e.target.value);
                  setError("");
                }}
                className="w-full"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Track Grievance
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
