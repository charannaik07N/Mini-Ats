import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CandidateCard from "./CandidateCard";

const Column = ({ column, candidates }) => {
  const getColumnColor = (columnId) => {
    const colors = {
      applied: "bg-blue-50 border-blue-200",
      screening: "bg-yellow-50 border-yellow-200",
      interview: "bg-purple-50 border-purple-200",
      offer: "bg-green-50 border-green-200",
      rejected: "bg-red-50 border-red-200",
    };
    return colors[columnId] || "bg-gray-50 border-gray-200";
  };

  const getHeaderColor = (columnId) => {
    const colors = {
      applied: "text-blue-700 bg-blue-100",
      screening: "text-yellow-700 bg-yellow-100",
      interview: "text-purple-700 bg-purple-100",
      offer: "text-green-700 bg-green-100",
      rejected: "text-red-700 bg-red-100",
    };
    return colors[columnId] || "text-gray-700 bg-gray-100";
  };

  return (
    <div className="flex flex-col w-80 min-w-80 bg-gray-50 rounded-lg border border-gray-200 h-full">
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHeaderColor(
            column.id
          )}`}
        >
          <span className="mr-2">{column.title}</span>
          <span className="bg-white bg-opacity-60 px-2 py-0.5 rounded-full text-xs font-semibold">
            {candidates.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 transition-all duration-200 min-h-96 ${
              snapshot.isDraggingOver
                ? `${getColumnColor(
                    column.id
                  )} ring-2 ring-blue-300 ring-opacity-50`
                : "bg-transparent"
            }`}
          >
            {/* Candidates */}
            <div className="space-y-3">
              {candidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate._id}
                  candidate={candidate}
                  index={index}
                />
              ))}
            </div>

            {/* Empty State */}
            {candidates.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">No candidates</p>
                <p className="text-xs text-center mt-1">
                  Drag candidates here or add new ones
                </p>
              </div>
            )}

            {/* Drop Zone Indicator */}
            {snapshot.isDraggingOver && candidates.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 bg-opacity-50">
                <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-blue-700">
                  Drop candidate here
                </p>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
