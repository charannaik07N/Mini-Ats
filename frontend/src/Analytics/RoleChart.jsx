import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RoleChart = ({ data, title = "Candidates by Role" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-md shadow p-4">
        <div className="text-center text-gray-500 text-sm">
          <p>No data available to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-md shadow p-3 mb-4">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-xs">
          Distribution of candidates across roles
        </p>
      </div>

     
      <div className="bg-gray-50 rounded p-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />
            <YAxis
              type="category"
              dataKey="_id"
              width={90}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#374151", fontWeight: "500" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              iconSize={8}
              iconType="square"
            />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              name="Candidates"
              radius={[0, 3, 3, 0]}
              barSize={14} // thinner bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

  
      <div className="mt-2 flex justify-between text-xs text-gray-600 border-t pt-2">
        <span>Total Roles: {data.length}</span>
        <span>Total: {data.reduce((sum, item) => sum + item.count, 0)}</span>
      </div>
    </div>
  );
};

export default RoleChart;
