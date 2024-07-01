import { ButtonComponent } from '@/components/button';
import { Pagination } from '@/components/pagination';
import { SearchBar } from '@/components/search-bar';
import {
  SelectComponent,
  statusOptions,
  typeOptions,
} from '@/components/select';
import { TableComponent } from '@/components/table/table.component';
import { useCreateTransactionMutation, useGetTransactionQuery } from '@/hooks';
import { Box, Container, Input } from '@chakra-ui/react';
import Papa from 'papaparse';
import { useEffect, useRef, useState } from 'react';

export const HomePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const { data: response, isLoading } = useGetTransactionQuery(
    page,
    10,
    status,
    debouncedSearch,
    type,
  );
  const { mutate: create } = useCreateTransactionMutation();
  const transactions = response?.data?.transactions ?? [];
  const totalPages = response?.data?.totalPages ?? null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleExportClick = () => {
    try {
      const csvData = transactions.map(transaction => ({
        ClientName: transaction.client_name,
        Type: transaction.type,
        Status: transaction.status,
        Amount: transaction.amount,
      }));

      const csv = Papa.unparse(csvData, {
        delimiter: "     "
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setPage(1);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      Papa.parse(file, {
        header: true,
        complete: results => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsedData = results.data.map((transaction: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return {
              client_name: transaction.ClientName,
              type: transaction.Type,
              status: transaction.Status,
              amount: transaction.Amount,
            };
          });
          console.log(parsedData);
          create(parsedData);
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages!) return;
    setPage(newPage);
  };

  return (
    <Container maxW="1200px" margin="50px auto 0 auto" padding="0 15px">
      <Box display="flex" gap="10px" flexDirection="column">
        <SearchBar value={search} onChange={handleSearchChange} />
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap="10px">
            <SelectComponent
              options={statusOptions}
              value={status}
              onChange={handleStatusChange}
            />
            <SelectComponent
              options={typeOptions}
              value={type}
              onChange={handleTypeChange}
            />
          </Box>
          <Box display="flex" gap="10px">
            <ButtonComponent onClick={handleImportClick}>
              Import
            </ButtonComponent>
            <ButtonComponent onClick={handleExportClick}>
              Export
            </ButtonComponent>
            <Input
              type="file"
              ref={fileInputRef}
              display="none"
              onChange={handleFileImport}
            />
          </Box>
        </Box>
        <TableComponent transactions={transactions} isLoading={isLoading} />
        {totalPages ? (
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        ) : null}
      </Box>
    </Container>
  );
};
