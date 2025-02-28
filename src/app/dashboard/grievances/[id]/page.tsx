"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  User,
  FileText,
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";

export default function GrievanceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [comment, setComment] = useState("");

  // This would typically come from an API call using the ID
  const grievance = {
    id: id || "GR-2024-045",
    title: "Wi-Fi Connectivity Issue in Library",
    description:
      "The Wi-Fi in the library has been consistently dropping connections. This is affecting my ability to research for my assignments. It seems to be worse in the east wing of the building.",
    category: "IT",
    priority: "High",
    status: "In Progress",
    submittedBy: "John Doe",
    submitterId: "student-567",
    assignedTo: "Technical Support",
    assignedToId: "team-1",
    dateSubmitted: "2024-05-14T10:30:00Z",
    lastUpdated: "2024-05-15T14:45:00Z",
    location: "Main Library, East Wing",
    tags: ["infrastructure", "connectivity", "urgent"],
  };

  const updates = [
    {
      id: "update-1",
      timestamp: "2024-05-14T12:30:00Z",
      user: "System",
      message: "Grievance registered in system",
      type: "status",
    },
    {
      id: "update-2",
      timestamp: "2024-05-14T13:15:00Z",
      user: "Admin",
      message: "Assigned to Technical Support team",
      type: "assignment",
    },
    {
      id: "update-3",
      timestamp: "2024-05-15T09:20:00Z",
      user: "Sarah (Tech Support)",
      message:
        "We'll be checking the router configurations in the east wing today.",
      type: "comment",
      avatar: "/avatars/sarah.jpg",
    },
    {
      id: "update-4",
      timestamp: "2024-05-15T14:45:00Z",
      user: "Mike (IT Manager)",
      message:
        "Initial diagnosis suggests it might be interference from nearby equipment. We'll continue investigating.",
      type: "comment",
      avatar: "/avatars/mike.jpg",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Resolved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      // This would typically make an API call to add the comment
      console.log("Adding comment:", comment);
      setComment("");
      // Then refresh the updates list
    }
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/grievances">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Grievance Details</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Resolved
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{grievance.title}</CardTitle>
                  <CardDescription>ID: {grievance.id}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(grievance.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        grievance.status === "New"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : grievance.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}
                  >
                    {grievance.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {grievance.description}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Submitted
                          </p>
                          <p className="text-sm">
                            {formatDate(grievance.dateSubmitted)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Last Updated
                          </p>
                          <p className="text-sm">
                            {formatDate(grievance.lastUpdated)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Category
                          </p>
                          <p className="text-sm">{grievance.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Submitted By
                          </p>
                          <p className="text-sm">{grievance.submittedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Assigned To
                          </p>
                          <p className="text-sm">{grievance.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Location
                          </p>
                          <p className="text-sm">{grievance.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {grievance.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-gray-200 rounded-full dark:bg-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="updates" className="pt-4 space-y-4">
                  {updates.map((update) => (
                    <div key={update.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          {update.avatar ? (
                            <AvatarImage src={update.avatar} />
                          ) : (
                            <AvatarFallback>{update.user[0]}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{update.user}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(update.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{update.message}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="comments" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment}>Add Comment</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(grievance.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        grievance.status === "New"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : grievance.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}
                  >
                    {grievance.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
