import React from "react";

const StatsCard = ({ stats, recent }) => {
  
  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Average Experience",
      value: `${stats.avgExperience?.toFixed(1) || "0.0"} yrs`,
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      description: "Years of experience across all candidates",
    },
    {
      title: "Total Candidates",
      value: stats.totalCandidates?.toLocaleString() || "0",
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      description: "Total number of candidates in database",
    },
    {
      title: "Maximum Experience",
      value: `${stats.maxExperience || "0"} yrs`,
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      description: "Highest experience level among candidates",
    },
    {
      title: "Recent Applications",
      value: recent?.toLocaleString() || "0",
      subtitle: "(Last 30 days)",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      description: "New applications received this month",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`group relative bg-gradient-to-br ${card.bgGradient} rounded-xl p-6 border ${card.borderColor} shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8 opacity-10">
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br ${card.gradient}`}
            ></div>
          </div>

          
          <div className="relative z-10">
            
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>
              <div className="flex-1 ml-4">
                <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                  {card.title}
                </h4>
                {card.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                )}
              </div>
            </div>

           
            <div className="mb-3">
              <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                {card.value}
              </p>
            </div>

           
            <p className="text-xs text-gray-600 leading-relaxed">
              {card.description}
            </p>

        
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div
                className={`h-1 rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-1000 ease-out`}
                style={{
                  width:
                    index === 0
                      ? "75%"
                      : index === 1
                      ? "100%"
                      : index === 2
                      ? "60%"
                      : "45%",
                }}
              ></div>
            </div>
          </div>

          
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
        </div>
      ))}

     
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-6">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">
                Quick Insights
              </h5>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Avg experience trend:{" "}
                  {stats.avgExperience > 5
                    ? "Senior"
                    : stats.avgExperience > 2
                    ? "Mid-level"
                    : "Junior"}
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Candidate pool:{" "}
                  {stats.totalCandidates > 100
                    ? "Large"
                    : stats.totalCandidates > 50
                    ? "Medium"
                    : "Small"}
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Application rate:{" "}
                  {recent > 20 ? "High" : recent > 10 ? "Moderate" : "Low"}
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
