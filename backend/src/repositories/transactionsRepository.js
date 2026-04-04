import { Transaction } from "../models/Transaction.js";
import { buildTransactionMatch } from "../services/transactionQueryService.js";

// Retrieve unique data points to populate cascading filters dynamically
export const getDynamicFilters = async (userId, activeFilters) => {
  const result = await Transaction.aggregate([
    {
      $facet: {
        // unique years present in the user's data
        years: [
          { $match: buildTransactionMatch(userId, activeFilters, ["year"]) },
          { $group: { _id: { $year: "$date" } } },
          { $sort: { _id: -1 } },
        ],

        // unique months present in the current year context
        months: [
          { $match: buildTransactionMatch(userId, activeFilters, ["month"]) },
          { $group: { _id: { $month: "$date" } } },
          { $sort: { _id: 1 } },
        ],

        // unique categories used in the current filter context
        categories: [
          {
            $match: buildTransactionMatch(userId, activeFilters, ["category"]),
          },
          { $group: { _id: "$category" } },
          { $match: { _id: { $nin: [null, ""] } } },
          { $sort: { _id: 1 } },
        ],

        // unique types (Income/Expense) used in the current context
        types: [
          { $match: buildTransactionMatch(userId, activeFilters, ["type"]) },
          { $group: { _id: "$type" } },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ]);

  const data = result[0] || {
    years: [],
    months: [],
    categories: [],
    types: [],
  };

  const mapIds = (arr) => arr.map((r) => r._id);

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, mapIds(value)]),
  );
};