import Select from 'react-select';
import { FiSearch } from 'react-icons/fi';
import {
  IndicatorSeparator, CustomDropdownIndicator,
  TypeControl, CategoryControl, YearControl, MonthControl, LimitControl
} from './FilterComponents';
import { selectStyles } from './filterConfig';

// Calendar month mapping for text display
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Available pagination limit options
const LIMITS = [
  { value: 10, label: '10 / Page' },
  { value: 20, label: '20 / Page' },
  { value: 50, label: '50 / Page' },
  { value: 100, label: '100 / Page' },
];

// Provide search and categorical filtering controls
export default function TransactionFilters({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  selectedMonth, setSelectedMonth,
  selectedYear, setSelectedYear,
  selectedType, setSelectedType,
  limitPerPage, setLimitPerPage,
  availableYears = [],
  availableMonths = [],
  availableCategories = [],
  availableTypes = [],
}) {
  const typeOptions = [{ value: 'All Types', label: 'All Types' }, ...availableTypes.map(t => ({ value: t, label: t }))];
  const categoryOptions = [{ value: 'All Categories', label: 'All Categories' }, ...availableCategories.map(c => ({ value: c, label: c }))];
  const yearsOptions = [{ value: 'All Years', label: 'All Years' }, ...availableYears.map(y => ({ value: String(y), label: String(y) }))];
  const monthsOptions = [{ value: 'All Months', label: 'All Months' }, ...availableMonths.map(m => ({ value: MONTH_NAMES[m - 1], label: MONTH_NAMES[m - 1] }))];

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
      {/* Transaction Search Input */}
      <div className="relative flex-1 max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FiSearch className="text-slate-400" /></div>
        <input type="text" placeholder="Search descriptions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 outline-none transition-shadow" style={{ paddingBlock: '10px' }} />
      </div>

      {/* Categorical Filter Selectors */}
      <div className="z-10 flex flex-wrap gap-2">
        <Select options={typeOptions} value={typeOptions.find(o => o.value === selectedType)} onChange={o => setSelectedType(o.value)} styles={selectStyles} isSearchable={false} components={{ Control: TypeControl, DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator }} />
        <Select options={categoryOptions} value={categoryOptions.find(o => o.value === selectedCategory)} onChange={o => setSelectedCategory(o.value)} styles={selectStyles} components={{ Control: CategoryControl, DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator }} />
        <Select options={yearsOptions} value={yearsOptions.find(o => o.value === selectedYear)} onChange={o => setSelectedYear(o.value)} styles={selectStyles} isSearchable={false} components={{ Control: YearControl, DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator }} />
        <Select options={monthsOptions} value={monthsOptions.find(o => o.value === selectedMonth)} onChange={o => setSelectedMonth(o.value)} styles={selectStyles} isSearchable={false} components={{ Control: MonthControl, DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator }} />
        <Select options={LIMITS} value={LIMITS.find(o => o.value === limitPerPage)} onChange={o => setLimitPerPage(o.value)} styles={{ ...selectStyles, control: (b, s) => ({ ...selectStyles.control(b, s), minWidth: '110px' }) }} isSearchable={false} components={{ Control: LimitControl, DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator }} />
      </div>
    </div>
  );
}