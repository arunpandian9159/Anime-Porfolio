import { useState, useMemo } from "react";
import { useGitHubStats } from "../../hooks/useGitHubStats";

/**
 * GitHub Activity visualization component
 * Displays contribution grid and stats
 */
const GitHubActivity = ({ username, className = "" }) => {
  const { loading, error, data } = useGitHubStats(username);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    date: "", 
    count: 0,
  });

  // Process contribution data into weeks for grid display
  const { weeks, monthLabels } = useMemo(() => {
    if (!data?.contributionData) return { weeks: [], monthLabels: [] };

    const contributions = data.contributionData;
    const weeksArray = [];
    let currentWeek = [];

    // Get the start date (should be a Sunday for proper alignment)
    const startDate =
      contributions.length > 0 ? new Date(contributions[0].date) : new Date();
    const startDayOfWeek = startDate.getDay();

    // Add empty cells for days before the first contribution
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    contributions.forEach((day) => {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
    });

    // Add remaining days to the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArray.push(currentWeek);
    }

    // Limit to last 52 weeks
    const finalWeeks = weeksArray.slice(-52);

    // Calculate month labels for the grid
    const months = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = -1;

    finalWeeks.forEach((week, weekIndex) => {
      // Find the first non-null day in the week to determine the month
      const firstDay = week.find((day) => day !== null);
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();

        // Only add label if it's a new month
        if (month !== lastMonth) {
          months.push({
            name: monthNames[month],
            weekIndex: weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return { weeks: finalWeeks, monthLabels: months };
  }, [data]);

  // Get color class based on contribution level
  const getContributionColor = (count) => {
    if (count === 0) return "bg-slate-700/50";
    if (count <= 1) return "bg-emerald-700/80";
    if (count <= 6) return "bg-emerald-600/80";
    if (count <= 9) return "bg-emerald-700";
    if (count <= 12) return "bg-emerald-600";
    if (count <= 21) return "bg-emerald-400";
    return "bg-emerald-400";
  };

  // Format date for tooltip
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle mouse events for tooltip
  const handleMouseEnter = (e, day) => {
    if (!day) return;

    const rect = e.target.getBoundingClientRect();
    const containerRect = e.target
      .closest(".github-activity-container")
      ?.getBoundingClientRect();

    if (containerRect) {
      setTooltip({
        visible: true,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 8,
        date: day.date,
        count: day.count,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Graceful fallback: hide component on error (Requirement 2.3)
  if (error) {
    console.error("GitHub Activity Error:", error);
    return null;
  }

  // Don't render while loading or if no data
  if (loading) {
    return (
      <div className={`github-activity-container ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-700 rounded mb-4"></div>
          <div className="h-24 bg-gray-800/50 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={`github-activity-container relative ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-sm font-medium text-gray-300">GitHub Activity</h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard label="Contributions" value={data.totalContributions} />
        <StatCard
          label="Current Streak"
          value={data.currentStreak}
          suffix=" days"
        />
        <StatCard
          label="Longest Streak"
          value={data.longestStreak}
          suffix=" days"
        />
      </div>

      {/* Contribution Grid with Month Labels */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-max">
          {/* Month Labels Row */}
          <div className="flex mb-1 relative h-4">
            {monthLabels.map((month, index) => (
              <span
                key={index}
                className="text-[12px] text-white absolute"
                style={{
                  left: `${month.weekIndex * 13}px`, // 10px cell + 3px gap
                }}
              >
                {month.name}
              </span>
            ))}
          </div>

          {/* Activity Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[10px] h-[10px] rounded-sm transition-all duration-200 ${
                      day ? getContributionColor(day.count) : "bg-transparent"
                    } ${
                      day
                        ? "hover:ring-1 hover:ring-white/30 cursor-pointer"
                        : ""
                    }`}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={
                      day
                        ? `${day.count} contributions on ${formatDate(
                            day.date,
                          )}`
                        : undefined
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-[2px]">
          <div className="w-[10px] h-[10px] rounded-sm bg-gray-800/50"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-900/70"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-700/80"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-500"></div>
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-400"></div>
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-50 px-2 py-1 text-xs bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full animate-fade-in"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <div className="font-medium text-white">
            {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
          </div>
          <div className="text-gray-400">{formatDate(tooltip.date)}</div>
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-900 border-r border-b border-gray-700 transform -translate-x-1/2 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Stat card component for displaying contribution statistics
 */
const StatCard = ({ label, value, suffix = "" }) => (
  <div className="bg-gray-800/30 rounded-lg p-3 text-center">
    <div className="text-lg font-bold text-white">
      {typeof value === "number" ? value.toLocaleString() : value}
      <span className="text-sm font-normal text-gray-400">{suffix}</span>
    </div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

export default GitHubActivity;
