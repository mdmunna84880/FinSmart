import { components as SelectComponents } from 'react-select';
import { FiChevronDown, FiFilter, FiCalendar, FiClock, FiToggleLeft, FiAlignLeft } from 'react-icons/fi';

export const IndicatorSeparator = () => null;

export const CustomDropdownIndicator = (props) => (
  <SelectComponents.DropdownIndicator {...props}>
    <FiChevronDown
      className={`text-slate-400 transition-transform duration-200 ${props.selectProps.menuIsOpen ? 'rotate-180 text-brand-500' : ''}`}
    />
  </SelectComponents.DropdownIndicator>
);

export const CategoryControl = (props) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiFilter className={props.selectProps.menuIsOpen ? 'text-brand-500' : 'text-slate-400'} />
    </div>
    {props.children}
  </SelectComponents.Control>
);

export const MonthControl = (props) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiCalendar className={props.selectProps.menuIsOpen ? 'text-brand-500' : 'text-slate-400'} />
    </div>
    {props.children}
  </SelectComponents.Control>
);

export const YearControl = (props) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiClock className={props.selectProps.menuIsOpen ? 'text-brand-500' : 'text-slate-400'} />
    </div>
    {props.children}
  </SelectComponents.Control>
);

export const TypeControl = (props) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiToggleLeft className={props.selectProps.menuIsOpen ? 'text-brand-500' : 'text-slate-400'} />
    </div>
    {props.children}
  </SelectComponents.Control>
);

export const LimitControl = (props) => (
  <SelectComponents.Control {...props}>
    <div className="pl-3 pr-1 flex items-center justify-center">
      <FiAlignLeft className={props.selectProps.menuIsOpen ? 'text-brand-500' : 'text-slate-400'} />
    </div>
    {props.children}
  </SelectComponents.Control>
);
