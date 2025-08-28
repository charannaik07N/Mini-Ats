import React, { useState, useEffect } from "react";
import { getAnalytics } from "../api/candidateApi";
import StatusChart from "./StatusChart";
import RoleChart from "./RoleChart";
import StatsCard from "./StatsCard";

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await getAnalytics();
        setAnalytics(data.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600 text-lg">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500 text-lg">
          No analytics data available.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of candidate statistics and distributions
          </p>
        </div>

        {/* Key Statistics Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Key Statistics
          </h3>
          <StatsCard
            stats={analytics.experienceStats}
            recent={analytics.recentApplications}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Candidates by Status
            </h3>
            <div className="h-80">
              <StatusChart data={analytics.statusDistribution} />
            </div>
          </div>

          {/* Role Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Candidates by Role
            </h3>
            <div className="h-80">
              <RoleChart data={analytics.roleDistribution} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
