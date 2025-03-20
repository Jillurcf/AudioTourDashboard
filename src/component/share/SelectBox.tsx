import React from 'react';
import { Select } from 'antd';

interface SelectBoxProps {
  options: {value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
const SelectBox: React.FC<SelectBoxProps> = ({options, placeholder, onChange, style }) => (
  <Select
    showSearch
    style={style || {width: 100} }
    placeholder={placeholder || 'Select'}
    optionFilterProp="label"
    onChange={onChange}
    // filterSort={(optionA, optionB) =>
    //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    // }
    options={options}
  />
);
  

export default SelectBox;