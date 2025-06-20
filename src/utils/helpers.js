export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const getCategoryColor = (category) => {
  const colors = {
    Design: "bg-purple-100 text-purple-800",
    Development: "bg-blue-100 text-blue-800",
    Marketing: "bg-pink-100 text-pink-800",
    General: "bg-gray-100 text-gray-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};
