import { Button, ButtonProps } from '@chakra-ui/react';

export const ButtonComponent = (props: ButtonProps) => {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
};
