"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  FileText,
  User,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Define a type for grievance data
type Grievance = {
  id: string;
  status: string;
  title: string;
  description: string;
  dateSubmitted: string;
  lastUpdated: string;
  department: string;
  priority: string;
};

// Mock grievance data - replace with actual API call
const fetchGrievanceById = async (id: string): Promise<Grievance> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // This would be replaced with an actual API call
  return {
    id,
    status: "In Progress",
    title: "Water Supply Issue",
    description: "Water supply has been interrupted for 3 days in Block B.",
    dateSubmitted: "2023-10-15",
    lastUpdated: "2023-10-17",
    department: "Water Resources",
    priority: "High",
  };
};

export default function GrievanceDetailsPage() {
  const params = useParams();
  const grievanceId = params.id as string;

  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGrievanceDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchGrievanceById(grievanceId);
        setGrievance(data);
      } catch (err) {
        setError("Failed to load grievance details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGrievanceDetails();
  }, [grievanceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="mr-2" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
        <CardFooter>
          <Link href="/track-grievance">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tracking
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (!grievance) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Grievance Not Found</CardTitle>
          <CardDescription>
            The grievance ID you entered could not be found.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/track-grievance">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tracking
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <Link href="/track-grievance">
        <Button variant="outline" className="flex items-center mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tracking
        </Button>
      </Link>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{grievance.title}</CardTitle>
              <CardDescription>Grievance ID: {grievance.id}</CardDescription>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                grievance.status === "Resolved"
                  ? "bg-green-100 text-green-800"
                  : grievance.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {grievance.status}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="flex items-center font-medium">
              <FileText className="w-4 h-4 mr-2" /> Description
            </h3>
            <p className="mt-1 text-gray-700">{grievance.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="flex items-center font-medium">
                <Calendar className="w-4 h-4 mr-2" /> Date Submitted
              </h3>
              <p className="mt-1 text-gray-700">{grievance.dateSubmitted}</p>
            </div>
            <div>
              <h3 className="flex items-center font-medium">
                <Clock className="w-4 h-4 mr-2" /> Last Updated
              </h3>
              <p className="mt-1 text-gray-700">{grievance.lastUpdated}</p>
            </div>
            <div>
              <h3 className="flex items-center font-medium">
                <User className="w-4 h-4 mr-2" /> Department
              </h3>
              <p className="mt-1 text-gray-700">{grievance.department}</p>
            </div>
            <div>
              <h3 className="flex items-center font-medium">
                <AlertCircle className="w-4 h-4 mr-2" /> Priority
              </h3>
              <p className="mt-1 text-gray-700">{grievance.priority}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
