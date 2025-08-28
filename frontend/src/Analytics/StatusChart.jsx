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

const StatusChart = ({ data, title = "Candidates by Status" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-md shadow p-3 mb-4">
        <div className="text-center text-gray-500 text-sm">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-md shadow p-3 mb-4">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 text-xs">
          Distribution of candidates by status
        </p>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 rounded p-2 overflow-hidden">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="_id"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              angle={-45}
              textAnchor="end"
              height={40}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#374151", fontWeight: "500" }}
            />
            <Legend wrapperStyle={{ paddingTop: "8px" }} iconSize={10} />
            <Bar
              dataKey="count"
              fill="#10b981"
              name="Candidates"
              radius={[3, 3, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="mt-2 flex justify-between text-xs text-gray-500 border-t pt-2">
        <span>Status Types: {data.length}</span>
        <span>Total: {data.reduce((sum, item) => sum + item.count, 0)}</span>
      </div>
    </div>
  );
};

export default StatusChart;
