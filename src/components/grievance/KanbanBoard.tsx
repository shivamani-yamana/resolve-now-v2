"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  PauseCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/Button";

type Grievance = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  submittedBy: string;
  date: string;
};

type Column = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  items: Grievance[];
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Record<string, Column>>({
    new: {
      id: "new",
      title: "New",
      icon: AlertCircle,
      color: "text-blue-500",
      items: [
        {
          id: "gr-001",
          title: "Wi-Fi Connectivity Issue",
          description: "Unable to connect to Wi-Fi in the library",
          priority: "High",
          submittedBy: "John Doe",
          date: "2024-05-14",
        },
        {
          id: "gr-002",
          title: "Broken Desk in Room 305",
          description: "The desk is damaged and needs repair",
          priority: "Medium",
          submittedBy: "Jane Smith",
          date: "2024-05-13",
        },
      ],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      icon: Clock,
      color: "text-yellow-500",
      items: [
        {
          id: "gr-003",
          title: "AC Not Working",
          description: "Air conditioner in lecture hall not functioning",
          priority: "High",
          submittedBy: "Mike Johnson",
          date: "2024-05-12",
        },
      ],
    },
    underReview: {
      id: "underReview",
      title: "Under Review",
      icon: PauseCircle,
      color: "text-purple-500",
      items: [
        {
          id: "gr-004",
          title: "Software License Issue",
          description: "Unable to access required software",
          priority: "Medium",
          submittedBy: "Sarah Williams",
          date: "2024-05-10",
        },
      ],
    },
    resolved: {
      id: "resolved",
      title: "Resolved",
      icon: CheckCircle,
      color: "text-green-500",
      items: [
        {
          id: "gr-005",
          title: "Printer Not Working",
          description: "IT lab printer not responding",
          priority: "Medium",
          submittedBy: "Alex Johnson",
          date: "2024-05-08",
        },
      ],
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className="pb-4 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4" style={{ minWidth: "900px" }}>
          {Object.values(columns).map((column) => {
            const Icon = column.icon;
            return (
              <div key={column.id} className="w-72">
                <div className="flex items-center mb-3">
                  <Icon className={`mr-2 h-5 w-5 ${column.color}`} />
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">
                    {column.items.length}
                  </span>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[400px] rounded-md bg-secondary/30 p-2"
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 cursor-grab active:cursor-grabbing"
                            >
                              <CardContent className="p-3">
                                <div className="flex flex-col space-y-2">
                                  <div className="font-medium">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {item.description}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full
                                      ${
                                        item.priority === "High"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                          : item.priority === "Medium"
                                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                      }`}
                                    >
                                      {item.priority}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7"
                                    >
                                      <MessageCircle className="h-3.5 w-3.5 mr-1" />
                                      <span className="text-xs">Comment</span>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
