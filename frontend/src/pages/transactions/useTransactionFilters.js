import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions, fetchAvailableFilters } from '@/store/slices/transactionSlice';

// Map month names to API-compatible integers
const MONTH_TO_NUM = {
  January: 1, February: 2, March: 3, April: 4,
  May: 5, June: 6, July: 7, August: 8,
  September: 9, October: 10, November: 11, December: 12,
};

// Manage transaction filter state and cascading dropdown logic
export const useTransactionFilters = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm]           = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMonth, setSelectedMonth]     = useState('All Months');
  const [selectedYear, setSelectedYear]       = useState('All Years');
  const [selectedType, setSelectedType]       = useState('All Types');
  const [currentPage, setCurrentPage]         = useState(1);
  const [limitPerPage, setLimitPerPage]       = useState(10);

  // Debounce search input to minimize API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Generate URL parameters for filtered transaction requests
  const getQueryParams = useCallback(() => {
    const params = { page: currentPage, limit: limitPerPage };
    if (selectedType !== 'All Types')           params.type     = selectedType;
    if (selectedCategory !== 'All Categories')  params.category = selectedCategory;
    if (selectedMonth !== 'All Months')         params.month    = MONTH_TO_NUM[selectedMonth];
    if (selectedYear !== 'All Years')           params.year     = selectedYear;
    if (debouncedSearch.trim())                 params.search   = debouncedSearch.trim();
    return params;
  }, [selectedType, selectedCategory, selectedMonth, selectedYear, currentPage, limitPerPage, debouncedSearch]);

  // Update available filter options based on current selections
  useEffect(() => {
    dispatch(fetchAvailableFilters(getQueryParams()));
  }, [dispatch, getQueryParams]);

  // Fetch transactions from the ledger matching current filters
  useEffect(() => {
    dispatch(fetchTransactions(getQueryParams()));
  }, [dispatch, getQueryParams]);

  // Reset pagination to first page when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedType, selectedCategory, selectedMonth, selectedYear, limitPerPage]);

  return {
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear,
    selectedType, setSelectedType,
    currentPage, setCurrentPage,
    limitPerPage, setLimitPerPage,
    getQueryParams
  };
};
