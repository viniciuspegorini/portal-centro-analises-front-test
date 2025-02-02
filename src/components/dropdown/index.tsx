import { ROLE_OPTIONS } from '@/commons/roles';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface DropdownProps {
  value: string;
  onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState( { value: 'PROFESSOR', label: 'Professor' },);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: '16px',
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '16px',
    }),
  };

  const handleSelect = (selectedOption : any) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption.value);
  };

  useEffect(() => {
    // Set the initial value when the value prop changes
    const initialValue = ROLE_OPTIONS.find((option) => option.value === value);
    if(initialValue != null) {
      setSelectedOption(initialValue);
    }
  }, [value]);

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleSelect}
        options={ROLE_OPTIONS}
        styles={customStyles}
        placeholder="Selecione um cargo"
      />
    </div>
  );
};

export default Dropdown;
