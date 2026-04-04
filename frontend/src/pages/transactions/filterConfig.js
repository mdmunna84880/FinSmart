export const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '0.75rem',
    border: 'none',
    boxShadow: state.isFocused ? '0 0 0 2px #10b981' : 'inset 0 0 0 1px #e2e8f0',
    minWidth: '130px',
    cursor: 'pointer',
    backgroundColor: 'white',
    padding: '0.125rem 0',
  }),
  valueContainer: (base) => ({ ...base, paddingLeft: '0.25rem' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#ecfdf5' : 'white',
    color: state.isSelected ? 'white' : '#0f172a',
    cursor: 'pointer',
    '&:active': { backgroundColor: '#10b981' },
  }),
  singleValue: (base) => ({ ...base, color: '#0f172a', fontSize: '0.875rem' }),
};
