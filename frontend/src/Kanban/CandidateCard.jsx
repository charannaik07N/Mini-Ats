import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Mail, Phone, FileText, Calendar, Briefcase, User } from "lucide-react";

const CandidateCard = ({ candidate, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Draggable draggableId={candidate._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 transition-all duration-200 hover:shadow-md ${
            snapshot.isDragging
              ? "rotate-3 shadow-lg ring-2 ring-blue-400 ring-opacity-50"
              : ""
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-lg truncate">
                {candidate.name}
              </h4>
            </div>
            <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(candidate.appliedDate)}
            </div>
          </div>

          {/* Role and Experience */}
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <p className="font-medium text-gray-800">{candidate.role}</p>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {candidate.experience}{" "}
              {candidate.experience === 1 ? "year" : "years"} experience
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 mb-3">
            {candidate.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${candidate.email}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                >
                  {candidate.email}
                </a>
              </div>
            )}

            {candidate.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${candidate.phone}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {candidate.phone}
                </a>
              </div>
            )}

            {candidate.resumeLink && (
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a
                  href={candidate.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  View Resume
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Notes */}
          {candidate.notes && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Notes:</p>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded">
                {candidate.notes}
              </p>
            </div>
          )}

          {/* Drag Indicator */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CandidateCard;
