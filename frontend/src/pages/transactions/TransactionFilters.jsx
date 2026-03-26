import Select, { components as SelectComponents } from 'react-select';
import { FiSearch, FiFilter, FiCalendar, FiChevronDown } from 'react-icons/fi';

// Remove the default vertical grey line between dropdown and chevron icon
const IndicatorSeparator = () => null;

// Custom dropdown indicator with rotation and color change
const CustomDropdownIndicator = (props) => {
  return (
    <SelectComponents.DropdownIndicator {...props}>
      <FiChevronDown 
        className={`text-slate-400 transition-transform duration-200 ${
          props.selectProps.menuIsOpen ? 'rotate-180 text-brand-500' : ''
        }`} 
      />
    </SelectComponents.DropdownIndicator>
  );
};

// Custom category control with filter icon
const CategoryControl = ({ children, ...props }) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiFilter className={props.selectProps.menuIsOpen ? "text-brand-500" : "text-slate-400"} />
    </div>
    {children}
  </SelectComponents.Control>
);

// Custom Month control with calendar icon
const MonthControl = ({ children, ...props }) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiCalendar className={props.selectProps.menuIsOpen ? "text-brand-500" : "text-slate-400"} />
    </div>
    {children}
  </SelectComponents.Control>
);


// TransactionFilters component that includes search and dropdown filters
export default function TransactionFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedMonth,
  setSelectedMonth
}) {
  
  const categoryOptions = [
    'All Categories', 'Housing', 'Food', 'Transportation', 
    'Entertainment', 'Shopping', 'Income'
  ].map(cat => ({ value: cat, label: cat }));
  
  const monthOptions = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map(month => ({ value: month, label: month }));

  // Custom style configuration
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '0.75rem', 
      border: 'none',
      boxShadow: state.isFocused 
        ? '0 0 0 2px #10b981' 
        : 'inset 0 0 0 1px #e2e8f0', 
      minWidth: '180px',
      cursor: 'pointer',
      backgroundColor: 'white',
      padding: '0.125rem 0',
    }),
    valueContainer: (base) => ({
      ...base,
      paddingLeft: '0.25rem', 
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#10b981' 
        : state.isFocused ? '#ecfdf5' : 'white', 
      color: state.isSelected ? 'white' : '#0f172a',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#10b981',
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#0f172a', 
      fontSize: '0.875rem', 
    }),
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 outline-none transition-shadow"
        />
      </div>

      {/* React Select Dropdowns Container */}
      <div className="z-10 flex flex-col gap-3 sm:flex-row">
        
        <Select
          options={categoryOptions}
          value={categoryOptions.find(opt => opt.value === selectedCategory) || categoryOptions[0]}
          onChange={(option) => setSelectedCategory(option.value)}
          styles={selectStyles}
          components={{
            Control: CategoryControl,
            DropdownIndicator: CustomDropdownIndicator,
            IndicatorSeparator
          }}
        />

        <Select
          options={monthOptions}
          value={monthOptions.find(opt => opt.value === selectedMonth) || monthOptions[0]}
          onChange={(option) => setSelectedMonth(option.value)}
          styles={selectStyles}
          isSearchable={false}
          components={{
            Control: MonthControl,
            DropdownIndicator: CustomDropdownIndicator,
            IndicatorSeparator
          }}
        />
        
      </div>
    </div>
  );
}