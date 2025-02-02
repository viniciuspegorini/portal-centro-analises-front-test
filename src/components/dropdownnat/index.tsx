import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface DropdownProps {
  value: string;
  onChange: (selectedValue: string) => void;
}

const DropdownNat: React.FC<DropdownProps> = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState( { value: 'PROFESSOR', label: 'Professor' },);

  const options = [
    { value: 'MASTERS_THESIS', label: 'Trabalho de Mestrado' },
    { value: 'DOCTORATE_DISSERTATION', label: 'Trabalho de Doutorado' },
    { value: 'UNDERGRADUATE_THESIS', label: 'Trabalho de Conclusão de curso (TCC)' },
    { value: 'INTERNSHIP_PROJECT', label: 'Trabalho de Estágio' },
    { value: 'SCIENTIFIC_INITIATION', label: 'Iniciação Científica (programas PIBIC/PIBIT)' },
    { value: 'EXTENSION_PROJECT', label: 'Projeto de Extensão' },
    { value: 'RESEARCH_PROJECT', label: 'Projeto de Pesquisa' },
    { value: 'TEACHING_PROJECT', label: 'Projeto de Ensino' },
    { value: 'OTHER', label: 'Outro' },
  ];

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
    const initialValue = options.find((option) => option.value === value);
    if(initialValue != null) {
      setSelectedOption(initialValue);
    }
  }, [value]);

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleSelect}
        options={options}
        styles={customStyles}
        placeholder="Selecione um cargo"
      />
    </div>
  );
};

export default DropdownNat;
