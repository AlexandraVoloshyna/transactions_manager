import { Select, SelectProps } from '@chakra-ui/react';

interface ReusableSelectProps extends SelectProps {
  options: { value: string; label: string }[];
}

export const SelectComponent = (props: ReusableSelectProps) => {
  const { onChange, options, value } = props;
  return (
    <Select onChange={onChange} value={value} {...props}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
