import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { ButtonComponent } from '../button';
import { useUpdateTransactionMutation } from '@/hooks';
import { UpdateTransaction } from '@/types';

export const EditTransactionForm = ({ id }: { id: number | null }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTransaction>();
  const { mutate: update } = useUpdateTransactionMutation();

  const onSubmit = (data: UpdateTransaction) => {
    if (id) {
      update({ data, id });
    }
  };

  return (
    <Box
      w="100%"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m="auto"
      mt={8}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={!!errors.client_name}>
            <FormLabel htmlFor="clientName">Client Name</FormLabel>
            <Input
              id="clientName"
              type="text"
              placeholder="Enter client name"
              {...register('client_name')}
            />
            <FormErrorMessage>
              {errors.client_name && errors.client_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              {...register('amount', {
                min: { value: 0, message: 'Amount must be a positive number' },
              })}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.type}>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Input
              id="type"
              type="text"
              placeholder="Enter type (e.g., refill, withdrawal)"
              {...register('type', {
                validate: value =>
                  value !== undefined ||
                  value === 'refill' ||
                  value === 'withdrawal' ||
                  'Type must be "refill" or "withdrawal"',
              })}
            />
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.status}>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Input
              id="status"
              type="text"
              placeholder="Enter status (e.g., pending, completed, canceled)"
              {...register('status', {
                validate: value =>
                  value !== undefined ||
                  value === 'pending' ||
                  value === 'completed' ||
                  value === 'canceled' ||
                  'Status must be "pending", "completed", or "canceled"',
              })}
            />
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>
          <ButtonComponent
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
            width="full"
          >
            Save Changes
          </ButtonComponent>
        </VStack>
      </form>
    </Box>
  );
};
