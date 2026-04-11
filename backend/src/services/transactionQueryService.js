// Generate a match object for MongoDB queries based on incoming filter parameters
export const buildTransactionMatch = (userId, filters, exclude = []) => {
  const { year, month, months, category, type, search } = filters;
  const match = { userId };

  // Apply a rolling window of N months from today when `months` is provided
  if (months && !exclude.includes("months")) {
    const n = parseInt(months, 10);
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - n + 1, 1);
    match.date = { $gte: startDate };
  }
  // Apply specific year range filter if provided (months takes precedence when both exist)
  else if (year && !exclude.includes("year")) {
    const y = parseInt(year, 10);
    match.date = { $gte: new Date(y, 0, 1), $lt: new Date(y + 1, 0, 1) };
  }

  // Apply specific month comparison if provided
  if (month && !exclude.includes("month")) {
    match.$expr = { $eq: [{ $month: "$date" }, parseInt(month, 10)] };
  }

  // Apply category and type strict match filters
  if (category && !exclude.includes("category")) match.category = category;
  if (type && !exclude.includes("type")) match.type = type;

  // Apply case-insensitive regex search across description, category, and type fields
  if (search && !exclude.includes("search")) {
    const searchRegex = { $regex: search, $options: "i" };
    match.$or = [
      { desc: searchRegex },
      { category: searchRegex },
      { type: searchRegex },
    ];
  }

  return match;
};
