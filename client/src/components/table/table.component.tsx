import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { ButtonComponent } from '@/components/button';
import { Dialog } from '@/components/dialog/dialog.component';
import { useState } from 'react';
import { EditTransactionForm } from '@/components/editForm';
import { Transaction } from '@/types';
import { useDeleteTransactionMutation } from '@/hooks';

interface TableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const TableComponent = ({ transactions, isLoading }: TableProps) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>();
  const { mutate: deleteOne } = useDeleteTransactionMutation();

  const handleDelete = () => {
    if (selected) {
      deleteOne(selected);
      setIsDeleteOpen(false);
    }
  };
  const handleEditOpen = (id: number) => {
    setSelected(id);
    setIsEditOpen(true);
  };
  const handleDeleteOpen = (id: number) => {
    setSelected(id);
    setIsDeleteOpen(true);
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Client name</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner size="xs" speed="0.2s" />
          ) : (
            transactions.map(t => (
              <Tr key={t.id}>
                <Td>{t.id}</Td>
                <Td>{t.type}</Td>
                <Td>{t.status}</Td>
                <Td>{t.client_name}</Td>
                <Td>{t.amount}</Td>
                <Td display="flex" gap="10px">
                  <ButtonComponent onClick={() => handleEditOpen(t.id)}>
                    Edit
                  </ButtonComponent>
                  <ButtonComponent onClick={() => handleDeleteOpen(t.id)}>
                    Delete
                  </ButtonComponent>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {isEditOpen ? (
        <Dialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Form"
        >
          <EditTransactionForm id={selected!} />
        </Dialog>
      ) : null}
      {isDeleteOpen ? (
        <Dialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete this transaction?"
        >
          <Box display="flex" justifyContent="center" gap="10px">
            <ButtonComponent onClick={handleDelete}>
              Yes, delete it
            </ButtonComponent>
            <ButtonComponent onClick={() => setIsDeleteOpen(false)}>
              No, close
            </ButtonComponent>
          </Box>
        </Dialog>
      ) : null}
    </TableContainer>
  );
};
