import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import AddCandidateModal from "./AddCandidateModal";
import { getCandidates, updateCandidate } from "../api/candidateApi";
import { Search, Filter, Plus, Users } from "lucide-react";

const KANBAN_COLUMNS = ["Applied", "Interview", "Offer", "Rejected"];

const KanbanBoard = () => {
  const [columns, setColumns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ role: "", search: "" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getCandidates(filters);
      console.log("Fetched candidates data:", data);
      const newColumns = KANBAN_COLUMNS.reduce((acc, status) => {
        acc[status] = {
          id: status,
          title: status,
          candidates: data.data.filter((c) => c.status === status),
        };
        return acc;
      }, {});
      setColumns(newColumns);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];
    const candidate = startColumn.candidates.find((c) => c._id === draggableId);

    // Optimistic UI Update
    const newStartCandidates = Array.from(startColumn.candidates);
    newStartCandidates.splice(source.index, 1);
    const newStartColumn = { ...startColumn, candidates: newStartCandidates };

    const newEndCandidates = Array.from(endColumn.candidates);
    newEndCandidates.splice(destination.index, 0, candidate);
    const newEndColumn = { ...endColumn, candidates: newEndCandidates };

    setColumns({
      ...columns,
      [startColumn.id]: newStartColumn,
      [endColumn.id]: newEndColumn,
    });

    // API Call to persist the change
    try {
      await updateCandidate(draggableId, {
        status: destination.droppableId,
      });
    } catch (error) {
      console.error("Failed to update candidate status:", error);
      // Revert UI on failure
      setColumns({
        ...columns,
        [startColumn.id]: startColumn,
        [endColumn.id]: endColumn,
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const totalCandidates = Object.values(columns).reduce(
    (total, column) => total + column.candidates?.length || 0,
    0
  );

  const clearFilters = () => {
    setFilters({ role: "", search: "" });
  };

  const hasActiveFilters = filters.search || filters.role;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Recruitment Board
                </h1>
                <p className="text-sm text-gray-600">
                  {totalCandidates} total candidates
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Candidate</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="search"
              placeholder="Search by name, role..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="role"
              placeholder="Filter by role..."
              value={filters.role}
              onChange={handleFilterChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading candidates...</span>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      {!isLoading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="p-6">
            <div className="flex space-x-6 overflow-x-auto pb-6">
              {Object.values(columns).map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  candidates={column.candidates || []}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      )}

      {/* Empty State */}
      {!isLoading && totalCandidates === 0 && !hasActiveFilters && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No candidates yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first candidate
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add First Candidate</span>
          </button>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && totalCandidates === 0 && hasActiveFilters && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No candidates found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default KanbanBoard;
