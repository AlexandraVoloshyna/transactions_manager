import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

interface SearchProps extends InputProps {}
export const SearchBar = ({ value, onChange }: SearchProps) => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          type="text"
          placeholder="Search..."
          border="1px solid #949494"
          value={value}
          onChange={onChange}
        />
      </InputGroup>
    </>
  );
};
