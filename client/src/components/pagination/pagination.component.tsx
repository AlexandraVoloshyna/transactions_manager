import { Arrow, PageNumber, PaginationContainer } from './pagination.styled';

export interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <PaginationContainer>
      <Arrow onClick={() => onPageChange(currentPage - 1)}>Prev</Arrow>
      {pageNumbers.map(number => (
        <PageNumber
          key={number}
          isActive={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </PageNumber>
      ))}
      <Arrow onClick={() => onPageChange(currentPage + 1)}> Next</Arrow>
    </PaginationContainer>
  );
};

export default Pagination;
